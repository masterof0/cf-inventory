<script setup>

defineProps({
    log: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <h3>{{ log }}</h3>
</template>

<style scoped></style>