<template>
  <button :class="btnClass">
    <slot />
  </button>
</template>

<script lang="ts">
  import Vue from 'vue'

  const colors = ['green', 'blue', 'yellow', 'red', 'grey']

  export default Vue.extend({
    name: 'VButton',

    props: {
      color: {
        type: String,
        default: 'green',
        validator: v => colors.includes(v),
      },
      small: {
        type: Boolean,
        default: false,
      },
      border: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      btnClass(): string[] {
        return ['btn', this.color, this.small && 'small', this.border && 'border']
      },
    },
  })
</script>

<style lang="postcss">
  .btn {
    --background: var(--brand-green);
    --shadow: var(--brand-green);
    background: var(--background);
    border-radius: var(--base-radius);
    color: var(--brand-white);
    font-weight: 500;
    font-size: var(--text-size-base);
    border: 2px solid var(--background);
    padding: 13.5px var(--base-gap);
    box-shadow: 0 2px 9px var(--shadow);
    text-decoration: none;
    text-align: center;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: border-color 100ms ease-in-out, box-shadow 100ms ease-in-out;

    &:focus {
      animation: bounce 650ms;
    }

    &:focus:not(.border),
    &:active:not(.border) {
      border-color: var(--brand-white);
      outline: none;
    }

    /* Type */
    &.border {
      background: transparent !important;
      border: 2px solid var(--brand-white);
      box-shadow: none;

      &:focus,
      &:active {
        --shadow: var(--brand-white);
        box-shadow: 0 2px 9px var(--shadow);
        outline: none;
      }

      &.yellow {
        color: var(--brand-white);
      }
    }

    /* Size */
    &.small {
      padding: calc(var(--base-gap) / 2.5) 10px;
    }

    /* Color */
    &.blue {
      --background: var(--brand-blue);
      --shadow: var(--brand-blue);
    }

    &.yellow {
      --background: var(--brand-yellow);
      --shadow: var(--brand-yellow);
      color: var(--brand-green-dark);
    }

    &.red {
      --background: var(--brand-red);
      --shadow: var(--brand-red);
    }

    &.grey,
    &[disabled] {
      --background: var(--brand-beige-dark);
      --shadow: var(--brand-beige-dark);
      box-shadow: none;
    }

    &.grey:focus,
    &.gey:active {
      box-shadow: 0 2px 9px var(--shadow);
    }
  }
</style>
