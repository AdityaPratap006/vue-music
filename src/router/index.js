import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Manage from '../views/Manage.vue';
import store from '../store';

/** @type {import('vue-router').RouteRecordRaw[]} */
const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'manage',
    path: '/manage-music',
    meta: { requiresAuth: true },
    alias: '/manage',
    component: Manage,
    // beforeEnter: (to, from, next) => {
    //   console.log('Manage Route Guard');
    //   next();
    // },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-green-500',
});

router.beforeEach((to, from, next) => {
  // console.log(to.matched);

  if (!to.matched.some((record) => record.meta?.requiresAuth)) {
    next();
    return;
  }

  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
