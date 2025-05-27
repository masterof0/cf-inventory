import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/services/supabase'
import { useUserStore } from '@/stores/userStore'
import Products from '@/views/Products.vue'
import Manage from '@/views/Manage.vue'
import Login from '@/views/Login.vue'

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
		// {
		// 	path: '/about',
		// 	name: 'About',
		// 	component: () => import('../views/AboutView.vue'),
		// },
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import('@/views/404.vue'),
			// component: NotFound,
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
	const store = useUserStore()
	if (user.data.session) {
		await store.addUser(user.data.session.user)
		return next()
	}
	await store.clearSession()
	next('/login')
}

export default router
