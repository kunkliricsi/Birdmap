using AutoMapper;
using Birdmap.API.Middlewares;
using Birdmap.BLL;
using Birdmap.BLL.Services.CommunicationServices.Hubs;
using Birdmap.DAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using NSwag.Generation.Processors.Security;
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

            var key = Encoding.ASCII.GetBytes(Configuration["Secret"]);
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(opt =>
            {
                //opt.RequireHttpsMetadata = false;
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

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSwaggerDocument(opt =>
            {
                opt.Title = "Birdmap";
                opt.OperationProcessors.Add(new OperationSecurityScopeProcessor("Jwt Token"));
                opt.AddSecurity("Jwt Token", new string[] { },
                    new NSwag.OpenApiSecurityScheme
                    {
                        Type = NSwag.OpenApiSecuritySchemeType.ApiKey,
                        Name = "Authorization",
                        In = NSwag.OpenApiSecurityApiKeyLocation.Header,
                        Description = "Bearer {token}",
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMiddleware<ExceptionHandlerMiddleware>();

            app.UseOpenApi();
            app.UseSwaggerUi3();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();


            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHealthChecks("/health");
                endpoints.MapControllers();
                endpoints.MapHub<DevicesHub>("/hubs/devices");
                endpoints.MapHub<ServicesHub>("/hubs/services");
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
