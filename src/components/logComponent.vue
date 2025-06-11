<script setup>
import { useRouter } from 'vue-router'
import { mdiFileDocumentArrowRightOutline } from '@mdi/js'

const router = useRouter()

const props = defineProps({
	logs: {
		type: Object,
		required: true,
	},
})
</script>

<template>
	<v-card class="mx-auto mt-4" v-for="log in props.logs" :key="log.ID">
		<v-card-item class="toolbar">
			<template v-slot:append>
				<v-icon :icon="mdiFileDocumentArrowRightOutline" @click="router.push(`/logs/${log.ID}`)"></v-icon>
			</template>
			<v-card-title class="toolbar text-h5">{{ log.Subject }}</v-card-title>
			<v-card-subtitle class="toolbar">{{ log.Date }}</v-card-subtitle>
		</v-card-item>
		<v-card-text>
			<div>
				<v-chip class="chip mx-1 my-5" v-for="(tag, index) in log.Tags" :key="index">{{ tag }}</v-chip>
			</div>
			<div>
				<v-textarea v-model="log.Notes" variant="solo" rows="4" no-resize flat readonly> </v-textarea>
			</div>
		</v-card-text>
	</v-card>
</template>

<style scoped></style>
