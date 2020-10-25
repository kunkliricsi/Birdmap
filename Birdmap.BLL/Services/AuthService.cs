using Birdmap.BLL.Interfaces;
using Birdmap.DAL.Entities;
using System;
using System.Security.Authentication;
using System.Threading.Tasks;
using static Birdmap.Common.PasswordHelper;

namespace Birdmap.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;

        public AuthService(IUserService userService)
        {
            _userService = userService;
        }

        public Task<User> AuthenticateUserAsync(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrEmpty(password))
                throw new ArgumentException("Username or password cannot be null or empty.");

            return AuthenticateUserInternalAsync(username, password);
        }

        public Task<User> RegisterUserAsync(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrEmpty(password))
                throw new ArgumentException("Username or password cannot be null or empty.");

            return RegisterUserInternalAsync(username, password);
        }

        private async Task<User> AuthenticateUserInternalAsync(string username, string password)
        {
            var user = await _userService.GetUserAsync(username)
                ?? throw new AuthenticationException();

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                throw new AuthenticationException();

            return user;
        }

        private Task<User> RegisterUserInternalAsync(string username, string password)
        {
            CreatePasswordHash(password, out var hash, out var salt);
            var user = new User
            {
                Name = username,
                PasswordHash = hash,
                PasswordSalt = salt,
                Role = Roles.User,
            };

            return _userService.CreateUserAsync(user);
        }
    }
}
