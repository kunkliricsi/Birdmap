using Birdmap.BLL.Interfaces;
using Birdmap.BLL.Options;
using Birdmap.BLL.Services;
using Birdmap.BLL.Services.CommunicationServices.Mqtt;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
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

            services.AddSignalR();

            services.AddMqttClientServiceWithConfig(opt =>
            {
                var mqtt = configuration.GetSection("Mqtt");

                var mqttClient = mqtt.GetSection("ClientSettings");
                var clientSettings = new
                {
                    Id = mqttClient.GetValue<string>("Id"),
                    Username = mqttClient.GetValue<string>("Username"),
                    Password = mqttClient.GetValue<string>("Password"),
                    Topic = mqttClient.GetValue<string>("Topic"),
                };

                var mqttBrokerHost = mqtt.GetSection("BrokerHostSettings");
                var brokerHostSettings = new
                {
                    Host = mqttBrokerHost.GetValue<string>("Host"),
                    Port = mqttBrokerHost.GetValue<int>("Port"),
                };

                opt
                .WithTopic(clientSettings.Topic)
                .WithCredentials(clientSettings.Username, clientSettings.Password)
                .WithClientId(clientSettings.Id)
                .WithTcpServer(brokerHostSettings.Host, brokerHostSettings.Port);
            });

            return services;
        }

        private static IServiceCollection AddMqttClientServiceWithConfig(this IServiceCollection services, Action<AspCoreMqttClientOptions> configureOptions)
        {
            services.AddSingleton(serviceProvider =>
            {
                var optionBuilder = new AspCoreMqttClientOptions(serviceProvider);
                configureOptions(optionBuilder);
                return optionBuilder.Build();
            });
            services.AddSingleton<MqttClientService>();
            services.AddSingleton<IHostedService>(serviceProvider =>
            {
                return serviceProvider.GetService<MqttClientService>();
            });
            services.AddSingleton(serviceProvider =>
            {
                var mqttClientService = serviceProvider.GetService<MqttClientService>();
                var mqttClientServiceProvider = new MqttClientServiceProvider(mqttClientService);
                return mqttClientServiceProvider;
            });
            return services;
        }
    }
}
