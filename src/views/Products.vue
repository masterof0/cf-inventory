<script setup>
import { ref, onMounted } from 'vue'
import { mdiPlusCircle, mdiMinusCircle } from '@mdi/js'

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
    products.value.forEach(async product => {
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
    products.value[index].Qty = products.value[index].Qty += 1
    changes.value = true
}

const decQty = (index) => {
    // console.log(products.value[index].Qty);
    products.value[index].Qty = products.value[index].Qty -= 1
    changes.value = true
}
</script>

<template>
    <main>
        <div>
            <v-container fluid width="750">
                <v-row class="cell rounded-t-lg">
                    <v-col cols="2">Part</v-col>
                    <v-col>Description</v-col>
                    <v-col cols="2" class="center">Qty</v-col>
                    <v-col cols="2" class="center"></v-col>
                </v-row>
                <v-row class="cell align-center" v-for="(product, index) in products" :key="index">
                    <v-col cols="2">{{ product.PartNum }}</v-col>
                    <v-col>{{ product.Description }}</v-col>
                    <v-col cols="2" class="center">{{ product.Qty }} ({{ product.Qty * product.BoxQty }})</v-col>
                    <v-col cols="2" class="center">
                        <v-icon :icon="mdiPlusCircle" @click="incQty(index)"></v-icon>
                        <v-icon :icon="mdiMinusCircle" @click="decQty(index)"></v-icon>
                    </v-col>
                </v-row>
                <v-row class="lastCell rounded-b-lg align-center">
                    <v-col class="center" cols="3">
                        <v-btn class="btn rounded-pill" :disabled="!changes" @click="writeChanges">Submit changes</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </main>
</template>

<style>
.btn {
	background-color: red;
}

.v-icon {
    margin: 10px;
}
</style>