﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Birdmap.DAL
{
    public static class Startup
    {
        public static IServiceCollection ConfigureDAL(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<BirdmapContext>(o =>
                o.UseSqlServer(configuration["LocalDbConnectionString"]));

            services.AddHealthChecks()
                .AddDbContextCheck<BirdmapContext>();

            services.AddTransient<DbInitializer>();

            return services;
        }
    }
}
