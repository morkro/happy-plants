<template>
  <div class="app-screen">
    <slot />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Layout',
  })
</script>

<style lang="postcss" scoped>
  .app-screen {
    padding-top: var(--app-header-height);
    width: 100%;
    display: flex;
    flex-direction: column;

    & > main {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 var(--base-gap);
      position: relative;
      z-index: 0;
    }
  }
</style>
