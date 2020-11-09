using System;
using System.Threading.Tasks;

namespace Birdmap.API.Services
{
    public interface IDevicesHubClient
    {
        Task NotifyDeviceAsync(Guid deviceId, DateTime date, double probability);
    }
}
