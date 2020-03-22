<template>
  <input />
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'VInput',
  })
</script>

<style lang="postcss" scoped>
  input {
    background: var(--brand-white);
    border-radius: var(--base-radius);
    font-family: 'FiraMono', 'Courier New', Courier, monospace;
    padding: calc(var(--base-gap) * 1.5);
    border: 2px solid var(--brand-white);
    color: var(--brand-green-dark);

    &:focus {
      border-color: var(--brand-beige-dark);
    }

    &::placeholder {
      color: var(--brand-beige-dark);
    }

    &:invalid {
      border-color: var(--brand-red);
    }
  }
</style>
