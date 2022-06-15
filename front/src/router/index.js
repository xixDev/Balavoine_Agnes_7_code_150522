// #P7 > ajouter meta title, props nav & routes blob protegees

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

// USER  remetre AUTH
import Login from '../views/user/Login.vue';
import Profile from '../views/user/Profile.vue';
import ListUser from '../views/user/ListUser.vue';
import EditUser from '../views/user/EditUser.vue';

// BLOB
import AddBlob from '../views/blob/AddBlob.vue';
import EditBlob from '../views/blob/EditBlob.vue';

const routes = [
    {
        //path: '/',
        path: '/',
        name: 'Home',
        component: Home,
    },
    // {
    //     path: '/auth/login',
    //     name: 'Login',
    //     component: Login,
    // },
    // {
    //     path: '/auth/signup',
    //     name: 'SignUp',
    //     component: SignUp,
    // },
    {
        // path: '/users/login',
        path: '/listUser',
        name: 'ListUser',
        component: ListUser,
    },

    {
        // path: '/users/login',
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        name: 'EditUser',
        path: '/users/:userId',
        component: EditUser,
        props: true,
    },

    {
        name: 'Profile',
        //path: '/users/:userId',
        path: '/profile',
        component: Profile,
        props: true,
    },

    {
        path: '/blobs',
        name: 'AddBlob',
        component: AddBlob,
    },
    {
        // bug : id ?
        path: '/blobs/:id',
        name: 'EditBlob',
        component: EditBlob,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
