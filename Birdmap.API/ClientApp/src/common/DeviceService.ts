﻿/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.8.2.0 (NJsonSchema v10.2.1.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

export default class DeviceService {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "api/devices";
    }

    /**
     * Get all device info
     * @return Array of devices
     */
    getall(): Promise<Device[]> {
        let url_ = this.baseUrl;

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Authorization': sessionStorage.getItem('user')
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetall(_response);
        });
    }

    protected processGetall(response: Response): Promise<Device[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                if (Array.isArray(resultData200)) {
                    result200 = [] as any;
                    for (let item of resultData200)
                        result200!.push(Device.fromJS(item));
                }
                return result200;
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
                return throwException("No device found", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Device[]>(<any>null);
    }

    /**
     * Shut down all devices
     * @return Message sent
     */
    offlineall(): Promise<void> {
        let url_ = this.baseUrl + "/offline";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "POST",
            headers: {
                'Authorization': sessionStorage.getItem('user')
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processOfflineall(_response);
        });
    }

    protected processOfflineall(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status === 500) {
            return response.text().then((_responseText) => {
                return throwException("Message sending unsuccessful", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Bring all devices online
     * @return Message sent
     */
    onlineall(): Promise<void> {
        let url_ = this.baseUrl + "/online";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "POST",
            headers: {
                'Authorization': sessionStorage.getItem('user')
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processOnlineall(_response);
        });
    }

    protected processOnlineall(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status === 500) {
            return response.text().then((_responseText) => {
                return throwException("Message sending unsuccessful", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Get all device info
     * @param deviceID ID of device to query
     * @return Information about a particular device
     */
    getdevice(deviceID: string): Promise<Device> {
        let url_ = this.baseUrl + "/{deviceID}";
        if (deviceID === undefined || deviceID === null)
            throw new Error("The parameter 'deviceID' must be defined.");
        url_ = url_.replace("{deviceID}", encodeURIComponent("" + deviceID));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Authorization': sessionStorage.getItem('user')
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetdevice(_response);
        });
    }

    protected processGetdevice(response: Response): Promise<Device> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = Device.fromJS(resultData200);
                return result200;
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
                return throwException("Device not found", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Device>(<any>null);
    }

    /**
     * Shut down device
     * @param deviceID ID of device to shut down
     * @return Message sent
     */
    offlinedevice(deviceID: string): Promise<void> {
        let url_ = this.baseUrl + "/{deviceID}/offline";
        if (deviceID === undefined || deviceID === null)
            throw new Error("The parameter 'deviceID' must be defined.");
        url_ = url_.replace("{deviceID}", encodeURIComponent("" + deviceID));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "POST",
            headers: {
                'Authorization': sessionStorage.getItem('user')
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processOfflinedevice(_response);
        });
    }

    protected processOfflinedevice(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status === 500) {
            return response.text().then((_responseText) => {
                return throwException("Message sending unsuccessful", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Bring device online
     * @param deviceID ID of device to bring online
     * @return Message sent
     */
    onlinedevice(deviceID: string): Promise<void> {
        let url_ = this.baseUrl + "/{deviceID}/online";
        if (deviceID === undefined || deviceID === null)
            throw new Error("The parameter 'deviceID' must be defined.");
        url_ = url_.replace("{deviceID}", encodeURIComponent("" + deviceID));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "POST",
            headers: {
                'Authorization': sessionStorage.getItem('user')
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processOnlinedevice(_response);
        });
    }

    protected processOnlinedevice(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status === 500) {
            return response.text().then((_responseText) => {
                return throwException("Message sending unsuccessful", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Get info about a particular device's sensor
     * @param deviceID ID of device to query
     * @param sensorID ID of sensor to query
     * @return Information about a sensor
     */
    getsensor(deviceID: string, sensorID: string): Promise<Sensor> {
        let url_ = this.baseUrl + "/{deviceID}/{sensorID}";
        if (deviceID === undefined || deviceID === null)
            throw new Error("The parameter 'deviceID' must be defined.");
        url_ = url_.replace("{deviceID}", encodeURIComponent("" + deviceID));
        if (sensorID === undefined || sensorID === null)
            throw new Error("The parameter 'sensorID' must be defined.");
        url_ = url_.replace("{sensorID}", encodeURIComponent("" + sensorID));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Authorization': sessionStorage.getItem('user')
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetsensor(_response);
        });
    }

    protected processGetsensor(response: Response): Promise<Sensor> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = Sensor.fromJS(resultData200);
                return result200;
            });
        } else if (status === 404) {
            return response.text().then((_responseText) => {
                return throwException("Device or sensor not found", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Sensor>(<any>null);
    }

    /**
     * Shut down sensor
     * @param deviceID ID of device to query
     * @param sensorID ID of sensor to query
     * @return Message sent
     */
    offlinesensor(deviceID: string, sensorID: string): Promise<void> {
        let url_ = this.baseUrl + "/{deviceID}/{sensorID}/offline";
        if (deviceID === undefined || deviceID === null)
            throw new Error("The parameter 'deviceID' must be defined.");
        url_ = url_.replace("{deviceID}", encodeURIComponent("" + deviceID));
        if (sensorID === undefined || sensorID === null)
            throw new Error("The parameter 'sensorID' must be defined.");
        url_ = url_.replace("{sensorID}", encodeURIComponent("" + sensorID));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "POST",
            headers: {
                'Authorization': sessionStorage.getItem('user')
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processOfflinesensor(_response);
        });
    }

    protected processOfflinesensor(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status === 500) {
            return response.text().then((_responseText) => {
                return throwException("Message sending unsuccessful", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * Bring sensor online
     * @param deviceID ID of device to query
     * @param sensorID ID of sensor to query
     * @return Message sent
     */
    onlinesensor(deviceID: string, sensorID: string): Promise<void> {
        let url_ = this.baseUrl + "/{deviceID}/{sensorID}/online";
        if (deviceID === undefined || deviceID === null)
            throw new Error("The parameter 'deviceID' must be defined.");
        url_ = url_.replace("{deviceID}", encodeURIComponent("" + deviceID));
        if (sensorID === undefined || sensorID === null)
            throw new Error("The parameter 'sensorID' must be defined.");
        url_ = url_.replace("{sensorID}", encodeURIComponent("" + sensorID));
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "POST",
            headers: {
                'Authorization': sessionStorage.getItem('user')
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processOnlinesensor(_response);
        });
    }

    protected processOnlinesensor(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status === 500) {
            return response.text().then((_responseText) => {
                return throwException("Message sending unsuccessful", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }
}

export class Device implements IDevice {
    id!: string;
    status!: DeviceStatus;
    url!: string;
    coordinates!: Coordinates;
    sensors!: Sensor[];

    constructor(data?: IDevice) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.coordinates = new Coordinates();
            this.sensors = [];
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.status = _data["status"];
            this.url = _data["url"];
            this.coordinates = _data["coordinates"] ? Coordinates.fromJS(_data["coordinates"]) : new Coordinates();
            if (Array.isArray(_data["sensors"])) {
                this.sensors = [] as any;
                for (let item of _data["sensors"])
                    this.sensors!.push(Sensor.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Device {
        data = typeof data === 'object' ? data : {};
        let result = new Device();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["status"] = this.status;
        data["url"] = this.url;
        data["coordinates"] = this.coordinates ? this.coordinates.toJSON() : <any>undefined;
        if (Array.isArray(this.sensors)) {
            data["sensors"] = [];
            for (let item of this.sensors)
                data["sensors"].push(item.toJSON());
        }
        return data;
    }
}

export interface IDevice {
    id: string;
    status: DeviceStatus;
    url: string;
    coordinates: Coordinates;
    sensors: Sensor[];
}

export class Sensor implements ISensor {
    id!: string;
    status!: SensorStatus;

    constructor(data?: ISensor) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.status = _data["status"];
        }
    }

    static fromJS(data: any): Sensor {
        data = typeof data === 'object' ? data : {};
        let result = new Sensor();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["status"] = this.status;
        return data;
    }
}

export interface ISensor {
    id: string;
    status: SensorStatus;
}

export enum DeviceStatus {
    Online = "online",
    Error = "error",
    Offline = "offline",
}

export class Coordinates implements ICoordinates {
    latitude!: number;
    longitude!: number;

    constructor(data?: ICoordinates) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.latitude = _data["latitude"];
            this.longitude = _data["longitude"];
        }
    }

    static fromJS(data: any): Coordinates {
        data = typeof data === 'object' ? data : {};
        let result = new Coordinates();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["latitude"] = this.latitude;
        data["longitude"] = this.longitude;
        return data;
    }
}

export interface ICoordinates {
    latitude: number;
    longitude: number;
}

export enum SensorStatus {
    Online = "online",
    Unknown = "unknown",
    Offline = "offline",
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}