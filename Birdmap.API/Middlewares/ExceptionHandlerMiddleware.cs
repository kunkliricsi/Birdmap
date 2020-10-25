using Birdmap.BLL.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Birdmap.API.Middlewares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlerMiddleware> _logger;

        public ExceptionHandlerMiddleware(RequestDelegate next, ILogger<ExceptionHandlerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleException(context, ex);
            }
        }

        private Task HandleException(HttpContext context, Exception ex)
        {
            _logger.LogWarning(ex, "");

            var code = ex switch
            {
                AuthenticationException _ => HttpStatusCode.Unauthorized,
                EntityNotFoundException _ => HttpStatusCode.NotFound,
                ArgumentException _ => HttpStatusCode.BadRequest,
                DbUpdateConcurrencyException _ => HttpStatusCode.Conflict,
                _ => HttpStatusCode.InternalServerError,
            };

            var result = JsonConvert.SerializeObject(new { error = ex.Message, exception = ex.ToString() });

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;

            return context.Response.WriteAsync(result);
        }
    }
}