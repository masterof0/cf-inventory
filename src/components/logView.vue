<script setup>

defineProps({
    logs: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <v-card class="mt-4" v-for="log in logs" height="250">
        <v-card-title class="toolbar text-h5">{{ log.Subject }}</v-card-title>
        <v-card-subtitle class="toolbar">{{ log.Date }}</v-card-subtitle>
        <v-card-text>{{ log.Notes }}</v-card-text>
    </v-card>
    {{ logs }}
</template>

<style scoped></style>