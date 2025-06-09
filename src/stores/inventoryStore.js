import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('inventory', {
	// state
	state: () => ({
		isAuth: '',
		tags: [
			'bleeding',
			'blood pressure',
			'cycler',
			'dialysis',
			'labs',
			'maintenance',
			'pak',
			'pureflow',
			'sak',
			'setup',
		],
	}),

	// getters
	getters: {
		getUser: (state) => state.isAuth,
		getTags: (state) => state.tags,
	},

	// setters
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
