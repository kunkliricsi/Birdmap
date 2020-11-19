using AutoMapper;
using Birdmap.API.DTOs;
using Birdmap.API.Services;
using Birdmap.API.Services.Hubs;
using Birdmap.API.Services.Mqtt;
using Birdmap.BLL.Interfaces;
using Birdmap.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Birdmap.API.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _service;
        private readonly IMapper _mapper;
        private readonly IMqttClientService _mqttClientService;
        private readonly IHubContext<ServicesHub, IServicesHubClient> _hubContext;
        private readonly ILogger<ServicesController> _logger;

        public ServicesController(IServiceService service, IMapper mapper, MqttClientServiceProvider mqttClientProvider,
            IHubContext<ServicesHub, IServicesHubClient> hubContext, ILogger<ServicesController> logger)
        {
            _service = service;
            _mapper = mapper;
            _mqttClientService = mqttClientProvider.MqttClientService;
            _hubContext = hubContext;
            _logger = logger;
        }

        [HttpGet("count"), ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<int>> GetCountAsync()
        {
            _logger.LogInformation($"Getting service count from db...");

            return await _service.GetServiceCountAsync() + 1;
        }

        [HttpGet, ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ServiceInfo>>> GetAsync()
        {
            _logger.LogInformation($"Getting all services from db...");
            var serviceInfos = (await _service.GetAllServicesAsync())
                .Select(s => new ServiceInfo { Service = _mapper.Map<ServiceRequest>(s) }).ToList();

            var client = new HttpClient();
            foreach (var si in serviceInfos)
            {
                try
                {
                    _logger.LogInformation($"Sending a request to service [{si.Service.Name}] with url [{si.Service.Uri}]...");
                    var response = await client.GetAsync(si.Service.Uri);
                    si.StatusCode = response.StatusCode;
                    si.Response = await response.Content.ReadAsStringAsync();
                }
                catch (Exception ex)
                {
                    _logger.LogWarning($"Requesting service [{si.Service.Name}] faulted.");
                    si.StatusCode = HttpStatusCode.ServiceUnavailable;
                    si.Response = ex.ToString();
                }
            }

            serviceInfos.Add(new()
            {
                Service = new()
                {
                    Id = 0,
                    Name = "Mqtt Client Service",
                    Uri = "localhost",
                },
                Response = $"IsConnected: {_mqttClientService.IsConnected}",
                StatusCode = _mqttClientService.IsConnected ? HttpStatusCode.OK : HttpStatusCode.ServiceUnavailable,
            });

            return serviceInfos.ToList();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost, ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<ServiceRequest>> PostAsync(ServiceRequest request)
        {
            _logger.LogInformation($"Creating service [{request.Name}]...");
            var created = await _service.CreateServiceAsync(
                _mapper.Map<Service>(request));

            _logger.LogInformation($"Created service [{created.Id}].");
            await _hubContext.Clients.All.NotifyUpdatedAsync();

            return CreatedAtAction(
                nameof(GetAsync),
                _mapper.Map<ServiceRequest>(created));
        }

        [Authorize(Roles = "Admin")]
        [HttpPut, ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> PutAsync(ServiceRequest request)
        {
            _logger.LogInformation($"Updating service [{request.Name}]...");
            var service = _mapper.Map<Service>(request);
            service.IsFromConfig = false;

            await _service.UpdateServiceAsync(service);
            await _hubContext.Clients.All.NotifyUpdatedAsync();

            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}"), ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            _logger.LogInformation($"Deleting service [{id}]...");

            await _service.DeleteServiceAsync(id);
            await _hubContext.Clients.All.NotifyUpdatedAsync();

            return NoContent();
        }
    }
}
