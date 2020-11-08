using Birdmap.BLL.Interfaces;
using Birdmap.BLL.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
                services.AddTransient<IInputService, LiveInputService>();
                services.AddTransient<IDeviceService, LiveDummyService>();
            }

            return services;
        }
    }
}
