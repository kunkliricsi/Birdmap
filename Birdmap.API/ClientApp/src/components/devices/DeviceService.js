"use strict";
/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.8.2.0 (NJsonSchema v10.2.1.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = exports.SensorStatus = exports.Coordinates = exports.DeviceStatus = exports.Sensor = exports.Device = exports.DeviceService = void 0;
var DeviceService = /** @class */ (function () {
    function DeviceService(baseUrl, http) {
        this.jsonParseReviver = undefined;
        this.http = http ? http : window;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "api/devices";
    }
    /**
     * Get all device info
     * @return Array of devices
     */
    DeviceService.prototype.getall = function () {
        var _this = this;
        var url_ = this.baseUrl;
        var options_ = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processGetall(_response);
        });
    };
    DeviceService.prototype.processGetall = function (response) {
        var _this = this;
        var status = response.status;
        var _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach(function (v, k) { return _headers[k] = v; });
        }
        ;
        if (status === 200) {
            return response.text().then(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                if (Array.isArray(resultData200)) {
                    result200 = [];
                    for (var _i = 0, resultData200_1 = resultData200; _i < resultData200_1.length; _i++) {
                        var item = resultData200_1[_i];
                        result200.push(Device.fromJS(item));
                    }
                }
                return result200;
            });
        }
        else if (status === 404) {
            return response.text().then(function (_responseText) {
                return throwException("No device found", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    /**
     * Shut down all devices
     * @return Message sent
     */
    DeviceService.prototype.offlineall = function () {
        var _this = this;
        var url_ = this.baseUrl + "/offline";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            method: "POST",
            headers: {
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processOfflineall(_response);
        });
    };
    DeviceService.prototype.processOfflineall = function (response) {
        var status = response.status;
        var _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach(function (v, k) { return _headers[k] = v; });
        }
        ;
        if (status === 200) {
            return response.text().then(function (_responseText) {
                return;
            });
        }
        else if (status === 500) {
            return response.text().then(function (_responseText) {
                return throwException("Message sending unsuccessful", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    /**
     * Bring all devices online
     * @return Message sent
     */
    DeviceService.prototype.onlineall = function () {
        var _this = this;
        var url_ = this.baseUrl + "/online";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            method: "POST",
            headers: {
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processOnlineall(_response);
        });
    };
    DeviceService.prototype.processOnlineall = function (response) {
        var status = response.status;
        var _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach(function (v, k) { return _headers[k] = v; });
        }
        ;
        if (status === 200) {
            return response.text().then(function (_responseText) {
                return;
            });
        }
        else if (status === 500) {
            return response.text().then(function (_responseText) {
                return throwException("Message sending unsuccessful", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    /**
     * Get all device info
     * @param deviceID ID of device to query
     * @return Information about a particular device
     */
    DeviceService.prototype.getdevice = function (deviceID) {
        var _this = this;
        var url_ = this.baseUrl + "/{deviceID}";
        if (deviceID === undefined || deviceID === null)
            throw new Error("The parameter 'deviceID' must be defined.");
        url_ = url_.replace("{deviceID}", encodeURIComponent("" + deviceID));
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processGetdevice(_response);
        });
    };
    DeviceService.prototype.processGetdevice = function (response) {
        var _this = this;
        var status = response.status;
        var _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach(function (v, k) { return _headers[k] = v; });
        }
        ;
        if (status === 200) {
            return response.text().then(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = Device.fromJS(resultData200);
                return result200;
            });
        }
        else if (status === 404) {
            return response.text().then(function (_responseText) {
                return throwException("Device not found", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    /**
     * Shut down device
     * @param deviceID ID of device to shut down
     * @return Message sent
     */
    DeviceService.prototype.offlinedevice = function (deviceID) {
        var _this = this;
        var url_ = this.baseUrl + "/{deviceID}/offline";
        if (deviceID === undefined || deviceID === null)
            throw new Error("The parameter 'deviceID' must be defined.");
        url_ = url_.replace("{deviceID}", encodeURIComponent("" + deviceID));
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            method: "POST",
            headers: {
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processOfflinedevice(_response);
        });
    };
    DeviceService.prototype.processOfflinedevice = function (response) {
        var status = response.status;
        var _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach(function (v, k) { return _headers[k] = v; });
        }
        ;
        if (status === 200) {
            return response.text().then(function (_responseText) {
                return;
            });
        }
        else if (status === 500) {
            return response.text().then(function (_responseText) {
                return throwException("Message sending unsuccessful", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    /**
     * Bring device online
     * @param deviceID ID of device to bring online
     * @return Message sent
     */
    DeviceService.prototype.onlinedevice = function (deviceID) {
        var _this = this;
        var url_ = this.baseUrl + "/{deviceID}/online";
        if (deviceID === undefined || deviceID === null)
            throw new Error("The parameter 'deviceID' must be defined.");
        url_ = url_.replace("{deviceID}", encodeURIComponent("" + deviceID));
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            method: "POST",
            headers: {
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processOnlinedevice(_response);
        });
    };
    DeviceService.prototype.processOnlinedevice = function (response) {
        var status = response.status;
        var _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach(function (v, k) { return _headers[k] = v; });
        }
        ;
        if (status === 200) {
            return response.text().then(function (_responseText) {
                return;
            });
        }
        else if (status === 500) {
            return response.text().then(function (_responseText) {
                return throwException("Message sending unsuccessful", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    /**
     * Get info about a particular device's sensor
     * @param deviceID ID of device to query
     * @param sensorID ID of sensor to query
     * @return Information about a sensor
     */
    DeviceService.prototype.getsensor = function (deviceID, sensorID) {
        var _this = this;
        var url_ = this.baseUrl + "/{deviceID}/{sensorID}";
        if (deviceID === undefined || deviceID === null)
            throw new Error("The parameter 'deviceID' must be defined.");
        url_ = url_.replace("{deviceID}", encodeURIComponent("" + deviceID));
        if (sensorID === undefined || sensorID === null)
            throw new Error("The parameter 'sensorID' must be defined.");
        url_ = url_.replace("{sensorID}", encodeURIComponent("" + sensorID));
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processGetsensor(_response);
        });
    };
    DeviceService.prototype.processGetsensor = function (response) {
        var _this = this;
        var status = response.status;
        var _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach(function (v, k) { return _headers[k] = v; });
        }
        ;
        if (status === 200) {
            return response.text().then(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = Sensor.fromJS(resultData200);
                return result200;
            });
        }
        else if (status === 404) {
            return response.text().then(function (_responseText) {
                return throwException("Device or sensor not found", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    /**
     * Shut down sensor
     * @param deviceID ID of device to query
     * @param sensorID ID of sensor to query
     * @return Message sent
     */
    DeviceService.prototype.offlinesensor = function (deviceID, sensorID) {
        var _this = this;
        var url_ = this.baseUrl + "/{deviceID}/{sensorID}/offline";
        if (deviceID === undefined || deviceID === null)
            throw new Error("The parameter 'deviceID' must be defined.");
        url_ = url_.replace("{deviceID}", encodeURIComponent("" + deviceID));
        if (sensorID === undefined || sensorID === null)
            throw new Error("The parameter 'sensorID' must be defined.");
        url_ = url_.replace("{sensorID}", encodeURIComponent("" + sensorID));
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            method: "POST",
            headers: {
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processOfflinesensor(_response);
        });
    };
    DeviceService.prototype.processOfflinesensor = function (response) {
        var status = response.status;
        var _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach(function (v, k) { return _headers[k] = v; });
        }
        ;
        if (status === 200) {
            return response.text().then(function (_responseText) {
                return;
            });
        }
        else if (status === 500) {
            return response.text().then(function (_responseText) {
                return throwException("Message sending unsuccessful", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    /**
     * Bring sensor online
     * @param deviceID ID of device to query
     * @param sensorID ID of sensor to query
     * @return Message sent
     */
    DeviceService.prototype.onlinesensor = function (deviceID, sensorID) {
        var _this = this;
        var url_ = this.baseUrl + "/{deviceID}/{sensorID}/online";
        if (deviceID === undefined || deviceID === null)
            throw new Error("The parameter 'deviceID' must be defined.");
        url_ = url_.replace("{deviceID}", encodeURIComponent("" + deviceID));
        if (sensorID === undefined || sensorID === null)
            throw new Error("The parameter 'sensorID' must be defined.");
        url_ = url_.replace("{sensorID}", encodeURIComponent("" + sensorID));
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            method: "POST",
            headers: {}
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processOnlinesensor(_response);
        });
    };
    DeviceService.prototype.processOnlinesensor = function (response) {
        var status = response.status;
        var _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach(function (v, k) { return _headers[k] = v; });
        }
        ;
        if (status === 200) {
            return response.text().then(function (_responseText) {
                return;
            });
        }
        else if (status === 500) {
            return response.text().then(function (_responseText) {
                return throwException("Message sending unsuccessful", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    return DeviceService;
}());
exports.DeviceService = DeviceService;
var Device = /** @class */ (function () {
    function Device(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
        if (!data) {
            this.coordinates = new Coordinates();
            this.sensors = [];
        }
    }
    Device.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
            this.status = _data["status"];
            this.url = _data["url"];
            this.coordinates = _data["coordinates"] ? Coordinates.fromJS(_data["coordinates"]) : new Coordinates();
            if (Array.isArray(_data["sensors"])) {
                this.sensors = [];
                for (var _i = 0, _a = _data["sensors"]; _i < _a.length; _i++) {
                    var item = _a[_i];
                    this.sensors.push(Sensor.fromJS(item));
                }
            }
        }
    };
    Device.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new Device();
        result.init(data);
        return result;
    };
    Device.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["status"] = this.status;
        data["url"] = this.url;
        data["coordinates"] = this.coordinates ? this.coordinates.toJSON() : undefined;
        if (Array.isArray(this.sensors)) {
            data["sensors"] = [];
            for (var _i = 0, _a = this.sensors; _i < _a.length; _i++) {
                var item = _a[_i];
                data["sensors"].push(item.toJSON());
            }
        }
        return data;
    };
    return Device;
}());
exports.Device = Device;
var Sensor = /** @class */ (function () {
    function Sensor(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    Sensor.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
            this.status = _data["status"];
        }
    };
    Sensor.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new Sensor();
        result.init(data);
        return result;
    };
    Sensor.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["status"] = this.status;
        return data;
    };
    return Sensor;
}());
exports.Sensor = Sensor;
var DeviceStatus;
(function (DeviceStatus) {
    DeviceStatus["Online"] = "online";
    DeviceStatus["Error"] = "error";
    DeviceStatus["Offline"] = "offline";
})(DeviceStatus = exports.DeviceStatus || (exports.DeviceStatus = {}));
var Coordinates = /** @class */ (function () {
    function Coordinates(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    Coordinates.prototype.init = function (_data) {
        if (_data) {
            this.latitude = _data["latitude"];
            this.longitude = _data["longitude"];
        }
    };
    Coordinates.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new Coordinates();
        result.init(data);
        return result;
    };
    Coordinates.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["latitude"] = this.latitude;
        data["longitude"] = this.longitude;
        return data;
    };
    return Coordinates;
}());
exports.Coordinates = Coordinates;
var SensorStatus;
(function (SensorStatus) {
    SensorStatus["Online"] = "online";
    SensorStatus["Unknown"] = "unknown";
    SensorStatus["Offline"] = "offline";
})(SensorStatus = exports.SensorStatus || (exports.SensorStatus = {}));
var ApiException = /** @class */ (function (_super) {
    __extends(ApiException, _super);
    function ApiException(message, status, response, headers, result) {
        var _this = _super.call(this) || this;
        _this.isApiException = true;
        _this.message = message;
        _this.status = status;
        _this.response = response;
        _this.headers = headers;
        _this.result = result;
        return _this;
    }
    ApiException.isApiException = function (obj) {
        return obj.isApiException === true;
    };
    return ApiException;
}(Error));
exports.ApiException = ApiException;
function throwException(message, status, response, headers, result) {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}
//# sourceMappingURL=DeviceService.js.map