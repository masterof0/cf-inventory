<script setup>
import { reactive } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { mdiLogin } from '@mdi/js';

const supaurl = import.meta.env.VITE_SUPAURL;
const supaapi = import.meta.env.VITE_SUPAAPI;
const supabase = createClient(supaurl, supaapi);

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
        <v-icon :icon="mdiLogin" @click="login"></v-icon>
      </v-card-text>
    </v-container>
  </div>
</template>

<style></style>
