<script setup>
import { ref, onMounted } from 'vue'

const products = ref(null)

onMounted(async () => {
	try {
		const prods = await fetch('/api/products')
		const data = await prods.json()
		products.value = data
	} catch (error) {
		console.log(error)
	}
})
</script>

<template>
	<div>
		<v-container fluid width="750">
			<v-row class="cell">
				<v-col cols="2">Part Number</v-col>
				<v-col cols="1">Name</v-col>
				<v-col>Description</v-col>
				<v-col cols="1" class="center">Qty</v-col>
				<v-col cols="1" class="center">Box Qty</v-col>
			</v-row>
			<v-row class="cell" v-for="( product, index ) in products" :key="index">
				<v-col cols="2">{{ product.PartNum }}</v-col>
				<v-col cols="1">{{ product.Name }}</v-col>
				<v-col>{{ product.Description }}</v-col>
				<v-col cols="1" class="center">{{ product.Qty }}</v-col>
				<v-col cols="1" class="center">{{ product.BoxQty }}</v-col>
			</v-row>
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

</style>
