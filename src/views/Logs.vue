<script setup>
import { VDateInput } from 'vuetify/labs/VDateInput'
import LoginButton from '@/components/LoginButton.vue'
import { mdiFileDocumentPlus, mdiFileDocumentMinus } from '@mdi/js'

</script>

<template>
    <main>
        <div>
            <v-container width="750">
                <!-- <v-toolbar class="toolbar rounded-t-lg" height="70">
                    <v-toolbar-title>Logs</v-toolbar-title>
                    <v-btn :icon="mdiFileDocumentPlus"></v-btn>
                </v-toolbar> -->
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-title class="toolbar rounded=t=lg text-h4" :expand-icon="mdiFileDocumentPlus"
                            :collapse-icon="mdiFileDocumentMinus">
                            Logs
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-form>
                                <VDateInput label="Select Date" prepend-icon="" prepend-inner-icon="$calendar"
                                    max-width="300" clearable></VDateInput>
                                <v-text-field label="Subject"></v-text-field>
                                <v-combobox chips multiple label="Tags"
                                    :items="['bleeding', 'blood pressure', 'dialysis', 'labs', 'maintenance', 'setup']"
                                    clearable></v-combobox>
                                <v-textarea label="Notes" auto-grow></v-textarea>
                            </v-form>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                            <ul>https://vuetifyjs.com/en/components/expansion-panels/</ul>
                            <ul>https://vuetifyjs.com/en/components/date-inputs</ul>
                            <ul>https://vuetifyjs.com/en/components/combobox</ul>
                            <ul>https://vuetifyjs.com/en/components/textareas</ul>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
                <LoginButton />
            </v-container>
        </div>
    </main>
</template>

<style></style>
