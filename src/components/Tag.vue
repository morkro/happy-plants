<template>
  <span :class="['tag', size, { 'has-icon': !!$slots.icon }]">
    <div v-if="!!$slots.icon">
      <slot name="icon" />
    </div>
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
    --label-color: var(--text-color-base);

    @nest html[data-theme="dark"] & {
      --label-background: var(--dark-grey);
      --label-color: var(--text-color-inverse);
    }

    font-weight: 500;
    background: var(--label-background);
    padding: calc(var(--base-gap) / 2) var(--base-gap);
    display: inline-block;
    border-radius: var(--border-radius);
    color: var(--label-color);

    &.small {
      font-size: var(--text-size-small);
      padding: calc(var(--base-gap) / 2) calc(var(--base-gap) / 1.5);
    }

    &.has-icon {
      display: flex;
      align-items: center;
      overflow: hidden;

      & > div {
        background: var(--transparency-black-light);
        margin-top: calc(-0.5 * var(--base-gap));
        margin-bottom: calc(-0.5 * var(--base-gap));
        margin-right: var(--base-gap);
        margin-left: calc(-1 * var(--base-gap));
        padding: calc(var(--base-gap) / 2);
        display: flex;
      }

      & svg {
        height: var(--icon-size-base);
        width: var(--icon-size-base);
      }
    }
  }
</style>
