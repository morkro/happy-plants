<template>
  <v-layout class="screen-onboarding-features">
    <app-header return-to="/welcome">Welcome</app-header>

    <main>
      <router-link to="/onboarding/account" class="btn">Next</router-link>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({})
</script>
