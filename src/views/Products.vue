<script setup>
import LoginButton from '@/components/LoginButton.vue'
import { ref, onMounted } from 'vue'
import d1Axios from '@/services/d1Axios'

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
</script>

<template>
    <v-container>
        <v-row class="cell rounded-t-lg text-h5" align="center">
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
        <LoginButton />
    </v-container>
</template>

<style></style>