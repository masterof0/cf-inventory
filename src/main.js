import { createApp } from 'vue'

// Install vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Install pinia
import { createPinia } from 'pinia'

const pinia = createPinia()
const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'dark',
	},
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
		},
	},
})

import App from './App.vue'
import router from './router'
import './assets/css/app.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
