<template>
  <textarea :class="{ 'has-error': error }" :value="value" @input="handleInput" />
</template>

<script lang="ts">
  import Vue from 'vue'
  import { HTMLElementEvent } from '@/types/events'

  export default Vue.extend({
    name: 'VTextarea',
    props: {
      value: String,
      error: Boolean,
      errorMessage: String,
    },
    methods: {
      handleInput(event: HTMLElementEvent<HTMLInputElement>) {
        this.$emit('input', event.target.value)
      },
    },
  })
</script>

<style lang="postcss" scoped>
  textarea {
    background: var(--brand-white);
    border-radius: var(--base-radius);
    font-family: 'FiraMono', 'Courier New', Courier, monospace;
    padding: calc(var(--base-gap) * 1.5);
    border: 2px solid var(--brand-white);
    color: var(--brand-green-dark);
    transition: box-shadow 100ms ease-in-out;

    &:focus,
    &:active {
      border-color: var(--brand-beige-dark);
      outline: none;
      box-shadow: 0 2px 9px var(--brand-beige-dark);
    }

    &::placeholder {
      color: var(--brand-beige-dark);
    }

    &:invalid:not(:empty) {
      border-color: var(--brand-red);
    }

    &.has-error {
      border-color: var(--brand-red);
    }
  }
</style>
