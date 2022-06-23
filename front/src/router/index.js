// #P7 > ajouter meta title, props nav & routes blob protegees

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

// USER  remetre AUTH
import Login from '../views/user/Login.vue';
import Dashboard from '../views/user/Dashboard.vue';
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
        // props: true,
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
        name: 'Dashboard',
        //path: '/users/:userId',
        //path: '/:userId/dashboard',
        path: '/dashboard',
        component: Dashboard,
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
