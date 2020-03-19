<template>
  <button :class="['btn', color, small && 'small']">
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
    },
  })
</script>

<style lang="postcss" scoped>
  .btn {
    --background: var(--brand-green);
    --shadow: var(--brand-green);
    background: var(--background);
    border-radius: var(--base-radius);
    color: var(--brand-white);
    font-weight: 500;
    font-size: var(--text-size-base);
    border: none;
    padding: 13.5px var(--base-gap);
    box-shadow: 0 2px 9px var(--shadow);

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
      color: var(--brand-green);
    }

    &.red {
      --background: var(--brand-red);
      --shadow: var(--brand-red);
    }

    &.grey,
    &[disabled] {
      --background: var(--brand-beige-dark);
      box-shadow: none;
    }
  }
</style>
