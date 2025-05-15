<script setup>
import { ref, onMounted } from 'vue'

const products = ref(null)
const changes = ref(false)

// ToDo implement axios to replace fetch calls

onMounted(async () => {
    try {
        const prods = await fetch('/api/products');
        const data = await prods.json();
        products.value = data
    } catch (error) {
        console.log(error);
    }
})

const writeChanges = () => {
    // console.log(products.value);
    products.value.forEach( async product => {
        const url = `/api/products?${product.Name}=${product.Qty}`
        // console.log(url);
        await fetch(url, {
            method: "PUT"
        });
    }); 
    changes.value = false
}

const incQty = (index) => {
    // console.log(products.value[index].Qty);
    products.value[index].Qty = products.value[index].Qty +=1
    changes.value = true
}

const decQty = (index) => {
    // console.log(products.value[index].Qty);
    products.value[index].Qty = products.value[index].Qty -=1
    changes.value = true
}
</script>

<template>
    <main>
        <div>
            <v-container fluid width="750">
                <v-row class="cell">
                    <v-col cols="2">Part</v-col>
                    <v-col>Description</v-col>
                    <v-col cols="4" class="center">Qty</v-col>
                </v-row>
                <v-row class="cell" v-for="( product, index ) in products" :key="index">
                    <v-col cols="2">{{ product.PartNum }}</v-col>
                    <v-col>{{ product.Description }}</v-col>
                    <v-col cols="4" style="text-align: right;">{{ product.Qty }} ({{ product.Qty * product.BoxQty }}) <v-btn class="button" style="background: green;" @click="incQty(index)">+</v-btn><v-btn class="button" style="background: red; " @click="decQty(index)">-</v-btn></v-col>
                </v-row>
                <v-row class="lastCell">
                    <v-col class="center" cols="3">
                        <v-btn :disabled="!changes" @click="writeChanges">Submit changes</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </main>
</template>

<style>
/* @import '@/assets/products.css'; */

.v-container {
	text-align: left;
}
.cell:nth-child(odd) {
	background: rgb(172,202,118);
}
.cell:nth-child(1) {
	background: rgb(120,188,187);
}
.lastCell {
	background: rgb(120,188,187);
}
.center {
	text-align: center;
}
</style>