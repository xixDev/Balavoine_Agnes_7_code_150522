import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';
// import axios from 'axios';
// import VueAxios from 'vue-axios';

// createApp(App).use(VueAxios, axios, router).mount('#app');
//createApp(App).use(router).mount('#app');
createApp(App).use(router).use(store).mount('#app');
