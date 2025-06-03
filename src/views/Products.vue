<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import d1Axios from '@/services/d1Axios'
import { useUserStore } from '@/stores/userStore'
import { supabase } from '@/services/supabase'
import { mdiLogin, mdiLogout } from '@mdi/js';

const router = useRouter()
const store = useUserStore()

const products = ref(null)
const authenticated = ref(false)

onMounted(async () => {
    try {
        d1Axios.getProducts()
            .then(response => {
                products.value = response.data
            })

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
    <main>
        <div>
            <v-container width="750">
                <v-row class="cell rounded-t-lg text-h4" align="center">
                    <v-col cols="2">Part</v-col>
                    <v-col>Description</v-col>
                    <v-col cols="2" class="center">Qty</v-col>
                </v-row>
                <v-row class="cell" align="center" v-for="(product, index) in products" :key="index">
                    <v-col cols="2">{{ product.PartNum }}</v-col>
                    <v-col>{{ product.Description }}</v-col>
                    <v-col cols="2" class="center">{{ product.Qty }} ({{ product.Qty * product.BoxQty }})</v-col>
                </v-row>
                <v-row class="lastCell rounded-b-lg align-center">
                    <v-col class="center" cols="3"></v-col>
                </v-row>
                <v-row align="center">
                    <v-col cols="4" :hidden="authenticated">
                        <v-btn rounded="xl" color="red-accent-1" :prepend-icon="mdiLogin" @click="login">Login</v-btn>
                        <!-- <v-icon :icon="mdiLogin" @click="login"></v-icon> -->
                    </v-col>
                    <v-col cols="4" :hidden="!authenticated">
                        <v-btn rounded="xl" color="red-accent-1" :append-icon="mdiLogout" @click="logout">Logout</v-btn>
                        <!-- <v-icon :icon="mdiLogout" @click=""></v-icon> -->
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </main>
</template>

<style></style>