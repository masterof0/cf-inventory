<script setup>
import { ref, onMounted } from 'vue'

const products = ref(null)
const changes = ref(false)

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
        const url = `/api/updates?${product.Name}=${product.Qty}`
        // console.log(url);
        await fetch(url);
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
            <v-table>
                <tbody>
                    <tr>
                        <th><h2>Part</h2></th>
                        <th><h2>Description</h2></th>
                        <th style="text-align: center;"><h2>Quantity</h2></th>
                    </tr>
                    <tr v-for="(product, index) in products" :key="index">
                        <td>{{ product.PartNum }}</td>
                        <td>{{  product.Description }}</td>
                        <td style="text-align: right;">{{ product.Qty }} ({{ product.Qty * product.BoxQty }}) <v-btn class="button" style="background: green;" @click="incQty(index)">+</v-btn><v-btn class="button" style="background: red; " @click="decQty(index)">-</v-btn></td>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <div style="margin: 10px;">
            <v-btn :disabled="!changes" @click="writeChanges">Submit changes</v-btn>
        </div>
        
    </main>
</template>

<style>
@import '@/assets/products.css';
</style>