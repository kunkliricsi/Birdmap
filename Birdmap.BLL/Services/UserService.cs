using Birdmap.BLL.Exceptions;
using Birdmap.BLL.Interfaces;
using Birdmap.DAL;
using Birdmap.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Birdmap.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly BirdmapContext _context;

        public UserService(BirdmapContext context)
        {
            _context = context;
        }

        public async Task<User> CreateUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public Task DeleteUserAsync(int userId)
        {
            return DeleteUserInternalAsync(userId);
        }

        public Task DeleteUserAsync(string username)
        {
            return DeleteUserInternalAsync(username);
        }

        public async Task<User> GetUserAsync(int userId)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Id == userId)
                ?? throw new EntityNotFoundException($"Cannot find user with user ID: {userId}");
        }

        public async Task<User> GetUserAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Name == username)
                ?? throw new EntityNotFoundException($"Cannot find user with username: {username}");
        }

        public Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            return _context.SaveChangesAsync();
        }

        private Task DeleteUserInternalAsync(object key)
        {
            var user = _context.Users.Find(key);

            if (user == null)
                return Task.CompletedTask;

            _context.Users.Remove(user);
            return _context.SaveChangesAsync();
        }
    }
}
