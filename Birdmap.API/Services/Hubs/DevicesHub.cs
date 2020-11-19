﻿using Microsoft.AspNetCore.SignalR;
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
            _logger.LogInformation("Devices Hub Client connected.");

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _logger.LogInformation("Devices Hub Client disconnected.");

            return base.OnDisconnectedAsync(exception);
        }
    }
}
