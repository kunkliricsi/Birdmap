using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Birdmap.API.Services.Hubs
{
    public class ServicesHub : Hub<IServicesHubClient>
    {
        private readonly ILogger<ServicesHub> _logger;

        public ServicesHub(ILogger<ServicesHub> logger)
        {
            _logger = logger;
        }

        public override Task OnConnectedAsync()
        {
            _logger.LogInformation("Services Hub Client connected.");

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _logger.LogInformation("Services Hub Client disconnected.");

            return base.OnDisconnectedAsync(exception);
        }
    }
}
