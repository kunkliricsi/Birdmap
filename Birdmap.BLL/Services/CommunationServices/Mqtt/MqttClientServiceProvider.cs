using Birdmap.BLL.Interfaces;

namespace Birdmap.BLL.Services.CommunicationServices.Mqtt
{
    public class MqttClientServiceProvider
    {
        public IMqttClientService MqttClientService { get; }

        public MqttClientServiceProvider(IMqttClientService mqttClientService)
        {
            MqttClientService = mqttClientService;
        }
    }
}
