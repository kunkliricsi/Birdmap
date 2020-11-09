namespace Birdmap.API.Services.Mqtt
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
