﻿import ServiceBase from '../../common/ServiceBase';

const login_url = 'api/auth/authenticate';

export default {
    isAuthenticated() {
        return sessionStorage.getItem('user') !== null;
    },

    isAdmin() {
        return sessionStorage.getItem('role') === 'Admin';
    },

    login(username: string, password: string) {
        let body = {
            username: username,
            password: password
        };
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };

        return ServiceBase.makeRequest(login_url, options)
            .then(response => {
                sessionStorage.setItem('user', `${response.token_type} ${response.access_token}`);
                sessionStorage.setItem('role', response.role);
                return Promise.resolve();
            });
    }
}
