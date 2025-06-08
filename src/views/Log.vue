<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import logView from '@/components/logView.vue'
import d1Axios from '@/services/d1Axios'

const log = ref(null)
const route = useRoute()

onBeforeMount(() => {
    getLog(route.params.id)
})

const getLog = (id) => {

    try {
        d1Axios.getLog(id)
            .then(response => {
                log.value = response.data[0]
                // console.log(typeof log.value)
            })
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>

    <!-- <p>{{ note[0].Subject }}</p> -->
    <logView v-if="log" :log="log" />
</template>