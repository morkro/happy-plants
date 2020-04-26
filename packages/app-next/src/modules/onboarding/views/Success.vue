<template>
  <v-layout class="screen-onboarding-success">
    <app-header return-to="/onboarding">
      Create account
    </app-header>

    <main>
      Yeay! get ready

      <router-link to="/new" class="btn">
        Add your first plant
      </router-link>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'OnboardingSuccess',
  })
</script>

<style lang="postcss" scoped>
  .screen-onboarding-success {
    width: 100%;
  }
</style>
