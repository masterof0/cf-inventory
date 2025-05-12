import './assets/app.css'

import { createApp } from 'vue'

// Install vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'dark',
	},
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
