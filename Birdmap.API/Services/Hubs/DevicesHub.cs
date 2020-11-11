using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Birdmap.API.Services.Hubs
{
    public class DevicesHub : Hub<IDevicesHubClient>
    {
        private readonly ILogger<DevicesHub> _logger;

        public DevicesHub(ILogger<DevicesHub> logger)
        {
            _logger = logger;
        }

        public override Task OnConnectedAsync()
        {
            _logger.LogInformation("Client connected.");

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _logger.LogInformation("Client disconnected.");

            return base.OnDisconnectedAsync(exception);
        }

        public Task SendNotification(Guid deviceId, DateTime date, double probability)
        {
            return Clients.All.NotifyDeviceAsync(deviceId, date, probability);
        }
    }
}
