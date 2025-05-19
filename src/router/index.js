import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/services/supabase'
import Products from '@/views/Products.vue'
import Manage from '@/views/Manage.vue'
import Login from '@/views/Login.vue'
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
			path: '/login',
			name: 'Login',
			component: Login,
		},
		{
			path: '/manage',
			name: 'Manage',
			component: Manage,
			meta: { requiresAuth: true },
		},
		{
			path: '/about',
			name: 'About',
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: NotFound,
		},
	],
})

// validate autentication
router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		getUser(next)
	} else {
		next()
	}
})

// check for valid session
const getUser = async (next) => {
	const user = await supabase.auth.getSession()
	if (user.data.session == null) {
		next('/login')
	} else {
		next()
	}
}

export default router
