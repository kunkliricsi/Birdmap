using Birdmap.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Birdmap.BLL.Services
{
    public abstract class DeviceAndInputServiceBase : IDeviceService, IInputService
    {
        public virtual Task<InputSingeResponse> GetInputAsync(Guid tagID)
            => GetInputAsync(tagID, CancellationToken.None);
        public abstract Task<InputSingeResponse> GetInputAsync(Guid tagID, CancellationToken cancellationToken);

        public virtual Task<ICollection<Device>> GetallAsync()
            => GetallAsync(CancellationToken.None);
        public abstract Task<ICollection<Device>> GetallAsync(CancellationToken cancellationToken);
        public virtual Task<Device> GetdeviceAsync(Guid deviceID)
            => GetdeviceAsync(deviceID, CancellationToken.None);
        public abstract Task<Device> GetdeviceAsync(Guid deviceID, CancellationToken cancellationToken);
        public virtual Task<Sensor> GetsensorAsync(Guid deviceID, Guid sensorID)
            => GetsensorAsync(deviceID, sensorID, CancellationToken.None);
        public abstract Task<Sensor> GetsensorAsync(Guid deviceID, Guid sensorID, CancellationToken cancellationToken);
        public virtual Task OfflineallAsync()
            => OfflineallAsync(CancellationToken.None);
        public abstract Task OfflineallAsync(CancellationToken cancellationToken);
        public virtual Task OfflinedeviceAsync(Guid deviceID)
            => OfflinedeviceAsync(deviceID, CancellationToken.None);
        public abstract Task OfflinedeviceAsync(Guid deviceID, CancellationToken cancellationToken);
        public virtual Task OfflinesensorAsync(Guid deviceID, Guid sensorID)
            => OfflinesensorAsync(deviceID, sensorID, CancellationToken.None);
        public abstract Task OfflinesensorAsync(Guid deviceID, Guid sensorID, CancellationToken cancellationToken);
        public virtual Task OnlineallAsync()
            => OnlineallAsync(CancellationToken.None);
        public abstract Task OnlineallAsync(CancellationToken cancellationToken);
        public virtual Task OnlinedeviceAsync(Guid deviceID)
            => OnlinedeviceAsync(deviceID, CancellationToken.None);
        public abstract Task OnlinedeviceAsync(Guid deviceID, CancellationToken cancellationToken);
        public virtual Task OnlinesensorAsync(Guid deviceID, Guid sensorID)
            => OnlinesensorAsync(deviceID, sensorID, CancellationToken.None);
        public abstract Task OnlinesensorAsync(Guid deviceID, Guid sensorID, CancellationToken cancellationToken);
    }
}
