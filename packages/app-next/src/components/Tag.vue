<template>
  <div :class="['plant-tag', selected && 'selected']" @click="toggleSelection">
    <v-text :color="selected ? 'special' : 'normal'">
      <slot />
    </v-text>
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { PlantTag } from '@/types/plant'

  export default Vue.extend({
    name: 'VTag',
    props: {
      selected: {
        type: Boolean,
        default: false,
      },
      tag: {
        type: Object as PropType<PlantTag>,
      },
    },
    methods: {
      toggleSelection() {
        this.$emit('tag-selected', { selected: !this.selected, tag: this.tag })
      },
    },
  })
</script>

<style lang="postcss" scoped>
  .plant-tag {
    display: inline-block;
    background: var(--brand-white);
    padding: calc(0.25 * var(--base-gap)) calc(0.5 * var(--base-gap));
    border-radius: var(--base-radius);
    font-weight: 500;

    &.selected {
      background: var(--brand-green);
    }
  }
</style>
