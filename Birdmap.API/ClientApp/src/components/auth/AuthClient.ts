export default class AuthClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    authenticate(model: AuthenticateRequest): Promise<any> {
        let url_ = this.baseUrl + "/api/Auth/authenticate";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(model);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAuthenticate(_response);
        });
    }

    protected processAuthenticate(response: Response): Promise<any> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<any>(<any>null);
    }

    register(model: RegisterRequest): Promise<void> {
        let url_ = this.baseUrl + "/api/Auth/register";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(model);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processRegister(_response);
        });
    }

    protected processRegister(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 204) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }
}


export enum HttpStatusCode {
    Continue = "Continue",
    SwitchingProtocols = "SwitchingProtocols",
    Processing = "Processing",
    EarlyHints = "EarlyHints",
    OK = "OK",
    Created = "Created",
    Accepted = "Accepted",
    NonAuthoritativeInformation = "NonAuthoritativeInformation",
    NoContent = "NoContent",
    ResetContent = "ResetContent",
    PartialContent = "PartialContent",
    MultiStatus = "MultiStatus",
    AlreadyReported = "AlreadyReported",
    IMUsed = "IMUsed",
    MultipleChoices = "Ambiguous",
    Ambiguous = "Ambiguous",
    MovedPermanently = "Moved",
    Moved = "Moved",
    Found = "Redirect",
    Redirect = "Redirect",
    SeeOther = "RedirectMethod",
    RedirectMethod = "RedirectMethod",
    NotModified = "NotModified",
    UseProxy = "UseProxy",
    Unused = "Unused",
    TemporaryRedirect = "TemporaryRedirect",
    RedirectKeepVerb = "TemporaryRedirect",
    PermanentRedirect = "PermanentRedirect",
    BadRequest = "BadRequest",
    Unauthorized = "Unauthorized",
    PaymentRequired = "PaymentRequired",
    Forbidden = "Forbidden",
    NotFound = "NotFound",
    MethodNotAllowed = "MethodNotAllowed",
    NotAcceptable = "NotAcceptable",
    ProxyAuthenticationRequired = "ProxyAuthenticationRequired",
    RequestTimeout = "RequestTimeout",
    Conflict = "Conflict",
    Gone = "Gone",
    LengthRequired = "LengthRequired",
    PreconditionFailed = "PreconditionFailed",
    RequestEntityTooLarge = "RequestEntityTooLarge",
    RequestUriTooLong = "RequestUriTooLong",
    UnsupportedMediaType = "UnsupportedMediaType",
    RequestedRangeNotSatisfiable = "RequestedRangeNotSatisfiable",
    ExpectationFailed = "ExpectationFailed",
    MisdirectedRequest = "MisdirectedRequest",
    UnprocessableEntity = "UnprocessableEntity",
    Locked = "Locked",
    FailedDependency = "FailedDependency",
    UpgradeRequired = "UpgradeRequired",
    PreconditionRequired = "PreconditionRequired",
    TooManyRequests = "TooManyRequests",
    RequestHeaderFieldsTooLarge = "RequestHeaderFieldsTooLarge",
    UnavailableForLegalReasons = "UnavailableForLegalReasons",
    InternalServerError = "InternalServerError",
    NotImplemented = "NotImplemented",
    BadGateway = "BadGateway",
    ServiceUnavailable = "ServiceUnavailable",
    GatewayTimeout = "GatewayTimeout",
    HttpVersionNotSupported = "HttpVersionNotSupported",
    VariantAlsoNegotiates = "VariantAlsoNegotiates",
    InsufficientStorage = "InsufficientStorage",
    LoopDetected = "LoopDetected",
    NotExtended = "NotExtended",
    NetworkAuthenticationRequired = "NetworkAuthenticationRequired",
}

export class AuthenticateRequest implements IAuthenticateRequest {
    username!: string;
    password!: string;

    constructor(data?: IAuthenticateRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.username = _data["username"];
            this.password = _data["password"];
        }
    }

    static fromJS(data: any): AuthenticateRequest {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticateRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["username"] = this.username;
        data["password"] = this.password;
        return data;
    }
}

export interface IAuthenticateRequest {
    username: string;
    password: string;
}

export class RegisterRequest implements IRegisterRequest {
    username!: string;
    password!: string;
    confirmPassword!: string;

    constructor(data?: IRegisterRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.username = _data["username"];
            this.password = _data["password"];
            this.confirmPassword = _data["confirmPassword"];
        }
    }

    static fromJS(data: any): RegisterRequest {
        data = typeof data === 'object' ? data : {};
        let result = new RegisterRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["username"] = this.username;
        data["password"] = this.password;
        data["confirmPassword"] = this.confirmPassword;
        return data;
    }
}

export interface IRegisterRequest {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
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