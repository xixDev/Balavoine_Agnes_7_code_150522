import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import AddBlob from '../views/AddBlob.vue';
import EditBlob from '../views/EditBlob.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/auth/login',
        name: 'login',
        component: Login,
    },
    //   {
    //     path: '/auth/signup',
    //     name: 'signup',
    //     component: SignUp,
    // },
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
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
