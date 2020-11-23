using Birdmap.BLL.Interfaces;
using Birdmap.BLL.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http;

namespace Birdmap.BLL
{
    public static class Startup
    {
        public static IServiceCollection ConfigureBLL(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IServiceService, ServiceService>();

            if (configuration.GetValue<bool>("UseDummyServices"))
            {
                services.AddTransient<IInputService, DummyDeviceAndInputService>();
                services.AddTransient<IDeviceService, DummyDeviceAndInputService>();
            }
            else
            {
                var baseUrl = configuration.GetValue<string>("ServicesBaseUrl");

                services.AddTransient<IInputService, LiveInputService>(serviceProvider =>
                {
                    var httpClient = serviceProvider.GetService<HttpClient>();
                    var service = new LiveInputService(baseUrl, httpClient);
                    return service;
                });
                services.AddTransient<IDeviceService, LiveDummyService>(serviceProvider =>
                {
                    var httpClient = serviceProvider.GetService<HttpClient>();
                    var service = new LiveDummyService(baseUrl, httpClient);
                    return service;
                });
            }

            return services;
        }
    }
}
