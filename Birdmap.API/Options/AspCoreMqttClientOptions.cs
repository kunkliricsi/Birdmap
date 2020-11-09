using MQTTnet.Client.Options;
using System;

namespace Birdmap.API.Options
{
    public class AspCoreMqttClientOptions : MqttClientOptionsBuilder
    {
        public IServiceProvider ServiceProvider { get; }

        public AspCoreMqttClientOptions(IServiceProvider serviceProvider)
        {
            ServiceProvider = serviceProvider;
        }

        public AspCoreMqttClientOptions WithTopic(string topic)
        {
            WithUserProperty("Topic", topic);

            return this;
        }
    }
}
