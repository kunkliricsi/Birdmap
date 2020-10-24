using Birdmap.DAL.Entities;
using Birdmap.BLL.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using Birdmap.DAL;
using Microsoft.EntityFrameworkCore;

namespace Birdmap.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly BirdmapContext _context;

        public AuthService(BirdmapContext context)
        {
            _context = context;
        }

        public Task<User> AuthenticateUserAsync(string username, string password)
        {
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrEmpty(password))
                throw new ArgumentException("Username or password cannot be null or empty.");

            return AuthenticateUserInternalAsync(username, password);
        }

        private async Task<User> AuthenticateUserInternalAsync(string username, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Name == username)
                ?? throw new AuthenticationException();

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                throw new AuthenticationException();

            return user;
        }

        private Task<User> Temp_GetUserAsync(IConfiguration configuration)
        {
            var name = configuration["BasicAuth:Username"];
            var pass = configuration["BasicAuth:Password"];

            CreatePasswordHash(pass, out var hash, out var salt);
            return Task.FromResult(new User
            {
                Name = name,
                PasswordHash = hash,
                PasswordSalt = salt,
            });
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be null or empty.", "password");

            using var hmac = new System.Security.Cryptography.HMACSHA512();

            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be null or empty.", nameof(password));
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", nameof(storedHash));
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", nameof(storedSalt));

            using var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != storedHash[i]) return false;
            }

            return true;
        }
    }
}
