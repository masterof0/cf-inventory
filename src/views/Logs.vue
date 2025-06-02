<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { supabase } from '@/services/supabase'
import { mdiFileDocumentPlus } from '@mdi/js'

const store = useUserStore();

const logout = async () => {
    await supabase.auth.signOut()
        .then(
            router.push({ name: "Products" })
        ).catch(error => {
            console.error(error)
        })
}
</script>

<template>
    <main>
        <div>
            <v-container width="750">
                <v-toolbar class="toolbar rounded-t-lg" height="70">
                    <v-toolbar-title>Logs</v-toolbar-title>
                    <v-btn :icon="mdiFileDocumentPlus"></v-btn>
                </v-toolbar>
                <v-row align="center">
                    <v-col cols="4" :hidden="authenticated">
                        <v-btn rounded="xl" color="red-accent-1" :prepend-icon="mdiLogin" @click="login">Login</v-btn>
                    </v-col>
                    <v-col cols="4" :hidden="!authenticated">
                        <v-btn rounded="xl" color="red-accent-1" :append-icon="mdiLogout" @click="logout">Logout</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </main>
</template>

<style></style>
