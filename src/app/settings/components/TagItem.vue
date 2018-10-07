<template>
  <div class="tag-description">
    <v-tag>{{ label }}</v-tag>
    <span v-if="count > 1" key="description-has-items">
      {{ count }} plants tagged.
    </span>
    <span v-else-if="count === 1" key="description-has-item">
      {{ count }} plant tagged.
    </span>
  </div>
</template>

<script>
  import Tag from '@/components/Tag'
  export default {
    name: 'TagItem',

    props: {
      count: { type: Number, default: 0 },
      label: { type: String, required: true }
    },

    components: {
      'v-tag': Tag
    }
  }
</script>

<style lang="postcss" scoped>
  .tag-description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & span:not(.tag) {
      color: var(--text-color-secondary);
      font-size: var(--text-size-small);
      margin-top: calc(var(--base-gap) / 2);
    }
  }
</style>
