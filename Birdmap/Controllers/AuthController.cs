using AutoMapper;
using Birdmap.API.DTOs;
using Birdmap.BLL.Interfaces;
using Birdmap.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Birdmap.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthController(IAuthService service, IConfiguration configuration, IMapper mapper)
        {
            _service = service;
            _configuration = configuration;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        public async Task<IActionResult> AuthenticateAsync([FromBody] AuthenticateRequest model)
        {
            var user = await _service.AuthenticateUserAsync(model.Username, model.Password);
            var expiresInSeconds = TimeSpan.FromHours(2).TotalSeconds;
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Name),
                        new Claim(ClaimTypes.Role, user.Role.ToString()),
                    }),
                Expires = DateTime.UtcNow.AddHours(expiresInSeconds),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var response = _mapper.Map<AuthenticateResponse>(user);
            response.AccessToken = tokenString;
            response.TokenType = "Bearer";
            response.ExpiresIn = expiresInSeconds;

            return Ok(response);
        }
    }
}
