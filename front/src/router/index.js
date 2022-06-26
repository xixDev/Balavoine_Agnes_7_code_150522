// ROUTER
import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';

// USER
import Login from '../views/user/Login.vue';
import Dashboard from '../views/user/Dashboard.vue';
// import EditUser from '../views/user/EditUser.vue';

// BLOB
import AddBlob from '../views/blob/AddBlob.vue';
import EditBlob from '../views/blob/EditBlob.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    // {
    //     name: 'EditUser',
    //     path: '/users/:userId',
    //     component: EditUser,
    //     props: true,
    // },
    {
        name: 'Dashboard',
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
        path: '/blobs/:id',
        name: 'EditBlob',
        component: EditBlob,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
