import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Content from '../components/content/Content.vue';
import Login from '../components/login/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Content
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
