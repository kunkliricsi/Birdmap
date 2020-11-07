using Birdmap.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Birdmap.BLL.Services
{
    public class DummyDeviceService : DeviceServiceBase
    {
        private const double centerLong = 21.469640;
        private const double centerLat = 48.275939;
        private const double radius = 0.000200;

        private readonly Lazy<ICollection<Device>> _devices = new Lazy<ICollection<Device>>(GenerateDevices);
        private static ListOfDevices GenerateDevices()
        {
            var devices = new ListOfDevices();
            var rand = new Random();

            T GetRandomEnum<T>()
            {
                var values = Enum.GetValues(typeof(T));
                return (T)values.GetValue(rand.Next(values.Length));
            }

            double GetPlusMinus(double center, double radius)
            {
                return center - radius + rand.NextDouble() * radius * 2;
            }

            for (int d = 0; d < 15; d++)
            {
                var sensors = new ArrayofSensors();
                for (int s = 0; s < rand.Next(1, 5); s++)
                {
                    sensors.Add(new Sensor
                    {
                        Id = Guid.NewGuid(),
                        Status = GetRandomEnum<SensorStatus>(),
                    });
                }

                devices.Add(new Device
                {
                    Id = Guid.NewGuid(),
                    Sensors = sensors,
                    Status = GetRandomEnum<DeviceStatus>(),
                    Url = "dummyservice.device.url",
                    Coordinates = new Coordinates
                    {
                        Latitude = GetPlusMinus(centerLat, radius),
                        Longitude = GetPlusMinus(centerLong, radius),
                    }
                });
            }

            return devices;
        }

        public override Task<ICollection<Device>> GetallAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(_devices.Value);
        }

        public override Task<Device> GetdeviceAsync(Guid deviceID, CancellationToken cancellationToken)
        {
            return Task.FromResult(_devices.Value.SingleOrDefault(d => d.Id == deviceID));
        }

        public override Task<Sensor> GetsensorAsync(Guid deviceID, Guid sensorID, CancellationToken cancellationToken)
        {
            return Task.FromResult(_devices.Value.SingleOrDefault(d => d.Id == deviceID)?.Sensors.SingleOrDefault(s => s.Id == sensorID));
        }

        public override Task OfflineallAsync(CancellationToken cancellationToken)
        {
            SetStatus(DeviceStatus.Offline, SensorStatus.Offline);

            return Task.CompletedTask;
        }

        public override Task OfflinedeviceAsync(Guid deviceID, CancellationToken cancellationToken)
        {
            SetDeviceStatus(deviceID, DeviceStatus.Offline);
            return Task.CompletedTask;
        }

        public override Task OfflinesensorAsync(Guid deviceID, Guid sensorID, CancellationToken cancellationToken)
        {
            SetSensorStatus(deviceID, sensorID, SensorStatus.Offline);
            return Task.CompletedTask;
        }

        public override Task OnlineallAsync(CancellationToken cancellationToken)
        {
            SetStatus(DeviceStatus.Online, SensorStatus.Online);

            return Task.CompletedTask;
        }

        public override Task OnlinedeviceAsync(Guid deviceID, CancellationToken cancellationToken)
        {
            SetDeviceStatus(deviceID, DeviceStatus.Online);
            return Task.CompletedTask;
        }

        public override Task OnlinesensorAsync(Guid deviceID, Guid sensorID, CancellationToken cancellationToken)
        {
            SetSensorStatus(deviceID, sensorID, SensorStatus.Online);
            return Task.CompletedTask;
        }

        private void SetStatus(DeviceStatus deviceStatus, SensorStatus sensorStatus)
        {
            foreach (var device in _devices.Value)
            {
                device.Status = deviceStatus;
                foreach (var sensor in device.Sensors)
                {
                    sensor.Status = sensorStatus;
                }
            }
        }

        private void SetDeviceStatus(Guid deviceID, DeviceStatus status)
        {
            var device = GetdeviceAsync(deviceID).Result;
            device.Status = status;
        }

        private void SetSensorStatus(Guid deviceId, Guid sensorID, SensorStatus status)
        {
            var sensor = GetsensorAsync(deviceId, sensorID).Result;
            sensor.Status = status;
        }
    }
}
