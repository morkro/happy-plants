<template>
  <div class="categories-description">
    <strong>{{ label }}</strong>
    <span v-if="count > 1" key="description-has-items">
      Contains {{ count }} plants.
    </span>
    <span v-else-if="count === 1" key="description-has-item">
      Contains {{ count }} plant.
    </span>
    <span v-else key="description-no-items">
      No plants added to the category yet.
    </span>
  </div>
</template>

<script>
  export default {
    name: 'ListDescription',

    props: {
      count: { type: Number, default: 0 },
      label: { type: String, required: true }
    }
  }
</script>

<style lang="scss" scoped>
  .categories-description {
    display: flex;
    flex-direction: column;

    span {
      color: var(--dark-grey);
      font-size: var(--text-size-xsmall);
      margin-top: calc(var(--base-gap) / 3);
    }
  }
</style>
