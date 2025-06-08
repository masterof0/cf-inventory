<script setup>
import { mdiFileDocumentEditOutline } from '@mdi/js';

defineProps({
    logs: {
        type: Object,
        required: true
    },

    hidden: {
        type: Boolean,
        default: true,
    }
})

</script>

<template>
    <v-card class="mt-4" v-for="log in logs" height="250">
        <v-card-item class="toolbar">
            <template v-slot:append><v-icon :icon="mdiFileDocumentEditOutline" :hidden="hidden"></v-icon></template>
            <v-card-title class="toolbar text-h5">{{ log.Subject }}</v-card-title>
            <v-card-subtitle class="toolbar">{{ log.Date }}</v-card-subtitle>

        </v-card-item>
        <v-card-text>{{ log.Notes }}</v-card-text>
    </v-card>
    {{ logs }}
</template>

<style scoped></style>