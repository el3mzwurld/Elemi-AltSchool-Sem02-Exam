import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import NotFound from '../views/NotFound.vue'
import ErrorTest from '@/views/ErrorTest.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorTest,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

export default router
