<template>
  <v-layout>
    <app-header return-to="/home" />

    <main>Hello plant</main>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    created() {
      console.log('load plant')
    },
  })
</script>
