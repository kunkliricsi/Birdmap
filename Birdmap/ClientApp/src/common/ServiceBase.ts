import ErrorDispatcher from './ErrorDispatcher';

function get(url: string) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('user')
        }
    };

    return makeRequest(url, options);
}

function post(url: string, request: any) {
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

function makeRequest(url: string, options: any) {
    return fetch(url, options)
        .then(ensureResponseSuccess)
        .catch(errorHandler);
}

function ensureResponseSuccess(response: any) {
    if (!response.ok)
        return response.json()
            .then((data: any) => errorHandler(data));

    return response.text()
        .then((text: any) => text.length ? JSON.parse(text) : {});
}

function errorHandler(response: any) {
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
