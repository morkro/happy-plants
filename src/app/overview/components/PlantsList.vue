<template>
  <ul :class="['plant-list', `type-${type}`]">
    <li v-for="(plant, index) in plantData" :key="index">
      <plant-preview
        @toggle-delete-selection="emitDeleteSelection"
        @toggle-pressed-selection="emitPressedSelection"
        :content-loading="!plant.guid"
        :tags="plantTags(plant.guid)"
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
  import { mapGetters } from 'vuex'
  import PlantPreview from './PlantPreview'

  export default {
    name: 'PlantsList',

    props: {
      contentLoading: { type: Boolean, default: true },
      type: { type: String, default: 'grid' },
      plants: { type: Array, default: () => [], required: true },
      tags: { type: Array, default: () => [], required: true },
      isDeleteMode: { type: Boolean, default: false, required: true },
      isPressedMode: { type: Boolean, default: false, required: true }
    },

    components: {
      'plant-preview': PlantPreview
    },

    computed: {
      ...mapGetters({
        plantTags: 'getPlantTags'
      }),
      plantData () {
        return this.contentLoading && this.plants.length === 0
          ? this.mockPlants
          : this.plants
      }
    },

    data: () => ({
      mockPlants: new Array(4).fill({})
    }),

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

    --list-gap: 1.5 * var(--base-gap);
    --item-size-width: calc(50vw - var(--list-gap));
    --item-size-height: var(--item-size-width);

    &.type-list {
      --item-size-width: 100%;
      --item-size-height: 15vh;
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
