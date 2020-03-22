<template>
  <div id="app-menu">
    <router-link to="/home">
      Home
    </router-link>
    <router-link to="/settings">
      Settings
    </router-link>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'AppMenu',
  })
</script>

<style lang="postcss">
  #app-menu {
    height: 50px;
    width: 100%;
    background: var(--brand-beige);
    display: flex;
    justify-content: space-evenly;
  }
</style>
