const HOST = 'http://localhost:5001';

export const CONSTANST = {
    permissions: {},
    routes: {
        authorization: {
            login: HOST + '/login',
            logout: HOST + '/logout',
            register: HOST + '/register'
        },
        client: {
            list: HOST + '/job',
            appliedlist: HOST + '/job/applied',
            save: HOST + '/job',
            get: HOST + '/job/:id'
        },
        user: {}
    },
    lang: {},
    session: {},
    parameters: {}
};
