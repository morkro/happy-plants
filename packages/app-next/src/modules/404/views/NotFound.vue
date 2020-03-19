<template>
  <div>
    <app-header />

    <main>
      <img src="../assets/404-illustration.svg" />
      <v-text type="title">Oops, how did you get here?</v-text>
      <v-text>Let’s just act like this never happend, shall we?</v-text>
    </main>

    <router-link to="/">
      Back to your plants
    </router-link>
    <app-menu />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'NotFound',
  })
</script>
