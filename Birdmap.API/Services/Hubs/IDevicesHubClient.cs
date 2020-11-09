using System;
using System.Threading.Tasks;

namespace Birdmap.API.Services.Hubs
{
    public interface IDevicesHubClient
    {
        Task NotifyDeviceAsync(Guid deviceId, DateTime date, double probability);
    }
}
