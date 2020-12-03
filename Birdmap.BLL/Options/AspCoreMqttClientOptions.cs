using MQTTnet.Client.Options;
using System;

namespace Birdmap.BLL.Options
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
