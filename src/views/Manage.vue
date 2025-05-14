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
		<v-container style="text-align: left;" fluid width="750">
			<v-row>
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
.v-row:nth-child(1) {
	background-color: rgb(120,188,187);
}
.v-row:nth-child(even) {
	background: rgb(172,202,118);
}
.center {
	text-align: center;
}

</style>
