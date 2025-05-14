<script setup>
import { ref, onMounted } from 'vue'

const products = ref(null)
const cardHidden = ref(false)

onMounted(async () => {
	try {
		const prods = await fetch('/api/products')
		const data = await prods.json()
		products.value = data
	} catch (error) {
		console.log(error)
	}
})

const showCard = () => {
	cardHidden.value = !cardHidden.value
}
</script>

<template>
	<div>
		<v-container width="750">
			<v-row class="cell">
				<v-col cols="2">Part Number</v-col>
				<v-col cols="1">Name</v-col>
				<v-col>Description</v-col>
				<v-col cols="1" class="center">Qty</v-col>
				<v-col cols="1" class="center">Box Qty</v-col>
				<v-col cols="2" class="center" :hidden="!cardHidden">Edit</v-col>
			</v-row>
			<v-row class="cell" v-for="( product, index ) in products" :key="index">
				<v-col cols="2">{{ product.PartNum }}</v-col>
				<v-col cols="1">{{ product.Name }}</v-col>
				<v-col>{{ product.Description }}</v-col>
				<v-col cols="1" class="center">{{ product.Qty }}</v-col>
				<v-col cols="1" class="center">{{ product.BoxQty }}</v-col>
				<v-col cols="2" class="center" :hidden="!cardHidden"><v-btn class="btn">Edit</v-btn></v-col>
			</v-row>
            <v-row>
                <v-col class="center" cols="4">
                    <v-btn class="btn" @click="showCard">Add/Edit Products</v-btn>
                </v-col>
            </v-row>
		</v-container>
		</br>
		<v-container width="500" :hidden="!cardHidden">
			<v-card>
				<v-toolbar color="red"><v-toolbar-title> Add/Edit a product</v-toolbar-title></v-toolbar>
			</v-card>
			<v-card-text>
				<v-text-field label="Part Number"></v-text-field>
				<v-text-field label="Name" ></v-text-field>
				<v-text-field label="Description"></v-text-field>
				<v-text-field label="Qty"></v-text-field>
				<v-text-field label="BoxQty"></v-text-field>
			</v-card-text>
		</v-container>
	</div>
</template>

<style>
.v-container {
	text-align: left;
}
.cell:nth-child(odd) {
	background: rgb(172,202,118);
}
.cell:nth-child(1) {
	background: rgb(120,188,187);
}
.center {
	text-align: center;
}
.btn {
	background-color: red;
}

</style>
