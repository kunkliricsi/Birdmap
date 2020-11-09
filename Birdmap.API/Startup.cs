using AutoMapper;
using Birdmap.API.Extensions;
using Birdmap.API.Middlewares;
using Birdmap.API.Services.Hubs;
using Birdmap.BLL;
using Birdmap.DAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Birdmap.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews()
                .AddJsonOptions(opt =>
                {
                    opt.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
                    opt.JsonSerializerOptions.IgnoreNullValues = true;
                    //opt.JsonSerializerOptions.PropertyNamingPolicy = new JsonNamingPolicy()
                });

            services.ConfigureBLL(Configuration);
            services.ConfigureDAL(Configuration);

            services.AddAutoMapper(typeof(Startup));

            services.AddSignalR();

            var key = Encoding.ASCII.GetBytes(Configuration["Secret"]);
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(opt =>
            {
                // opt.RequireHttpsMetadata = false;
                opt.SaveToken = true;
                opt.IncludeErrorDetails = true;
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddMqttClientServiceWithConfig(opt =>
            {
                var mqtt = Configuration.GetSection("Mqtt");

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

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseMiddleware<ExceptionHandlerMiddleware>();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthorization();
            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHealthChecks("/health");
                endpoints.MapControllers();
                endpoints.MapHub<DevicesHub>("/hubs/devices");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
