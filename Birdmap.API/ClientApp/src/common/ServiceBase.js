"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorDispatcher_1 = require("./ErrorDispatcher");
function get(url) {
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('user')
        }
    };
    return makeRequest(url, options);
}
function post(url, request) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('user')
        },
        body: "",
    };
    if (request)
        options.body = JSON.stringify(request);
    return makeRequest(url, options);
}
function makeRequest(url, options) {
    return fetch(url, options)
        .then(ensureResponseSuccess)
        .catch(errorHandler);
}
function ensureResponseSuccess(response) {
    if (!response.ok)
        return response.json()
            .then(function (data) { return errorHandler(data); });
    return response.text()
        .then(function (text) { return text.length ? JSON.parse(text) : {}; });
}
function errorHandler(response) {
    console.log(response);
    if (response && response.Error)
        ErrorDispatcher_1.default.raiseError(response.Error);
    return Promise.reject();
}
exports.default = {
    get: get,
    post: post,
    makeRequest: makeRequest
};
//# sourceMappingURL=ServiceBase.js.map