<template>
  <ul class="plant-list">
    <li v-for="(plant, index) in plants" :key="index">
      <plant-preview
        @toggle-delete-selection="emitDeleteSelection"
        @toggle-categorise-selection="emitCategoriseSelection"
        :delete-mode="isDeleteMode"
        :categorise-mode="isCategoryMode"
        :default-selected="hasCategory(plant)"
        :guid="plant.guid"
        :name="plant.name"
        :categories="plant.categories"
        :image-url="plant.imageURL" />
    </li>
  </ul>
</template>

<script>
  import PlantPreview from './PlantPreview'
  export default {
    name: 'PlantsList',

    props: {
      plants: { type: Array, default: () => [], required: true },
      selectedCategory: { type: [Boolean, Object], default: false },
      isDeleteMode: { type: Boolean, default: false, required: true },
      isCategoryMode: { type: Boolean, default: false, required: true }
    },

    components: {
      'plant-preview': PlantPreview
    },

    methods: {
      hasCategory (plant) {
        return plant.categories && !!this.selectedCategory &&
            plant.categories.some(cat => cat === this.selectedCategory.guid)
      },
      emitDeleteSelection (item) {
        this.$emit('delete-selection', item)
      },
      emitCategoriseSelection (item) {
        this.$emit('categorise-selection', item)
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
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    --list-gap: calc(var(--base-gap) * 2 - var(--base-gap) / 2);

    & li {
      width: calc(50vw - var(--list-gap));
      height: calc(50vw - var(--list-gap));
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
