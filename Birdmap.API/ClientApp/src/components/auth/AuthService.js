"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthClient_1 = require("./AuthClient");
exports.default = {
    isAuthenticated: function () {
        return sessionStorage.getItem('user') !== null && sessionStorage.getItem('user') !== undefined;
    },
    isAdmin: function () {
        return sessionStorage.getItem('role') === 'Admin';
    },
    logout: function () {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('role');
    },
    login: function (username, password) {
        var service = new AuthClient_1.default();
        var request = new AuthClient_1.AuthenticateRequest({
            username: username,
            password: password
        });
        return service.authenticate(request)
            .then(function (response) {
            console.log(response);
            sessionStorage.setItem('user', response.tokenType + " " + response.accessToken);
            sessionStorage.setItem('role', response.userRole);
            return Promise.resolve();
        });
    }
};
//# sourceMappingURL=AuthService.js.map