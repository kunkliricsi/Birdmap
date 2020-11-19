using System.Threading.Tasks;

namespace Birdmap.API.Services.Hubs
{
    public interface IServicesHubClient
    {
        Task NotifyUpdatedAsync();
    }
}
