<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { supabase } from '@/services/supabase'
import { mdiLogin, mdiLogout } from '@mdi/js';

const router = useRouter();
const success = ref(true)

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

// ToDo display successful login/logout

</script>
<template>
  <div>
    <v-container width="500">
      <v-card>
        <v-toolbar color="blue"><v-toolbar-title>Login</v-toolbar-title></v-toolbar>
        <p :hidden="success" class="text-red">Incorrect username or password</p>
      </v-card>
      <v-card-text>
        <v-text-field v-model="account.email" label="email" name="email" autocomplete="on"></v-text-field>
        <v-text-field v-model="account.password" type="password" label="password" name="password"></v-text-field>
      </v-card-text>
      <v-row justify="start">
        <v-icon :icon="mdiLogin" @click="login"></v-icon>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
