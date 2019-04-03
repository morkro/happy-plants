<template>
  <div :class="['box', color]">
    <slot />
  </div>
</template>

<script>
  const colors = ['red', 'green']
  export default {
    name: 'Box',

    props: {
      color: {
        type: String,
        default: 'default',
        validator: v => colors.includes(v)
      }
    }
  }
</script>

<style lang="postcss" scoped>
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
