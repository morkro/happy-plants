<template>
  <section class="module-tags">
    <v-text color="inactive">
      <strong>Tags</strong>
    </v-text>

    <div class="module-tags-container">
      <v-button round small @click.native="$emit('open-dialog')">
        <feather-plus />
        <span class="visuallyhidden">Open dialog</span>
      </v-button>

      <v-text v-if="!tags.length" color="inactive">Add tags for more granular organisation</v-text>

      <div v-else class="module-tags-list">
        <v-tag v-for="tag of tags" :key="tag.guid" :tag="tag">{{ tag.label }}</v-tag>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { PlantTag } from '@/types/plant'

  export default Vue.extend({
    name: 'PlantModuleTags',
    props: {
      tags: {
        type: Array as PropType<PlantTag[]>,
      },
    },
    components: {
      'feather-plus': () =>
        import('vue-feather-icons/icons/PlusIcon' /* webpackChunkName: "icons" */),
    },
  })
</script>

<style lang="postcss" scoped>
  .module-tags {
    width: 100%;

    & > .text {
      padding: calc(0.5 * var(--base-gap)) var(--base-gap);
      padding-bottom: 0;
    }
  }

  .module-tags-container {
    display: flex;
    align-items: center;
    padding: calc(0.5 * var(--base-gap)) var(--base-gap);
    overflow: hidden;

    & .btn {
      margin-right: calc(0.5 * var(--base-gap));
    }
  }

  .module-tags-list {
    & > .plant-tag:not(:last-of-type) {
      margin-right: calc(0.5 * var(--base-gap));
    }
  }
</style>
