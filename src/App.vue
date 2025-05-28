<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logos/j4atx-blue-logo.svg" width="350" height="350" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Products</RouterLink> |
        <RouterLink to="/manage">Manage</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
