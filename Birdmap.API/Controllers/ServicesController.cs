using AutoMapper;
using Birdmap.API.DTOs;
using Birdmap.BLL.Interfaces;
using Birdmap.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Birdmap.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _service;
        private readonly IMapper _mapper;
        private readonly ILogger<ServicesController> _logger;

        public ServicesController(IServiceService service, IMapper mapper, ILogger<ServicesController> logger)
        {
            _service = service;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ServiceInfo>>> GetAsync()
        {
            _logger.LogInformation($"Getting all services from db...");
            var serviceInfos = (await _service.GetAllServicesAsync())
                .Select(s => new ServiceInfo { Service = _mapper.Map<ServiceRequest>(s) });

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
                    si.StatusCode = System.Net.HttpStatusCode.ServiceUnavailable;
                    si.Response = ex.ToString();
                }
            }

            return serviceInfos.ToList();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<ServiceRequest>> PostAsync(ServiceRequest request)
        {
            _logger.LogInformation($"Creating service [{request.Name}]...");
            var created = await _service.CreateServiceAsync(
                _mapper.Map<Service>(request));

            _logger.LogInformation($"Created service [{created.Id}].");

            return CreatedAtAction(
                nameof(GetAsync),
                _mapper.Map<ServiceRequest>(created));
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> PutAsync(ServiceRequest request)
        {
            _logger.LogInformation($"Updating service [{request.Name}]...");
            var service = _mapper.Map<Service>(request);
            service.IsFromConfig = false;

            await _service.UpdateServiceAsync(service);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            _logger.LogInformation($"Deleting service [{id}]...");

            await _service.DeleteServiceAsync(id);

            return NoContent();
        }
    }
}
