<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import logView from '@/components/logView.vue'
import d1Axios from '@/services/d1Axios'

const log = ref(null)
const route = useRoute()

onMounted(() => {
    getLog(route.params.id)
})

const getLog = (id) => {

    try {
        d1Axios.getLog(id)
            .then(response => {
                log.value = response.data
            })
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <div class="w-xl">
        <logView v-if="log" :logs="log" />
    </div>

</template>