<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { supabase } from '@/services/supabase'
import { mdiLogin, mdiLogout } from '@mdi/js';
import { useInventoryStore } from '@/stores/inventoryStore'

const router = useRouter();
const success = ref(true)
const store = useInventoryStore()
const authenticated = ref(false)

const account = reactive({
  email: "",
  password: ""
})

onMounted(async () => {
  try {
    if (store.getUser) {
      authenticated.value = true
    }
  } catch (error) {
    console.error(error)
  }

})

const login = async () => {
  await supabase.auth.signInWithPassword({
    email: account.email,
    password: account.password,
  })
    .then(data => {
      if (data.data.session) {
        success.value = true
        const storedPath = sessionStorage.getItem('redirectPath');
        router.push(storedPath || '/');
        sessionStorage.removeItem('redirectPath');
        return
      }
      success.value = false
    })
    .catch(error => {
      console.error(error)
    })

  account.password = ""
}

const logout = async () => {
  await supabase.auth.signOut()
    .then(
      authenticated.value = false
    ).catch(error => {
      console.error(error)
    })
}
// ToDo display successful login/logout
</script>

<template>
  <div class="w-xl">
    <v-container>
      <v-card>
        <v-toolbar color="blue"><v-toolbar-title class="text-h5">Login</v-toolbar-title></v-toolbar>
        <p :hidden="success" class="text-red">Incorrect username or password</p>
      </v-card>
      <v-card-text>
        <v-text-field v-model="account.email" label="email" name="email" autocomplete="on"></v-text-field>
        <v-text-field v-model="account.password" type="password" label="password" name="password"></v-text-field>
      </v-card-text>
      <v-row align="center">
        <v-col cols="4" :hidden="authenticated">
          <v-btn rounded="xl" variant="tonal" :prepend-icon="mdiLogin" @click="login">Login</v-btn>
          <!-- <v-icon :icon="mdiLogin" @click="login"></v-icon> -->
        </v-col>
        <v-col cols="4" :hidden="!authenticated">
          <v-btn rounded="xl" variant="tonal" :append-icon="mdiLogout" @click="logout">Logout</v-btn>
          <!-- <v-icon :icon="mdiLogout" @click=""></v-icon> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
