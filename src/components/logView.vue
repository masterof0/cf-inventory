<script setup>
import { useRouter } from 'vue-router'
import { mdiFileDocumentEditOutline, mdiFileDocumentArrowRightOutline } from '@mdi/js';

const router = useRouter()

const props = defineProps({
    logs: {
        type: Object,
        required: true
    },

    hidden: {
        type: Boolean,
        default: false,
    }
})

const redirect = (id) => {
    router.push(`/log/${id}`)
}

</script>

<template>
    <v-card class="mt-4 mx-auto" v-for="log in props.logs">
        <v-card-item class="toolbar">
            <template v-slot:append>
                <v-icon :icon="mdiFileDocumentArrowRightOutline" :hidden="props.hidden"
                    @click="redirect(log.ID)"></v-icon>
                <v-icon :icon="mdiFileDocumentEditOutline" :hidden="!props.hidden" @click=""></v-icon></template>
            <v-card-title class="toolbar text-h5">{{ log.Subject }}</v-card-title>
            <v-card-subtitle class="toolbar">{{ log.Date }}</v-card-subtitle>
        </v-card-item>
        <v-card-text>
            <div>
                <v-chip class="chip mx-1 my-5" v-for="tag in log.Tags">{{ tag }}</v-chip>
            </div>
            <div>
                <v-textarea v-model="log.Notes" variant="solo" rows="4" no-resize flat readonly>
                </v-textarea>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped></style>