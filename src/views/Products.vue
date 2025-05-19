<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import d1Axios from '@/services/d1Axios'
import { mdiLogin } from '@mdi/js';

const router = useRouter()

const products = ref(null)

onMounted(async () => {
    try {
        d1Axios.getProducts()
            .then(response => {
                products.value = response.data
            })
    } catch (error) {
        console.error(error)
    }
})

const login = () => {
    router.push({ name: "Manage" })
}
</script>

<template>
    <main>
        <div>
            <v-container width="750">
                <v-row class="cell rounded-t-lg" align="center">
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
                <v-row align="center" justify="start">
                    <v-icon :icon="mdiLogin" @click="login"></v-icon>
                </v-row>
            </v-container>
        </div>
    </main>
</template>

<style></style>