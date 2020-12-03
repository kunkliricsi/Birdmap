using System.Threading.Tasks;

namespace Birdmap.BLL.Services.CommunicationServices.Hubs
{
    public interface IServicesHubClient
    {
        Task NotifyUpdatedAsync();
    }
}
