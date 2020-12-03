using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Birdmap.BLL.Services.CommunicationServices.Hubs
{
    public record Message(Guid DeviceId, DateTime Date, double Probability);

    public interface IDevicesHubClient
    {
        Task NotifyMessagesAsync(IEnumerable<Message> messages);
        Task NotifyDeviceUpdatedAsync(Guid deviceId);
        Task NotifyAllUpdatedAsync();
    }
}
