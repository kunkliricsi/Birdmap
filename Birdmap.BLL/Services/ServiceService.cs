using Birdmap.BLL.Exceptions;
using Birdmap.BLL.Interfaces;
using Birdmap.DAL;
using Birdmap.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Birdmap.BLL.Services
{
    public class ServiceService : IServiceService
    {
        private readonly BirdmapContext _context;

        public ServiceService(BirdmapContext context)
        {
            _context = context;
        }

        public Task<int> GetServiceCountAsync()
        {
            return _context.Services.CountAsync();
        }

        public async Task<Service> CreateServiceAsync(Service service)
        {
            _context.Services.Add(service);
            await _context.SaveChangesAsync();

            return service;
        }

        public Task DeleteServiceAsync(int id)
        {
            var service = _context.Services.Find(id);
            if (service == null)
                return Task.CompletedTask;

            _context.Services.Remove(service);
            return _context.SaveChangesAsync();
        }

        public Task<List<Service>> GetAllServicesAsync()
        {
            return _context.Services.ToListAsync();
        }

        public async Task<Service> GetServiceAsync(int id)
        {
            return await _context.Services.SingleOrDefaultAsync(s => s.Id == id)
                ?? throw new EntityNotFoundException($"Cannot find service with id: {id}.");
        }

        public Task UpdateServiceAsync(Service service)
        {
            _context.Services.Update(service);
            return _context.SaveChangesAsync();
        }
    }
}
