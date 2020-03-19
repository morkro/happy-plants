<template>
  <div class="screen-welcome">
    <main>
      <h1>HappyPlants</h1>
      <v-text>
        Keep track of your houseplants' well-being.
      </v-text>
      <div>
        <router-link to="/login">
          Login
        </router-link>
        <router-link to="/onboarding">
          Getting started
        </router-link>
      </div>
    </main>
    <footer>
      <span>About</span>
      <span>Contact</span>
      <span>Open Source</span>
    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Welcome',
  })
</script>

<style lang="postcss" scoped>
  .screen-welcome {
    width: 100%;
    background-image: url('../assets/welcome-background.svg');
    background-repeat: no-repeat;
    background-size: calc(100% + 2px);
    background-position: bottom;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
