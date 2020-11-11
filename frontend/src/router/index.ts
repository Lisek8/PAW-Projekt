import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Content from '../components/content/Content.vue';
import Login from '../components/login/Login.vue';
import Boards from '../components/boards/Boards.vue';

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
  },
  {
    path: '/boards',
    name: 'Boards',
    component: Boards
  },
  {
    path: '/board/:boardId',
    name: 'Board',
    component: Content
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
