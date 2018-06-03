<template>
  <ul :class="['plant-list', `type-${type}`]">
    <li v-for="(plant, index) in plants" :key="index">
      <plant-preview
        @toggle-delete-selection="emitDeleteSelection"
        @toggle-pressed-selection="emitPressedSelection"
        :type="type"
        :delete-mode="isDeleteMode"
        :pressed-mode="isPressedMode"
        :guid="plant.guid"
        :name="plant.name"
        :image-url="plant.imageURL" />
    </li>
  </ul>
</template>

<script>
  import PlantPreview from './PlantPreview'
  export default {
    name: 'PlantsList',

    props: {
      type: { type: String, default: 'grid' },
      plants: { type: Array, default: () => [], required: true },
      isDeleteMode: { type: Boolean, default: false, required: true },
      isPressedMode: { type: Boolean, default: false, required: true }
    },

    components: {
      'plant-preview': PlantPreview
    },

    methods: {
      emitDeleteSelection (item) {
        this.$emit('delete-selection', item)
      },
      emitPressedSelection (item) {
        this.$emit('pressed-selection', item)
      }
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../../../styles/media-queries";

  .plant-list {
    list-style: none;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    --list-gap: calc(var(--base-gap) * 2 - var(--base-gap) / 2);
    --item-size-width: calc(50vw - var(--list-gap));
    --item-size-height: var(--item-size-width);

    &.type-list {
      --item-size-width: 100%;
      --item-size-height: 10vh;
      flex-direction: column;
    }

    & li {
      width: var(--item-size-width);
      height: var(--item-size-height);
      margin-bottom: var(--base-gap);

      &:nth-child(even):not(:last-child) {
        margin-left: auto;
      }

      &:nth-child(odd):not(:last-child) {
        margin-right: auto;
      }
    }

    @media (--min-desktop-viewport) {
      & li {
        width: calc(var(--app-desktop-max-width) / 2 - var(--list-gap));
        height: calc(var(--app-desktop-max-width) / 2 - var(--list-gap));
      }
    }
  }
</style>
