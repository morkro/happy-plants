<template>
  <div class="tag-description">
    <strong>{{ label }}</strong>
    <span v-if="count > 1" key="description-has-items">
      {{ count }} plants tagged.
    </span>
    <span v-else-if="count === 1" key="description-has-item">
      {{ count }} plant tagged.
    </span>
  </div>
</template>

<script>
  export default {
    name: 'TagItem',

    props: {
      count: { type: Number, default: 0 },
      label: { type: String, required: true }
    }
  }
</script>

<style lang="postcss" scoped>
  .tag-description {
    display: flex;
    flex-direction: column;

    & span {
      color: var(--text-color-secondary);
      font-size: var(--text-size-small);
      margin-top: calc(var(--base-gap) / 2);
    }

    & strong {
      --label-background: var(--grey);
      align-self: flex-start;
      font-weight: 600;
      background: var(--label-background);
      padding: calc(var(--base-gap) / 2) var(--base-gap);
      display: inline-block;
      border-radius: var(--border-radius);
    }
  }
</style>
