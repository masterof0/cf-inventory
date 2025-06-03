<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { supabase } from '@/services/supabase'
import { mdiLogin, mdiLogout } from '@mdi/js';

const router = useRouter()
const store = useUserStore()
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
    router.push({ name: "Login" })
}

const logout = async () => {
    await supabase.auth.signOut()
        .then(
            authenticated.value = false
        ).catch(error => {
            console.error(error)
        })
}
</script>

<template>
    <v-row align="center">
        <v-col cols="4" :hidden="authenticated">
            <v-btn rounded="xl" color="red-accent-1" :prepend-icon="mdiLogin" @click="login">Login</v-btn>
        </v-col>
        <v-col cols="4" :hidden="!authenticated">
            <v-btn rounded="xl" color="red-accent-1" :append-icon="mdiLogout" @click="logout">Logout</v-btn>
        </v-col>
    </v-row>
</template>