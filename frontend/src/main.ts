import { createApp } from 'vue';
import App from './App.vue';
import './../node_modules/jquery/dist/jquery.min.js';
import './../node_modules/popper.js/dist/popper.min.js';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '@/components/card-view/vue3-datepicker-custom.css';
import router from './router';

createApp(App).use(router).mount('#app');
