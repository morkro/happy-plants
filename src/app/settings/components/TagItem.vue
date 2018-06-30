<template>
  <div class="tag-description">
    <strong class="tag">{{ label }}</strong>
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

    & .tag {
      align-self: flex-start;
      display: inline-block;
    }
  }
</style>
