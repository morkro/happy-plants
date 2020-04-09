<template>
  <div class="screen-onboarding-account">
    <app-header return-to="/onboarding">
      Create account
    </app-header>

    <main>
      get yo account straight
      <router-link to="/onboarding" class="btn">
        Back
      </router-link>
      <router-link to="/onboarding/success" class="btn">
        Next
      </router-link>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'OnboardingAccount',
  })
</script>

<style lang="postcss" scoped>
  .screen-onboarding-account {
    width: 100%;
  }
</style>
