<template>
  <div :class="['box', color]">
    <slot />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  const colors = ['red', 'green', 'default']

  export default Vue.extend({
    name: 'Box',

    props: {
      color: {
        type: String,
        default: 'default',
        validator: v => colors.includes(v),
      },
    },
  })
</script>

<style lang="postcss">
  .box {
    --box-color: var(--text-color-inverse);
    background: var(--background-primary);
    border-radius: var(--border-radius);
    box-shadow: var(--plain-shadow);
    overflow: hidden;
    width: inherit;
    height: inherit;

    &.red,
    &.green {
      color: var(--box-color);

      & p {
        color: var(--box-color);
      }
    }

    &.red {
      background: var(--brand-red);
    }

    &.green {
      background: var(--brand-green);
    }
  }
</style>
