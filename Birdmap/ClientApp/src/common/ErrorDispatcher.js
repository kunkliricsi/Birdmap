"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorDispatcher = {
    errorHandlers: [],
    registerErrorHandler: function (errorHandlerFn) {
        this.errorHandlers.push(errorHandlerFn);
    },
    raiseError: function (errorMessage) {
        for (var i = 0; i < this.errorHandlers.length; i++)
            this.errorHandlers[i](errorMessage);
    }
};
exports.default = ErrorDispatcher;
//# sourceMappingURL=ErrorDispatcher.js.map