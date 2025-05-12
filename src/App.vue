<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const name = ref('Unknown')

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/j4atx-blue-logo.svg" width="350" height="350" />

    <div class="wrapper">
      <nav>
        <RouterLink class="rtr-link" to="/">Products</RouterLink> |
        <RouterLink class="rtr-link" to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
