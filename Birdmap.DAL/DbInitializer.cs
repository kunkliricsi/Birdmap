using Birdmap.DAL.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using static Birdmap.Common.PasswordHelper;

namespace Birdmap.DAL
{
    public class DbInitializer
    {
        private readonly BirdmapContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<DbInitializer> _logger;

        public DbInitializer(BirdmapContext context, IConfiguration configuration, ILogger<DbInitializer> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        public void Initialize()
        {
            EnsureCreated();
            AddDefaultUsers();
            AddDefaultServices();
        }

        private void EnsureCreated()
        {
            _logger.LogInformation("Ensuring database is created...");
            _context.Database.EnsureCreated();
        }

        private void AddDefaultServices()
        {
            _logger.LogInformation("Removing previously added default services...");
            var alreadyAddedDefaultServices = _context.Services.Where(s => s.IsFromConfig);
            _context.Services.RemoveRange(alreadyAddedDefaultServices);

            _logger.LogInformation("Adding new default services...");
            foreach (var service in _configuration.GetSection("Defaults:Services").GetChildren())
            {
                _context.Services.Add(new Service
                {
                    Name = service.Key,
                    Uri = new Uri(service.Value),
                    IsFromConfig = true,
                });
            }

            _context.SaveChanges();
        }

        private void AddDefaultUsers()
        {
            _logger.LogInformation("Removing previously added default users...");
            var alreadyAddedDefaultUsers = _context.Users.Where(s => s.IsFromConfig);
            _context.Users.RemoveRange(alreadyAddedDefaultUsers);

            var users = _configuration.GetSection("Defaults:Users").GetChildren()
                .Select(c => new
                {
                    Name = c.GetValue<string>("Name"),
                    Password = c.GetValue<string>("Password"),
                    Role = Enum.Parse<Roles>(c.GetValue<string>("Role"))
                });

            _logger.LogInformation("Adding new default users...");
            foreach (var user in users)
            {
                CreatePasswordHash(user.Password, out var hash, out var salt);

                _context.Users.Add(new User
                {
                    Name = user.Name,
                    PasswordHash = hash,
                    PasswordSalt = salt,
                    Role = user.Role,
                    IsFromConfig = true,
                });
            }

            _context.SaveChanges();
        }
    }
}
