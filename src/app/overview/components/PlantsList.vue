<template>
  <ul class="plant-list">
    <li v-for="plant in plants">
      <plant-preview
        @toggle-delete-selection="emitDeleteSelection"
        @toggle-categorise-selection="emitCategoriseSelection"
        :deleteMode="isDeleteMode"
        :categoriseMode="isCategoryMode"
        :defaultSelected="hasCategory(plant)"
        :guid="plant.guid"
        :name="plant.name"
        :categories="plant.categories"
        :imageURL="plant.imageURL" />
    </li>
  </ul>
</template>

<script>
  import PlantPreview from './PlantPreview'
  export default {
    name: 'PlantsList',

    props: {
      plants: { type: Array, default: [], required: true },
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

<style lang="scss" scoped>
  .plant-list {
    list-style: none;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    --list-gap: calc(var(--base-gap) * 2 - var(--base-gap) / 2);

    li {
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
  }
</style>
