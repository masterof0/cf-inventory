<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import d1Axios from '@/services/d1Axios'
import { supabase } from '@/services/supabase'
import { mdiPlusCircle, mdiMinusCircle, mdiPencil, mdiDelete, mdiLogout } from '@mdi/js'

const router = useRouter()
const products = ref(null)
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
	prodModel.value = p
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
		d1Axios.updateProducts(product.Name, product.Qty)
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

const logout = async () => {
	await supabase.auth.signOut()
		.then(
			router.push({ name: "Products" })
		).catch(error => {
			console.error(error)
		})
}
</script>

<!-- ToDo redirect to edit window when editing a product -->

<template>
	<div>
		<v-container width="750">
			<v-row class="cell rounded-t-lg" style="height: 70px;">
				<v-col cols="2">Part Number</v-col>
				<v-col cols="1">Name</v-col>
				<v-col>Description</v-col>
				<v-col cols="1" class="center">Qty</v-col>
				<v-col cols="1" class="center">Box Qty</v-col>
				<v-col cols="2" class="center"></v-col>
				<v-col cols="2" class="center" :hidden="!cardHidden">Edit</v-col>
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
				<v-col cols="2" class="center" :hidden="!cardHidden">
					<v-icon :icon="mdiPencil" @click="updateProdModel(product)"></v-icon>
					<v-icon :icon="mdiDelete" @click="deleteProduct(product)"></v-icon>
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
			<v-row justify="end">
				<v-icon :icon="mdiLogout" @click="logout" style="align-items: right;"></v-icon>
			</v-row>
		</v-container>

		</br>
		<v-container width="500" :hidden="!cardHidden">
			<v-card>
				<v-toolbar color="red"><v-toolbar-title> Add/Edit a product</v-toolbar-title></v-toolbar>
			</v-card>
			<v-card-text>
				<v-select v-if=products :items="products" item-title="Name" item-text="ID" clearable></v-select>
				<v-select v-else :items="[]"></v-select>
				<v-text-field class="bot20mar" v-model="prodModel.ID" label="ID" persistent-hint
					hint="Leave ID blank for a new product"></v-text-field>
				<v-text-field v-model="prodModel.PartNum" label="Part Number"></v-text-field>
				<v-text-field v-model="prodModel.Name" label="Name"></v-text-field>
				<v-text-field v-model="prodModel.Description" label="Description"></v-text-field>
				<v-text-field v-model="prodModel.Qty" label="Qty"></v-text-field>
				<v-text-field v-model="prodModel.BoxQty" label="BoxQty"></v-text-field>
				<v-btn @click="addEditProduct">{{ (typeof prodModel.ID == "number") ? "Edit" : "Add" }}</v-btn>
			</v-card-text>
		</v-container>
	</div>
</template>

<style>
.v-icon {
	margin: 5px;
}

.hidden {
	visibility: hidden;
}

.bot20mar {
	margin-bottom: 20px;
}
</style>
