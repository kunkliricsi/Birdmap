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
exports.ApiException = exports.HttpStatusCode = exports.ServiceRequest = exports.ServiceInfo = void 0;
var ServiceInfoService = /** @class */ (function () {
    function ServiceInfoService(baseUrl, http) {
        this.jsonParseReviver = undefined;
        this.http = http ? http : window;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    ServiceInfoService.prototype.getCount = function () {
        var _this = this;
        var url_ = this.baseUrl + "/api/Services/count";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processGetCount(_response);
        });
    };
    ServiceInfoService.prototype.processGetCount = function (response) {
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
                result200 = resultData200 !== undefined ? resultData200 : null;
                return result200;
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    ServiceInfoService.prototype.get = function () {
        var _this = this;
        var url_ = this.baseUrl + "/api/Services";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processGet(_response);
        });
    };
    ServiceInfoService.prototype.processGet = function (response) {
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
                        result200.push(ServiceInfo.fromJS(item));
                    }
                }
                return result200;
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    ServiceInfoService.prototype.post = function (request) {
        var _this = this;
        var url_ = this.baseUrl + "/api/Services";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(request);
        var options_ = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processPost(_response);
        });
    };
    ServiceInfoService.prototype.processPost = function (response) {
        var _this = this;
        var status = response.status;
        var _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach(function (v, k) { return _headers[k] = v; });
        }
        ;
        if (status === 201) {
            return response.text().then(function (_responseText) {
                var result201 = null;
                var resultData201 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result201 = ServiceRequest.fromJS(resultData201);
                return result201;
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    ServiceInfoService.prototype.put = function (request) {
        var _this = this;
        var url_ = this.baseUrl + "/api/Services";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(request);
        var options_ = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processPut(_response);
        });
    };
    ServiceInfoService.prototype.processPut = function (response) {
        var status = response.status;
        var _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach(function (v, k) { return _headers[k] = v; });
        }
        ;
        if (status === 204) {
            return response.text().then(function (_responseText) {
                return;
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    ServiceInfoService.prototype.delete = function (id) {
        var _this = this;
        var url_ = this.baseUrl + "/api/Services/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            method: "DELETE",
            headers: {
                'Authorization': sessionStorage.getItem('user')
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processDelete(_response);
        });
    };
    ServiceInfoService.prototype.processDelete = function (response) {
        var status = response.status;
        var _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach(function (v, k) { return _headers[k] = v; });
        }
        ;
        if (status === 204) {
            return response.text().then(function (_responseText) {
                return;
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    };
    return ServiceInfoService;
}());
exports.default = ServiceInfoService;
var ServiceInfo = /** @class */ (function () {
    function ServiceInfo(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ServiceInfo.prototype.init = function (_data) {
        if (_data) {
            this.service = _data["service"] ? ServiceRequest.fromJS(_data["service"]) : undefined;
            this.statusCode = _data["statusCode"];
            this.response = _data["response"];
        }
    };
    ServiceInfo.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ServiceInfo();
        result.init(data);
        return result;
    };
    ServiceInfo.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["service"] = this.service ? this.service.toJSON() : undefined;
        data["statusCode"] = this.statusCode;
        data["response"] = this.response;
        return data;
    };
    return ServiceInfo;
}());
exports.ServiceInfo = ServiceInfo;
var ServiceRequest = /** @class */ (function () {
    function ServiceRequest(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ServiceRequest.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.uri = _data["uri"];
        }
    };
    ServiceRequest.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ServiceRequest();
        result.init(data);
        return result;
    };
    ServiceRequest.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["uri"] = this.uri;
        return data;
    };
    return ServiceRequest;
}());
exports.ServiceRequest = ServiceRequest;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode["Continue"] = "Continue";
    HttpStatusCode["SwitchingProtocols"] = "SwitchingProtocols";
    HttpStatusCode["Processing"] = "Processing";
    HttpStatusCode["EarlyHints"] = "EarlyHints";
    HttpStatusCode["OK"] = "OK";
    HttpStatusCode["Created"] = "Created";
    HttpStatusCode["Accepted"] = "Accepted";
    HttpStatusCode["NonAuthoritativeInformation"] = "NonAuthoritativeInformation";
    HttpStatusCode["NoContent"] = "NoContent";
    HttpStatusCode["ResetContent"] = "ResetContent";
    HttpStatusCode["PartialContent"] = "PartialContent";
    HttpStatusCode["MultiStatus"] = "MultiStatus";
    HttpStatusCode["AlreadyReported"] = "AlreadyReported";
    HttpStatusCode["IMUsed"] = "IMUsed";
    HttpStatusCode["MultipleChoices"] = "Ambiguous";
    HttpStatusCode["Ambiguous"] = "Ambiguous";
    HttpStatusCode["MovedPermanently"] = "Moved";
    HttpStatusCode["Moved"] = "Moved";
    HttpStatusCode["Found"] = "Redirect";
    HttpStatusCode["Redirect"] = "Redirect";
    HttpStatusCode["SeeOther"] = "RedirectMethod";
    HttpStatusCode["RedirectMethod"] = "RedirectMethod";
    HttpStatusCode["NotModified"] = "NotModified";
    HttpStatusCode["UseProxy"] = "UseProxy";
    HttpStatusCode["Unused"] = "Unused";
    HttpStatusCode["TemporaryRedirect"] = "TemporaryRedirect";
    HttpStatusCode["RedirectKeepVerb"] = "TemporaryRedirect";
    HttpStatusCode["PermanentRedirect"] = "PermanentRedirect";
    HttpStatusCode["BadRequest"] = "BadRequest";
    HttpStatusCode["Unauthorized"] = "Unauthorized";
    HttpStatusCode["PaymentRequired"] = "PaymentRequired";
    HttpStatusCode["Forbidden"] = "Forbidden";
    HttpStatusCode["NotFound"] = "NotFound";
    HttpStatusCode["MethodNotAllowed"] = "MethodNotAllowed";
    HttpStatusCode["NotAcceptable"] = "NotAcceptable";
    HttpStatusCode["ProxyAuthenticationRequired"] = "ProxyAuthenticationRequired";
    HttpStatusCode["RequestTimeout"] = "RequestTimeout";
    HttpStatusCode["Conflict"] = "Conflict";
    HttpStatusCode["Gone"] = "Gone";
    HttpStatusCode["LengthRequired"] = "LengthRequired";
    HttpStatusCode["PreconditionFailed"] = "PreconditionFailed";
    HttpStatusCode["RequestEntityTooLarge"] = "RequestEntityTooLarge";
    HttpStatusCode["RequestUriTooLong"] = "RequestUriTooLong";
    HttpStatusCode["UnsupportedMediaType"] = "UnsupportedMediaType";
    HttpStatusCode["RequestedRangeNotSatisfiable"] = "RequestedRangeNotSatisfiable";
    HttpStatusCode["ExpectationFailed"] = "ExpectationFailed";
    HttpStatusCode["MisdirectedRequest"] = "MisdirectedRequest";
    HttpStatusCode["UnprocessableEntity"] = "UnprocessableEntity";
    HttpStatusCode["Locked"] = "Locked";
    HttpStatusCode["FailedDependency"] = "FailedDependency";
    HttpStatusCode["UpgradeRequired"] = "UpgradeRequired";
    HttpStatusCode["PreconditionRequired"] = "PreconditionRequired";
    HttpStatusCode["TooManyRequests"] = "TooManyRequests";
    HttpStatusCode["RequestHeaderFieldsTooLarge"] = "RequestHeaderFieldsTooLarge";
    HttpStatusCode["UnavailableForLegalReasons"] = "UnavailableForLegalReasons";
    HttpStatusCode["InternalServerError"] = "InternalServerError";
    HttpStatusCode["NotImplemented"] = "NotImplemented";
    HttpStatusCode["BadGateway"] = "BadGateway";
    HttpStatusCode["ServiceUnavailable"] = "ServiceUnavailable";
    HttpStatusCode["GatewayTimeout"] = "GatewayTimeout";
    HttpStatusCode["HttpVersionNotSupported"] = "HttpVersionNotSupported";
    HttpStatusCode["VariantAlsoNegotiates"] = "VariantAlsoNegotiates";
    HttpStatusCode["InsufficientStorage"] = "InsufficientStorage";
    HttpStatusCode["LoopDetected"] = "LoopDetected";
    HttpStatusCode["NotExtended"] = "NotExtended";
    HttpStatusCode["NetworkAuthenticationRequired"] = "NetworkAuthenticationRequired";
})(HttpStatusCode = exports.HttpStatusCode || (exports.HttpStatusCode = {}));
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
//# sourceMappingURL=SystemInfoService.js.map