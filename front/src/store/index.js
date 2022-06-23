import { createStore } from 'vuex';

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
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
        // instance.defaults.headers.common['Authorization'] = user.token;
        instance.defaults.headers.common['Authorization'] =
            'Bearer' + user.token;
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
        users: [],
        user: {
            // userId: '',
            email: '',
            pseudo: '',
            picture: '',
            
        },
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        logUser: function (state, user) {
            // instance.defaults.headers.common['Authorization'] = user.token;
            instance.defaults.headers.common['Authorization'] =
                'Bearer' + user.token;
            localStorage.setItem('user', JSON.stringify(user));
            //user ou user?
            state.user = user;
            console.log('//$$$// user:');
            console.log(user);
        },
        user: function (state, user) {
            state.user = user;
            // console.log('//$$$// user:');
            // console.log(user);

            // [userId, email, pseudo, picture, admin](
            //     (state.user.userId = userId)
            // ),
            //     (state.user.email = email),
            //     (state.user.pseudo = pseudo),
            //     (state.user.picture = picture);
            // state.user.admin = admin;
        },
        users: function (state, users) {
            state.users = users;
            console.log('//// users:');
            console.log(users);
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
        login: ({ commit }, user) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance
                    .post('/login', user)
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
            console.log('**********');
            console.log(user);
            console.log('**********');
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                commit;
                instance
                    .post('/signup', user)
                    .then(function (response) {
                        console.log('**********02');
                        console.log(user);
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
                .post('/dashboard')
                .then(function (response) {
                    commit('user', response.data.user);
                })
                .catch(function () {});
        },
    },
});

export default store;
