import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/services/supabase'
import { useInventoryStore } from '@/stores/inventoryStore'
import productsView from '@/views/productsView.vue'
import manageView from '@/views/manageView.vue'
import logView from '@/views/logView.vue'
import logsView from '@/views/logsView.vue'
import loginView from '@/views/loginView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Products',
			component: productsView,
		},
		{
			path: '/login',
			name: 'Login',
			component: loginView,
		},
		{
			path: '/manage',
			name: 'Manage',
			component: manageView,
			meta: { requiresAuth: true },
		},
		{
			path: '/logs',
			name: 'Logs',
			props: true,
			component: logsView,
			// meta: { requiresAuth: true },
		},
		{
			path: '/logs/:id(latest|\\d+)',
			name: 'Log',
			component: logView,
			props: true,
			meta: { requiresAuth: true },
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import('@/views/404view.vue'),
			// component: NotFound,
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0 }
		}
	},
})

// validate autentication
router.beforeEach(async (to, from, next) => {
	const user = await supabase.auth.getSession()
	const store = useInventoryStore()
	if (to.meta.requiresAuth && user.data.session) {
		await store.addUser(user.data.session.user)
		return next()
	} else if (to.meta.requiresAuth) {
		sessionStorage.setItem('redirectPath', to.fullPath)
		await store.clearSession()
		return next('/login')
	} else {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		user.data.session ? store.addUser(user.data.session.user) : store.clearSession()
	}
	next()
})

// check for valid session
// const getUser = async (next) => {
// 	const user = await supabase.auth.getSession()
// 	const store = useUserStore()
// 	if (user.data.session) {
// 		await store.addUser(user.data.session.user)
// 		return next()
// 	}
// 	await store.clearSession()
// 	next('/login')
// }

export default router
