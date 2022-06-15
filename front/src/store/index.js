import { createStore } from 'vuex';

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/users/',
});

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
        instance.defaults.headers.common['Authorization'] = user.token;
    } catch (ex) {
        user = {
            userId: -1,
            token: '',
        };
    }
}

// Create a new store instance.
const store = createStore({
    state: {
        status: '',
        //user: user,
        user: user,

        users: {
            // userId: '',
            pseudo: '',
            email: '',
            picture: '',
        },
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            instance.defaults.headers.common['Authorization'] = user.token;
            localStorage.setItem('user', JSON.stringify(user));
            //user ou users?
            state.user = user;
        },
        // userInfos: function (state, userInfos) {
        users: function (state, users) {
            state.users = users;
        },
        logout: function (state) {
            state.user = {
                userId: -1,
                token: '',
            };
            localStorage.removeItem('user');
        },
    },
    actions: {
        login: ({ commit }, users) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance
                    .post('/login', users)
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
        createAccount: ({ commit }, users) => {
            console.log('**********');
            console.log(users);
            console.log('**********');
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .post('/signup', users)
                    .then(function (response) {
                        console.log('**********02');
                        console.log(users);
                        console.log('**********');
                        commit('setStatus', 'created');
                        resolve(response);
                    })
                    .catch(function (error) {
                        commit('setStatus', 'error_create');
                        reject(error);
                    });
            });
        },
        getUserInfos: ({ commit }) => {
            instance
                .post('')
                .then(function (response) {
                    console.log('**********03');
                    console.log(users);
                    console.log('**********');
                    commit('users', response.data.users);
                })
                .catch(function () {});
        },
    },
});

export default store;
