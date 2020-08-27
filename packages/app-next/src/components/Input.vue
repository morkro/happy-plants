<template>
  <input :class="{ 'has-error': error }" :value="value" @input="handleInput" ref="input" />
  <!--
    :aria-describedby="`input-${_uid}`"
  -->
  <!-- <span v-if="error" :id="`input-${_uid}`">{{ errorMessage }}</span> -->
</template>

<script lang="ts">
  import Vue from 'vue'
  import { HTMLElementEvent } from '@/types/events'

  export default Vue.extend({
    name: 'VInput',
    props: {
      value: String,
      error: Boolean,
      errorMessage: String,
    },
    methods: {
      handleInput(event: HTMLElementEvent<HTMLInputElement>) {
        this.$emit('input', event.target.value)
      },
      focus() {
        ;(this.$refs.input as HTMLInputElement).focus()
      },
    },
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
    transition: box-shadow 100ms ease-in-out;

    &[type='radio'],
    &[type='checkbox'] {
      width: 22px;
      height: 22px;
      border: 2px solid var(--brand-beige-dark);
      border-radius: 100%;
      appearance: none;
      padding: 0;

      &:checked {
        border-color: var(--brand-green);
        background: var(--brand-green);
        display: flex;
        justify-content: center;
        align-items: center;

        &::before {
          content: '';
          display: block;
          width: 60%;
          height: 30%;
          border-radius: var(--base-radius);
          border-bottom: 2px solid var(--brand-white);
          border-left: 2px solid var(--brand-white);
          transform: rotate(-45deg) translateX(1px);
        }
      }

      &:focus,
      &:active {
        box-shadow: 0 2px 9px var(--brand-green);
      }
    }

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
