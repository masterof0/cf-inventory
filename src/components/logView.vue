<script setup>
import { useRouter } from 'vue-router'
import { mdiFileDocumentEditOutline, mdiFileDocumentArrowRightOutline } from '@mdi/js';

const router = useRouter()

defineProps({
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
    <v-card class="mt-4" v-for="log in logs">
        <v-card-item class="toolbar">
            <template v-slot:append>
                <v-icon :icon="mdiFileDocumentArrowRightOutline" :hidden="hidden" @click="redirect(log.ID)"></v-icon>
                <v-icon :icon="mdiFileDocumentEditOutline" :hidden="!hidden" @click=""></v-icon></template>
            <v-card-title class="toolbar text-h5">{{ log.Subject }}</v-card-title>
            <v-card-subtitle class="toolbar">{{ log.Date }}</v-card-subtitle>
        </v-card-item>
        <v-card-text>
            <v-row>
                <v-chip class="chip mx-1 mt-5" v-for="tag in log.Tags">{{ tag }}</v-chip>
            </v-row>
            <v-row class="text-base">
                {{ log.Notes }}
            </v-row>
        </v-card-text>
    </v-card>
</template>

<style scoped></style>