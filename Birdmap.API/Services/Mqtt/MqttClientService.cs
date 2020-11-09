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

namespace Birdmap.API.Services.Mqtt
{
    public class MqttClientService : IMqttClientService
    {
        private readonly IMqttClient _mqttClient;
        private readonly IMqttClientOptions _options;
        private readonly ILogger<MqttClientService> _logger;
        private readonly IInputService _inputService;
        private readonly IHubContext<DevicesHub, IDevicesHubClient> _hubContext;

        public MqttClientService(IMqttClientOptions options, ILogger<MqttClientService> logger, IInputService inputService, IHubContext<DevicesHub, IDevicesHubClient> hubContext)
        {
            _options = options;
            _logger = logger;
            _inputService = inputService;
            _hubContext = hubContext;
            _mqttClient = new MqttFactory().CreateMqttClient();
            ConfigureMqttClient();
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

            _logger.LogInformation($"Recieved [{eventArgs.ClientId}] " +
                $"Topic: {eventArgs.ApplicationMessage.Topic} | Payload: {message} | QoS: {eventArgs.ApplicationMessage.QualityOfServiceLevel} | Retain: {eventArgs.ApplicationMessage.Retain}");

            var payload = JsonConvert.DeserializeObject<Payload>(message);
            var inputResponse = await _inputService.GetInputAsync(payload.TagID);

            await _hubContext.Clients.All.NotifyDeviceAsync(inputResponse.Message.Device_id, inputResponse.Message.Date.UtcDateTime, payload.Probability);
        }

        public async Task HandleConnectedAsync(MqttClientConnectedEventArgs eventArgs)
        {
            try
            {
                var topic = _options.UserProperties.SingleOrDefault(up => up.Name == "Topic")?.Value;
                _logger.LogInformation($"Connected. Auth result: {eventArgs.AuthenticateResult}. Subscribing to topic: {topic}");

                await _mqttClient.SubscribeAsync(topic);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Cannot subscribe...");
            }
        }

        public async Task HandleDisconnectedAsync(MqttClientDisconnectedEventArgs eventArgs)
        {
            _logger.LogWarning(eventArgs.Exception, $"Disconnected. Reason {eventArgs.ReasonCode}. Auth result: {eventArgs.AuthenticateResult}. Reconnecting...");

            await Task.Delay(TimeSpan.FromSeconds(5));

            try
            {
                await _mqttClient.ConnectAsync(_options, CancellationToken.None);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Reconnect failed...");
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
