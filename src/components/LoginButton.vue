<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInventoryStore } from '@/stores/inventoryStore'
import { supabase } from '@/services/supabase'
import { mdiLogin, mdiLogout } from '@mdi/js'

const route = useRoute()
const router = useRouter()
const store = useInventoryStore()
const authenticated = ref(false)

onMounted(async () => {
	try {
		if (store.getUser) {
			authenticated.value = true
		}
	} catch (error) {
		console.error(error)
	}
})

const login = () => {
	sessionStorage.setItem('redirectPath', route.path)
	router.push({ name: 'Login' })
}

const logout = async () => {
	await supabase.auth
		.signOut()
		.then(() => {
			authenticated.value = false
			router.push({ name: 'Products' })
		})
		.catch((error) => {
			console.error(error)
		})
}
</script>

<template>
	<v-row align="center">
		<v-col cols="4" :hidden="authenticated">
			<v-btn rounded="xl" variant="tonal" :prepend-icon="mdiLogin" @click="login">Login</v-btn>
		</v-col>
		<v-col cols="4" :hidden="!authenticated">
			<v-btn rounded="xl" variant="tonal" :append-icon="mdiLogout" @click="logout">Logout</v-btn>
		</v-col>
	</v-row>
</template>

<style></style>
