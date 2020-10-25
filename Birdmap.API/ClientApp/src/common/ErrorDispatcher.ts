const ErrorDispatcher = {
  errorHandlers: [],

  registerErrorHandler(errorHandlerFn) {
    this.errorHandlers.push(errorHandlerFn);
  },

  raiseError(errorMessage) {
    for (let i = 0; i < this.errorHandlers.length; i++)
      this.errorHandlers[i](errorMessage);
  }
};

export default ErrorDispatcher;