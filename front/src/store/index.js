import { createStore } from 'vuex';

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

/*-------- LOCAL STORAGE -------*/
// save to localStoage : token, userId
let user = localStorage.getItem('user');
//
if (!user) {
    user = {
        userId: -1,
        token: '',
    };
} else {
    try {
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] =
            'Bearer' + user.token;
    } catch (ex) {
        user = {
            userId: -1,
            token: '',
        };
    }
}

/*-------- STORE -------*/
const store = createStore({
    state: {
        status: '',
        // user: user,
        user: {
            userId: '',
            email: '',
            pseudo: '',
            admin: '',
        },
    },
    /*-------- mutations ------*/
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            instance.defaults.headers.common['Authorization'] =
                'Bearer' + user.token;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        // user: function (state, user) {
        //     state.user = user;
        // },
        user: function (state, user) {
            state.user.userId = user.userId;
            state.user.email = user.email;
            state.user.pseudo = user.pseudo;
            state.user.admin = user.admin;

            //   state.user.picture = picture
        },

        logout: function (state) {
            state.user = {
                userId: -1,
                token: '',
            };
            localStorage.removeItem('user');
        },
    },
    /*--------actions ------*/
    actions: {
        login: ({ commit }, user) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance
                    .post('auth/login', user)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_login');
                        reject(error);
                    });
            });
        },
        //
        createAccount: ({ commit }, user) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .post('auth/signup', user)
                    .then(function (response) {
                        commit('setStatus', 'created');
                        resolve(response);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_create');
                        reject(error);
                    });
            });
        },
        // dashboard
        getUserInfos: ({ commit }) => {
            instance
                .get('users/:userId', user)
                .then(function (response) {
                    commit('user', response.data.data.user);
                })
                .catch(function () {});
        },
    },
});

export default store;
