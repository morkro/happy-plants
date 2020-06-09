<template>
  <v-text>
    <slot />
  </v-text>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'VTag',
  })
</script>

<style lang="postcss" scoped>
  .text {
    background: var(--brand-white);
    padding: calc(0.25 * var(--base-gap)) calc(0.5 * var(--base-gap));
    border-radius: var(--base-radius);
    font-weight: 500;
  }
</style>
