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
            _logger.LogInformation("Hub Client connected.");

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _logger.LogInformation("Hub Client disconnected.");

            return base.OnDisconnectedAsync(exception);
        }

        public Task SendProbabilityAsync(Guid deviceId, DateTime date, double probability)
        {
            return Clients.All.NotifyDeviceAsync(deviceId, date, probability);
        }

        public Task SendDeviceUpdateAsync(Guid deviceId)
        {
            return Clients.All.NotifyDeviceUpdatedAsync(deviceId);
        }

        public Task SendAllUpdatedAsync()
        {
            return Clients.All.NotifyAllUpdatedAsync();
        }
    }
}
