<script setup>
import { ref, onMounted } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'
import loginButton from '@/components/loginButton.vue'
import { useInventoryStore } from '@/stores/inventoryStore'
import { mdiFileDocumentPlus, mdiFileDocumentMinus } from '@mdi/js'
import { useDate } from 'vuetify'
import d1Axios from '@/services/d1Axios'
import logComponent from '@/components/logComponent.vue'

const log = ref({})
const logs = ref()
const date = useDate()
const store = useInventoryStore()
const items = ref()
const authenticated = ref(false)
const panel = ref()

onMounted(() => {
	getLogs()
	setAuth()
	items.value = store.getTags
})

const setAuth = async () => {
	if (store.getUser) {
		authenticated.value = true
	}
}

const addLog = () => {
	const formattedDate = date.format(log.value.Date, 'fullDateTime')

	log.value.date = formattedDate
	if (log.value.tags) {
		log.value.tags = JSON.stringify(log.value.tags)
	} else {
		log.value.tags = JSON.stringify([])
	}

	d1Axios
		.addLog(log.value)
		.then(() => {
			panel.value = null
			log.value = {}
			getLogs()
		})
		.catch((error) => {
			console.error(error)
		})
}

const getLogs = () => {
	try {
		d1Axios.getLogs().then((response) => {
			logs.value = response.data
		})
	} catch (error) {
		console.error(error)
	}
}
</script>

<!-- ToDo allow viewing logs without authentication
ToDo authenticate prior to adding logs -->

<template>
	<div class="w-xl">
		<v-container>
			<v-expansion-panels v-model="panel">
				<v-expansion-panel>
					<v-expansion-panel-title
						class="toolbar rounded=t=lg text-h5"
						:expand-icon="mdiFileDocumentPlus"
						:collapse-icon="mdiFileDocumentMinus"
					>
						Logs
					</v-expansion-panel-title>
					<v-expansion-panel-text :hidden="authenticated">
						<p>Please log in to add new log</p>
					</v-expansion-panel-text>
					<v-expansion-panel-text :hidden="!authenticated">
						<v-form @submit.prevent="addLog">
							<VDateInput
								v-model="log.date"
								label="Select Date"
								prepend-icon=""
								prepend-inner-icon="$calendar"
								max-width="300"
								clearable
							></VDateInput>
							<v-text-field v-model="log.subject" label="Subject"></v-text-field>
							<v-combobox
								chips
								multiple
								v-model="log.tags"
								label="Tags"
								:items="items"
								clearable
								hide-selected
							></v-combobox>
							<v-textarea v-model="log.notes" label="Notes" auto-grow></v-textarea>
							<v-btn class="btn rounded-pill" variant="tonal" type="submit">Add Log</v-btn>
						</v-form>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
			<logComponent v-if="logs" :logs="logs" />
		</v-container>
		<v-container>
			<loginButton />
		</v-container>
	</div>
</template>

<style></style>
