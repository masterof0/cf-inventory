import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
	// state
	state: () => ({
		isAuth: '',
	}),

	// getters
	getters: {
		getUser: (state) => state.isAuth,
	},

	// actions
	actions: {
		addUser(user) {
			this.isAuth = user.email
		},
		clearSession() {
			this.isAuth = ''
		},
	},
})
