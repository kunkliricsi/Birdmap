import ErrorDispatcher from './ErrorDispatcher';

function get(url) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('user')
        }
    };

    return makeRequest(url, options);
}

function post(url, request) {
    let options = {
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
            .then(data => errorHandler(data));

    return response.text()
        .then(text => text.length ? JSON.parse(text) : {});
}

function errorHandler(response) {
    console.log(response);

    if (response && response.Error)
        ErrorDispatcher.raiseError(response.Error);

    return Promise.reject();
}

export default {
    get,
    post,
    makeRequest
};
