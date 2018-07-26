<template>
  <span :class="['tag', size]">
    <slot />
  </span>
</template>

<script>
  const sizes = ['normal', 'small']
  export default {
    name: 'Tag',

    props: {
      size: { type: String, default: 'normal', validator: v => sizes.includes(v) }
    }
  }
</script>

<style lang="postcss">
  .tag {
    --label-background: var(--grey);
    font-weight: 500;
    background: var(--label-background);
    padding: calc(var(--base-gap) / 2) var(--base-gap);
    display: inline-block;
    border-radius: var(--border-radius);

    &.small {
      font-size: var(--text-size-small);
      padding: calc(var(--base-gap) / 2) calc(var(--base-gap) / 1.5);
    }
  }
</style>
