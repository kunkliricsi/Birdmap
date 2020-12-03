using Birdmap.BLL.Interfaces;
using Birdmap.BLL.Services.CommunicationServices.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Birdmap.API.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class DevicesController : ControllerBase
    {
        private readonly IDeviceService _service;
        private readonly IHubContext<DevicesHub, IDevicesHubClient> _hubContext;
        private readonly ILogger<ServicesController> _logger;

        public DevicesController(IDeviceService service, IHubContext<DevicesHub, IDevicesHubClient> hubContext, ILogger<ServicesController> logger)
        {
            _service = service;
            _hubContext = hubContext;
            _logger = logger;
        }

        /// <summary>Get all device info</summary>
        /// <returns>Array of devices</returns>
        [HttpGet]
        public async Task<ActionResult<List<Device>>> Getall()
        {
            _logger.LogInformation("Getting all devices...");

            return (await _service.GetallAsync()).ToList();
        }

        /// <summary>Shut down all devices</summary>
        /// <returns>Message sent</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost, Route("offline")]
        public async Task<IActionResult> Offlineall()
        {
            _logger.LogInformation("Turning off all devices and sensors...");

            await _service.OfflineallAsync();
            await _hubContext.Clients.All.NotifyAllUpdatedAsync();

            return Ok();
        }

        /// <summary>Bring all devices online</summary>
        /// <returns>Message sent</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost, Route("online")]
        public async Task<IActionResult> Onlineall()
        {
            _logger.LogInformation("Turning on all devices and sensors...");

            await _service.OnlineallAsync();
            await _hubContext.Clients.All.NotifyAllUpdatedAsync();

            return Ok();
        }

        /// <summary>Get all device info</summary>
        /// <param name="deviceID">ID of device to query</param>
        /// <returns>Information about a particular device</returns>
        [HttpGet, Route("{deviceID}")]
        public async Task<ActionResult<Device>> Getdevice([BindRequired] Guid deviceID)
        {
            _logger.LogInformation($"Getting device [{deviceID}]...");

            return await _service.GetdeviceAsync(deviceID);
        }

        /// <summary>Shut down device</summary>
        /// <param name="deviceID">ID of device to shut down</param>
        /// <returns>Message sent</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost, Route("{deviceID}/offline")]
        public async Task<IActionResult> Offlinedevice([BindRequired] Guid deviceID)
        {
            _logger.LogInformation($"Turning off device [{deviceID}]...");

            await _service.OfflinedeviceAsync(deviceID);
            await _hubContext.Clients.All.NotifyDeviceUpdatedAsync(deviceID);

            return Ok();
        }

        /// <summary>Bring device online</summary>
        /// <param name="deviceID">ID of device to bring online</param>
        /// <returns>Message sent</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost, Route("{deviceID}/online")]
        public async Task<IActionResult> Onlinedevice([BindRequired] Guid deviceID)
        {
            _logger.LogInformation($"Turning on device [{deviceID}]...");

            await _service.OnlinedeviceAsync(deviceID);
            await _hubContext.Clients.All.NotifyDeviceUpdatedAsync(deviceID);

            return Ok();
        }

        /// <summary>Get info about a particular device's sensor</summary>
        /// <param name="deviceID">ID of device to query</param>
        /// <param name="sensorID">ID of sensor to query</param>
        /// <returns>Information about a sensor</returns>
        [HttpGet, Route("{deviceID}/{sensorID}")]
        public async Task<ActionResult<Sensor>> Getsensor([BindRequired] Guid deviceID, [BindRequired] Guid sensorID)
        {
            _logger.LogInformation($"Getting sensor [{sensorID}] of device [{deviceID}]...");

            return await _service.GetsensorAsync(deviceID, sensorID);
        }

        /// <summary>Shut down sensor</summary>
        /// <param name="deviceID">ID of device to query</param>
        /// <param name="sensorID">ID of sensor to query</param>
        /// <returns>Message sent</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost, Route("{deviceID}/{sensorID}/offline")]
        public async Task<IActionResult> Offlinesensor([BindRequired] Guid deviceID, [BindRequired] Guid sensorID)
        {
            _logger.LogInformation($"Turning off sensor [{sensorID}] of device [{deviceID}]...");

            await _service.OfflinesensorAsync(deviceID, sensorID);
            await _hubContext.Clients.All.NotifyDeviceUpdatedAsync(deviceID);

            return Ok();
        }

        /// <summary>Bring sensor online</summary>
        /// <param name="deviceID">ID of device to query</param>
        /// <param name="sensorID">ID of sensor to query</param>
        /// <returns>Message sent</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost, Route("{deviceID}/{sensorID}/online")]
        public async Task<IActionResult> Onlinesensor([BindRequired] Guid deviceID, [BindRequired] Guid sensorID)
        {
            _logger.LogInformation($"Turning on sensor [{sensorID}] of device [{deviceID}]...");

            await _service.OnlinesensorAsync(deviceID, sensorID);
            await _hubContext.Clients.All.NotifyDeviceUpdatedAsync(deviceID);

            return Ok();
        }
    }
}

#pragma warning restore 1591
#pragma warning restore 1573
#pragma warning restore 472
#pragma warning restore 114
#pragma warning restore 108