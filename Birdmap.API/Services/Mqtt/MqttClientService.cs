using Birdmap.API.Services.Hubs;
using Birdmap.BLL.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Connecting;
using MQTTnet.Client.Disconnecting;
using MQTTnet.Client.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Timer = System.Timers.Timer;

namespace Birdmap.API.Services.Mqtt
{
    public class MqttClientService : IMqttClientService
    {
        private readonly IMqttClient _mqttClient;
        private readonly IMqttClientOptions _options;
        private readonly ILogger<MqttClientService> _logger;
        private readonly IInputService _inputService;
        private readonly IHubContext<DevicesHub, IDevicesHubClient> _hubContext;
        private readonly Timer _hubTimer;
        private readonly List<Message> _messages = new();
        private readonly object _messageLock = new();

        public bool IsConnected => _mqttClient.IsConnected;

        public MqttClientService(IMqttClientOptions options, ILogger<MqttClientService> logger, IInputService inputService, IHubContext<DevicesHub, IDevicesHubClient> hubContext)
        {
            _options = options;
            _logger = logger;
            _inputService = inputService;
            _hubContext = hubContext;
            _hubTimer = new Timer()
            {
                AutoReset = true,
                Interval = 1000,
            };
            _hubTimer.Elapsed += SendMqttMessagesWithSignalR;

            _mqttClient = new MqttFactory().CreateMqttClient();
            ConfigureMqttClient();
        }

        private void SendMqttMessagesWithSignalR(object sender, System.Timers.ElapsedEventArgs e)
        {
            lock (_messageLock)
            {
                if (_messages.Any())
                {
                    _logger.LogInformation($"Sending ({_messages.Count}) messages: {string.Join(" | ", _messages)}");
                    _hubContext.Clients.All.NotifyMessagesAsync(_messages);
                    _messages.Clear();
                }
            }
        }

        private void ConfigureMqttClient()
        {
            _mqttClient.ConnectedHandler = this;
            _mqttClient.DisconnectedHandler = this;
            _mqttClient.ApplicationMessageReceivedHandler = this;
        }

        private class Payload
        {
            [JsonProperty("tag")]
            public Guid TagID { get; set; }

            [JsonProperty("probability")]
            public double Probability { get; set; }
        }

        public async Task HandleApplicationMessageReceivedAsync(MqttApplicationMessageReceivedEventArgs eventArgs)
        {
            var message = eventArgs.ApplicationMessage.ConvertPayloadToString();

            _logger.LogDebug($"Recieved [{eventArgs.ClientId}] " +
                $"Topic: {eventArgs.ApplicationMessage.Topic} | Payload: {message} | QoS: {eventArgs.ApplicationMessage.QualityOfServiceLevel} | Retain: {eventArgs.ApplicationMessage.Retain}");

            try
            {
                var payload = JsonConvert.DeserializeObject<Payload>(message);
                var inputResponse = await _inputService.GetInputAsync(payload.TagID);

                lock (_messageLock)
                {
                    _messages.Add(new Message(inputResponse.Message.Device_id, inputResponse.Message.Date.UtcDateTime, payload.Probability));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Could not handle application message.");
            }
        }

        public async Task HandleConnectedAsync(MqttClientConnectedEventArgs eventArgs)
        {
            try
            {
                var topic = _options.UserProperties.SingleOrDefault(up => up.Name == "Topic")?.Value;
                _logger.LogInformation($"Connected. Auth result: {eventArgs.AuthenticateResult}. Subscribing to topic: {topic}");

                await _mqttClient.SubscribeAsync(topic);
                _hubTimer.Start();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Cannot subscribe...");
            }
        }

        public async Task HandleDisconnectedAsync(MqttClientDisconnectedEventArgs eventArgs)
        {
            _logger.LogDebug(eventArgs.Exception, $"Disconnected. Reason {eventArgs.ReasonCode}. Auth result: {eventArgs.AuthenticateResult}. Reconnecting...");

            await Task.Delay(TimeSpan.FromSeconds(5));

            try
            {
                _hubTimer.Stop();
                await _mqttClient.ConnectAsync(_options, CancellationToken.None);
            }
            catch (Exception ex)
            {
                _logger.LogDebug(ex, $"Reconnect failed...");
            }
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            try
            {
                await _mqttClient.ConnectAsync(_options);
                if (!_mqttClient.IsConnected)
                {
                    await _mqttClient.ReconnectAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Cannot connect...");
            }
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            try
            {
                if (cancellationToken.IsCancellationRequested)
                {
                    var disconnectOption = new MqttClientDisconnectOptions
                    {
                        ReasonCode = MqttClientDisconnectReason.NormalDisconnection,
                        ReasonString = "NormalDiconnection"
                    };
                    await _mqttClient.DisconnectAsync(disconnectOption, cancellationToken);
                }
                await _mqttClient.DisconnectAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Cannot disconnect...");
            }
        }
    }
}
