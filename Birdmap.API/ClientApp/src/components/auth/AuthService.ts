import AuthClient, { AuthenticateRequest } from './AuthClient';

export default {
    isAuthenticated() {
        return sessionStorage.getItem('user') !== null && sessionStorage.getItem('user') !== undefined;
    },

    isAdmin() {
        return sessionStorage.getItem('role') === 'Admin';
    },

    logout() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('role');
    },

    login(username: string, password: string) {
        const service = new AuthClient();

        let request = new AuthenticateRequest({
            username: username,
            password: password
        });

        return service.authenticate(request)
            .then(response => {
                console.log(response);
                sessionStorage.setItem('user', `${response.tokenType} ${response.accessToken}`);
                sessionStorage.setItem('role', response.userRole);
                return Promise.resolve();
            });
    }
}
