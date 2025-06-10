<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { useInventoryStore } from '@/stores/inventoryStore'
import d1Axios from '@/services/d1Axios'
import { useDate } from 'vuetify'

const log = ref(null)
const router = useRouter()
const date = useDate()
const store = useInventoryStore()
const items = ref()

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})


onMounted(async () => {
    await getLog(props.id)
    items.value = store.getTags
})

const getLog = (id) => {

    try {
        d1Axios.getLog(id)
            .then(response => {
                log.value = response.data[0]
                log.value.Tags = JSON.parse(log.value.Tags)
            })
    } catch (error) {
        console.error(error)
    }
}

const editLog = () => {
    const formattedDate = date.format(log.date, 'fullDateTime')

    log.value.Date = formattedDate
    log.value.Tags = JSON.stringify(log.value.Tags)

    try {
        d1Axios.updateLog(log.value).then(() => {
            router.push("/logs")
        })
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <div class="w-xl">
        <v-card v-if="log">
            <v-card-item class="toolbar">
                <v-card-title class="toolbar text-h5">{{ log.Subject }}</v-card-title>
                <v-card-subtitle class="toolbar">{{ log.Date }}</v-card-subtitle>
            </v-card-item>
            <v-card-text>
                <v-form @submit.prevent="editLog">
                    <VDateInput v-model="log.Date" label="Select Date" prepend-icon="" prepend-inner-icon="$calendar"
                        max-width="300" clearable></VDateInput>
                    <v-text-field v-model="log.Subject" label="Subject" v-if="log"></v-text-field>
                    <v-combobox chips multiple v-model="log.Tags" label="Tags" :items='items' clearable hide-selected
                        v-if="log"></v-combobox>
                    <v-textarea v-model="log.Notes" label="Notes" auto-grow></v-textarea>
                    <v-btn class="btn rounded-pill" variant="tonal" type="submit">Update Log</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </div>

</template>