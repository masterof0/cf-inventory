import { createRouter, createWebHistory } from 'vue-router'
import Products from '@/views/Products.vue'
import Manage from '@/views/Manage.vue'
import NotFound from '@/views/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Products',
      component: Products,
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage,
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue'),
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: NotFound
    }
  ],
})

export default router
