<script setup>
import { reactive } from 'vue'
import { supabase } from '@/services/supabase'
import { mdiLogin, mdiLogout } from '@mdi/js';


const account = reactive({
  email: "",
  password: ""
})

const login = async () => {
  await supabase.auth.signInWithPassword({
    email: account.email,
    password: account.password,
  })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })

  account.password = ""
}

const logout = async () => {
  await supabase.auth.signOut().catch(error => {
    console.error(error)
  })
}

// ToDo display successful login/logout

</script>
<template>
  <div>
    <v-container width="500">
      <v-card>
        <v-toolbar color="blue"><v-toolbar-title>Login</v-toolbar-title></v-toolbar>
      </v-card>
      <v-card-text>
        <v-text-field v-model="account.email" label="email" name="email" autocomplete="on"></v-text-field>
        <v-text-field v-model="account.password" type="password" label="password" name="password"></v-text-field>
      </v-card-text>
      <v-row justify="space-between">
        <v-icon :icon="mdiLogin" @click="login"></v-icon>
        <v-icon :icon="mdiLogout" @click="logout" style="align-items: right;"></v-icon>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
