namespace Birdmap.BLL.Interfaces
{
    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.2.1.0 (Newtonsoft.Json v12.0.0.0)")]
    public partial class ListOfDevices : System.Collections.ObjectModel.Collection<Device>
    {

    }

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.2.1.0 (Newtonsoft.Json v12.0.0.0)")]
    public partial class Device
    {
        [Newtonsoft.Json.JsonProperty("id", Required = Newtonsoft.Json.Required.Always)]
        [System.ComponentModel.DataAnnotations.Required(AllowEmptyStrings = true)]
        public System.Guid Id { get; set; }

        [Newtonsoft.Json.JsonProperty("status", Required = Newtonsoft.Json.Required.Always)]
        [System.ComponentModel.DataAnnotations.Required(AllowEmptyStrings = true)]
        [Newtonsoft.Json.JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
        public DeviceStatus Status { get; set; }

        [Newtonsoft.Json.JsonProperty("url", Required = Newtonsoft.Json.Required.Always)]
        [System.ComponentModel.DataAnnotations.Required(AllowEmptyStrings = true)]
        public string Url { get; set; }

        [Newtonsoft.Json.JsonProperty("coordinates", Required = Newtonsoft.Json.Required.AllowNull)]
        [System.ComponentModel.DataAnnotations.Required]
        public Coordinates Coordinates { get; set; } = new Coordinates();

        [Newtonsoft.Json.JsonProperty("sensors", Required = Newtonsoft.Json.Required.Always)]
        [System.ComponentModel.DataAnnotations.Required]
        public ArrayofSensors Sensors { get; set; } = new ArrayofSensors();

        private System.Collections.Generic.IDictionary<string, object> _additionalProperties = new System.Collections.Generic.Dictionary<string, object>();

        [Newtonsoft.Json.JsonExtensionData]
        public System.Collections.Generic.IDictionary<string, object> AdditionalProperties
        {
            get { return _additionalProperties; }
            set { _additionalProperties = value; }
        }


    }

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.2.1.0 (Newtonsoft.Json v12.0.0.0)")]
    public partial class ArrayofSensors : System.Collections.ObjectModel.Collection<Sensor>
    {

    }

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.2.1.0 (Newtonsoft.Json v12.0.0.0)")]
    public partial class Sensor
    {
        [Newtonsoft.Json.JsonProperty("id", Required = Newtonsoft.Json.Required.Always)]
        [System.ComponentModel.DataAnnotations.Required(AllowEmptyStrings = true)]
        public System.Guid Id { get; set; }

        [Newtonsoft.Json.JsonProperty("status", Required = Newtonsoft.Json.Required.Always)]
        [System.ComponentModel.DataAnnotations.Required(AllowEmptyStrings = true)]
        [Newtonsoft.Json.JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
        public SensorStatus Status { get; set; }

        private System.Collections.Generic.IDictionary<string, object> _additionalProperties = new System.Collections.Generic.Dictionary<string, object>();

        [Newtonsoft.Json.JsonExtensionData]
        public System.Collections.Generic.IDictionary<string, object> AdditionalProperties
        {
            get { return _additionalProperties; }
            set { _additionalProperties = value; }
        }


    }

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.2.1.0 (Newtonsoft.Json v12.0.0.0)")]
    public partial class Coordinates
    {
        [Newtonsoft.Json.JsonProperty("latitude", Required = Newtonsoft.Json.Required.Always)]
        public double Latitude { get; set; }

        [Newtonsoft.Json.JsonProperty("longitude", Required = Newtonsoft.Json.Required.Always)]
        public double Longitude { get; set; }

        private System.Collections.Generic.IDictionary<string, object> _additionalProperties = new System.Collections.Generic.Dictionary<string, object>();

        [Newtonsoft.Json.JsonExtensionData]
        public System.Collections.Generic.IDictionary<string, object> AdditionalProperties
        {
            get { return _additionalProperties; }
            set { _additionalProperties = value; }
        }


    }

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.2.1.0 (Newtonsoft.Json v12.0.0.0)")]
    public enum DeviceStatus
    {
        [System.Runtime.Serialization.EnumMember(Value = @"online")]
        Online = 0,

        [System.Runtime.Serialization.EnumMember(Value = @"error")]
        Error = 1,

        [System.Runtime.Serialization.EnumMember(Value = @"offline")]
        Offline = 2,

    }

    [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.2.1.0 (Newtonsoft.Json v12.0.0.0)")]
    public enum SensorStatus
    {
        [System.Runtime.Serialization.EnumMember(Value = @"online")]
        Online = 0,

        [System.Runtime.Serialization.EnumMember(Value = @"unknown")]
        Unknown = 1,

        [System.Runtime.Serialization.EnumMember(Value = @"offline")]
        Offline = 2,

    }

    [System.CodeDom.Compiler.GeneratedCode("NSwag", "13.8.2.0 (NJsonSchema v10.2.1.0 (Newtonsoft.Json v12.0.0.0))")]
    public partial class ApiException : System.Exception
    {
        public int StatusCode { get; private set; }

        public string Response { get; private set; }

        public System.Collections.Generic.IReadOnlyDictionary<string, System.Collections.Generic.IEnumerable<string>> Headers { get; private set; }

        public ApiException(string message, int statusCode, string response, System.Collections.Generic.IReadOnlyDictionary<string, System.Collections.Generic.IEnumerable<string>> headers, System.Exception innerException)
            : base(message + "\n\nStatus: " + statusCode + "\nResponse: \n" + ((response == null) ? "(null)" : response.Substring(0, response.Length >= 512 ? 512 : response.Length)), innerException)
        {
            StatusCode = statusCode;
            Response = response;
            Headers = headers;
        }

        public override string ToString()
        {
            return string.Format("HTTP Response: \n\n{0}\n\n{1}", Response, base.ToString());
        }
    }

    [System.CodeDom.Compiler.GeneratedCode("NSwag", "13.8.2.0 (NJsonSchema v10.2.1.0 (Newtonsoft.Json v12.0.0.0))")]
    public partial class ApiException<TResult> : ApiException
    {
        public TResult Result { get; private set; }

        public ApiException(string message, int statusCode, string response, System.Collections.Generic.IReadOnlyDictionary<string, System.Collections.Generic.IEnumerable<string>> headers, TResult result, System.Exception innerException)
            : base(message, statusCode, response, headers, innerException)
        {
            Result = result;
        }
    }

    [System.CodeDom.Compiler.GeneratedCode("NSwag", "13.8.2.0 (NJsonSchema v10.2.1.0 (Newtonsoft.Json v12.0.0.0))")]
    public partial interface IDeviceService
    {
        /// <summary>Get all device info</summary>
        /// <returns>Array of devices</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task<System.Collections.Generic.ICollection<Device>> GetallAsync();

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>Get all device info</summary>
        /// <returns>Array of devices</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task<System.Collections.Generic.ICollection<Device>> GetallAsync(System.Threading.CancellationToken cancellationToken);

        /// <summary>Shut down all devices</summary>
        /// <returns>Message sent</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task OfflineallAsync();

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>Shut down all devices</summary>
        /// <returns>Message sent</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task OfflineallAsync(System.Threading.CancellationToken cancellationToken);

        /// <summary>Bring all devices online</summary>
        /// <returns>Message sent</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task OnlineallAsync();

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>Bring all devices online</summary>
        /// <returns>Message sent</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task OnlineallAsync(System.Threading.CancellationToken cancellationToken);

        /// <summary>Get all device info</summary>
        /// <param name="deviceID">ID of device to query</param>
        /// <returns>Information about a particular device</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task<Device> GetdeviceAsync(System.Guid deviceID);

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>Get all device info</summary>
        /// <param name="deviceID">ID of device to query</param>
        /// <returns>Information about a particular device</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task<Device> GetdeviceAsync(System.Guid deviceID, System.Threading.CancellationToken cancellationToken);

        /// <summary>Shut down device</summary>
        /// <param name="deviceID">ID of device to shut down</param>
        /// <returns>Message sent</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task OfflinedeviceAsync(System.Guid deviceID);

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>Shut down device</summary>
        /// <param name="deviceID">ID of device to shut down</param>
        /// <returns>Message sent</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task OfflinedeviceAsync(System.Guid deviceID, System.Threading.CancellationToken cancellationToken);

        /// <summary>Bring device online</summary>
        /// <param name="deviceID">ID of device to bring online</param>
        /// <returns>Message sent</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task OnlinedeviceAsync(System.Guid deviceID);

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>Bring device online</summary>
        /// <param name="deviceID">ID of device to bring online</param>
        /// <returns>Message sent</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task OnlinedeviceAsync(System.Guid deviceID, System.Threading.CancellationToken cancellationToken);

        /// <summary>Get info about a particular device's sensor</summary>
        /// <param name="deviceID">ID of device to query</param>
        /// <param name="sensorID">ID of sensor to query</param>
        /// <returns>Information about a sensor</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task<Sensor> GetsensorAsync(System.Guid deviceID, System.Guid sensorID);

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>Get info about a particular device's sensor</summary>
        /// <param name="deviceID">ID of device to query</param>
        /// <param name="sensorID">ID of sensor to query</param>
        /// <returns>Information about a sensor</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task<Sensor> GetsensorAsync(System.Guid deviceID, System.Guid sensorID, System.Threading.CancellationToken cancellationToken);

        /// <summary>Shut down sensor</summary>
        /// <param name="deviceID">ID of device to query</param>
        /// <param name="sensorID">ID of sensor to query</param>
        /// <returns>Message sent</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task OfflinesensorAsync(System.Guid deviceID, System.Guid sensorID);

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>Shut down sensor</summary>
        /// <param name="deviceID">ID of device to query</param>
        /// <param name="sensorID">ID of sensor to query</param>
        /// <returns>Message sent</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task OfflinesensorAsync(System.Guid deviceID, System.Guid sensorID, System.Threading.CancellationToken cancellationToken);

        /// <summary>Bring sensor online</summary>
        /// <param name="deviceID">ID of device to query</param>
        /// <param name="sensorID">ID of sensor to query</param>
        /// <returns>Message sent</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task OnlinesensorAsync(System.Guid deviceID, System.Guid sensorID);

        /// <param name="cancellationToken">A cancellation token that can be used by other objects or threads to receive notice of cancellation.</param>
        /// <summary>Bring sensor online</summary>
        /// <param name="deviceID">ID of device to query</param>
        /// <param name="sensorID">ID of sensor to query</param>
        /// <returns>Message sent</returns>
        /// <exception cref="ApiException">A server side error occurred.</exception>
        System.Threading.Tasks.Task OnlinesensorAsync(System.Guid deviceID, System.Guid sensorID, System.Threading.CancellationToken cancellationToken);
    }
}