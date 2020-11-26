using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Birdmap.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class LogsController : ControllerBase
    {
        private readonly ILogger<LogsController> _logger;
        private readonly string _logFolderPath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "Logs");

        public LogsController(ILogger<LogsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("all")]
        public ActionResult<List<string>> GetAll()
        {
            _logger.LogInformation($"Getting all log filenames from folder: '{_logFolderPath}'...");

            return Directory.EnumerateFiles(_logFolderPath, "*.log")
                .Select(f => Path.GetFileName(f))
                .ToList();
        }

        [HttpGet]
        public async Task<IActionResult> GetFiles([FromQuery] params string[] filenames)
        {
            if (!filenames.Any())
                return null;

            return await Task.Run(() =>
            {
                var zipStream = new MemoryStream();

                using (var zip = new ZipArchive(zipStream, ZipArchiveMode.Create, true))
                {
                    foreach (var file in Directory.GetFiles(_logFolderPath, "*.log"))
                    {
                        var filename = Path.GetFileName(file);

                        if (filenames.Contains(filename))
                        {
                            zip.CreateEntryFromFile(file, filename);
                        }
                    }
                }

                zipStream.Position = 0;

                return File(zipStream, "application/octet-stream");
            });
        }
    }
}
