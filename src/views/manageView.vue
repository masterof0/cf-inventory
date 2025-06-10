<script setup>
import { ref, onMounted } from 'vue'
import d1Axios from '@/services/d1Axios'
import { mdiPlusCircle, mdiMinusCircle } from '@mdi/js'
import loginButton from '@/components/LoginButton.vue'

const products = ref(null)
const selectedItem = ref(null)
const cardHidden = ref(false)
const prodModel = ref({})
const changes = ref(false)

const loadProducts = () => {
	try {
		d1Axios.getProducts()
			.then(response => {
				products.value = response.data
			})
	} catch (error) {
		console.error(error)
	}
}

onMounted(async () => {
	await loadProducts()
})

const showCard = () => {
	cardHidden.value = !cardHidden.value
}

const updateProdModel = (p) => {
	if (p) {
		return prodModel.value = p
	}
	prodModel.value = {}
}

const editProdModel = () => {
	const result = products.value.find(o => o.Name == selectedItem.value)
	updateProdModel(result)
}

const addEditProduct = () => {
	d1Axios.addEditProduct(prodModel.value)
		.then(loadProducts())
		.catch(error => {
			console.error(error);
		})
	prodModel.value = {}
}

const deleteProduct = (p) => {
	d1Axios.deleteProduct(p.ID)
		.then(loadProducts())
		.catch(error => {
			console.error(error);
		})
	prodModel.value = {}
}

const writeChanges = () => {
	products.value.forEach(async product => {
		d1Axios.updateProductQty(product.Name, product.Qty)
	});
	changes.value = false
}

const incQty = (index) => {
	products.value[index].Qty = products.value[index].Qty += 1
	changes.value = true
}

const decQty = (index) => {
	products.value[index].Qty = products.value[index].Qty -= 1
	changes.value = true
}
</script>

<template>
	<div class="justify-items-center w-3xl">
		<v-container>
			<v-row class="cell rounded-t-lg" style="height: 70px;">
				<v-col cols="2">Part Number</v-col>
				<v-col cols="1">Name</v-col>
				<v-col>Description</v-col>
				<v-col cols="1" class="center">Qty</v-col>
				<v-col cols="1" class="center">Box Qty</v-col>
				<v-col cols="2" class="center"></v-col>
			</v-row>
			<v-row class="cell align-center" v-for="(product, index) in products" :key="index">
				<v-col cols="2">{{ product.PartNum }}</v-col>
				<v-col cols="1">{{ product.Name }}</v-col>
				<v-col>{{ product.Description }}</v-col>
				<v-col cols="1" class="center">{{ product.Qty }}</v-col>
				<v-col cols="1" class="center">{{ product.BoxQty }}</v-col>
				<v-col cols="2" class="center">
					<v-icon :icon="mdiPlusCircle" @click="incQty(index)"></v-icon>
					<v-icon :icon="mdiMinusCircle" @click="decQty(index)"></v-icon>
				</v-col>
			</v-row>
			<v-row class="lastCell rounded-b-lg align-center">
				<v-col class="center" cols="4">
					<v-btn class="btn rounded-pill" :disabled="changes" @click="showCard">Add/Edit Products</v-btn>
				</v-col>
				<v-spacer></v-spacer>
				<v-col class="center" cols="4">
					<v-btn class="btn rounded-pill" :disabled="!changes" @click="writeChanges">Update Quantities</v-btn>
				</v-col>
			</v-row>
			<loginButton />
		</v-container>


		<!-- ToDo move this to a modal -->
		<div class="w-xl">
			<v-container :hidden="!cardHidden">
				<v-card>
					<v-toolbar class="toolbar"><v-toolbar-title> Add/Edit a product</v-toolbar-title></v-toolbar>
				</v-card>
				<v-card-text>
					<v-select v-if=products class="mb-5" label="Select" v-model="selectedItem" :items="products"
						item-title="Name" hint="Leave blank for a new product" persistent-hint clearable
						@update:modelValue="editProdModel"></v-select>
					<v-select v-else :items="[]"></v-select>
					<v-text-field readonly v-model="prodModel.ID" label="ID"></v-text-field>
					<v-text-field v-model="prodModel.PartNum" label="Part Number"></v-text-field>
					<v-text-field v-model="prodModel.Name" label="Name"></v-text-field>
					<v-text-field v-model="prodModel.Description" label="Description"></v-text-field>
					<v-text-field v-model="prodModel.Qty" label="Qty"></v-text-field>
					<v-text-field v-model="prodModel.BoxQty" label="BoxQty"></v-text-field>
					<v-row class="pl-2 pr-2" justify="space-between">
						<v-btn class="w-24 rounded-pill" variant="tonal" @click="addEditProduct">{{ (typeof prodModel.ID
							== "number")
							? "Edit"
							: "Add" }}</v-btn>
						<v-btn class="w-24i rounded-pill" variant="tonal"
							@click="deleteProduct(prodModel)">Delete</v-btn>
					</v-row>
				</v-card-text>
			</v-container>
		</div>
	</div>
</template>

<style scoped>
.v-icon {
	margin: 5px;
}

.hidden {
	visibility: hidden;
}
</style>
