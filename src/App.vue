<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logos/j4atx-blue-logo.svg" width="350" height="350" />

    <div class="wrapper ma-4">
      <nav>
        <RouterLink to="/">Products</RouterLink> |
        <RouterLink to="/manage">Manage</RouterLink> |
        <RouterLink to="/logs">Logs</RouterLink>
      </nav>
    </div>
  </header>
  <div class="flex justify-center">
    <div class="flex w-3xl justify-items-center">
      <RouterView />
    </div>
  </div>
</template>
