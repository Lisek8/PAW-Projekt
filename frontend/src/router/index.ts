import { createRouter, createWebHashHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import Content from '../components/content/Content.vue';
import Login from '../components/login/Login.vue';
import Boards from '../components/boards/Boards.vue';
import BoardView from '../components/board-view/BoardView.vue';

function guardMyroute (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  console.log(localStorage.getItem('loggedIn'));
  let isAuthenticated = false;
  if (localStorage.getItem('loggedIn') === 'true') {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    next();
  } else {
    next('/login');
  }
}

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
    beforeEnter: guardMyroute,
    component: Boards
  },
  {
    path: '/board/:boardId',
    name: 'Board',
    beforeEnter: guardMyroute,
    component: BoardView,
    props: true
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
