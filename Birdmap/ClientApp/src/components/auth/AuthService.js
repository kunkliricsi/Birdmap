"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceBase_1 = require("../../common/ServiceBase");
var login_url = 'api/auth/authenticate';
exports.default = {
    isAuthenticated: function () {
        return sessionStorage.getItem('user') !== null;
    },
    login: function (username, password) {
        var body = {
            username: username,
            password: password
        };
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
        return ServiceBase_1.default.makeRequest(login_url, options)
            .then(function (response) {
            sessionStorage.setItem('user', response.token_type + " " + response.access_token);
            return Promise.resolve();
        });
    }
};
//# sourceMappingURL=AuthService.js.map