"use strict";
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
exports.ApiException = exports.RegisterRequest = exports.AuthenticateRequest = exports.HttpStatusCode = void 0;
var AuthClient = /** @class */ (function () {
    function AuthClient(baseUrl, http) {
        this.jsonParseReviver = undefined;
        this.http = http ? http : window;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    AuthClient.prototype.authenticate = function (model) {
        var _this = this;
        var url_ = this.baseUrl + "/api/Auth/authenticate";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(model);
        var options_ = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processAuthenticate(_response);
        });
    };
    AuthClient.prototype.processAuthenticate = function (response) {
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
    AuthClient.prototype.register = function (model) {
        var _this = this;
        var url_ = this.baseUrl + "/api/Auth/register";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(model);
        var options_ = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };
        return this.http.fetch(url_, options_).then(function (_response) {
            return _this.processRegister(_response);
        });
    };
    AuthClient.prototype.processRegister = function (response) {
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
    return AuthClient;
}());
exports.default = AuthClient;
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
var AuthenticateRequest = /** @class */ (function () {
    function AuthenticateRequest(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    AuthenticateRequest.prototype.init = function (_data) {
        if (_data) {
            this.username = _data["username"];
            this.password = _data["password"];
        }
    };
    AuthenticateRequest.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new AuthenticateRequest();
        result.init(data);
        return result;
    };
    AuthenticateRequest.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["username"] = this.username;
        data["password"] = this.password;
        return data;
    };
    return AuthenticateRequest;
}());
exports.AuthenticateRequest = AuthenticateRequest;
var RegisterRequest = /** @class */ (function () {
    function RegisterRequest(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    RegisterRequest.prototype.init = function (_data) {
        if (_data) {
            this.username = _data["username"];
            this.password = _data["password"];
            this.confirmPassword = _data["confirmPassword"];
        }
    };
    RegisterRequest.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new RegisterRequest();
        result.init(data);
        return result;
    };
    RegisterRequest.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["username"] = this.username;
        data["password"] = this.password;
        data["confirmPassword"] = this.confirmPassword;
        return data;
    };
    return RegisterRequest;
}());
exports.RegisterRequest = RegisterRequest;
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
//# sourceMappingURL=AuthClient.js.map