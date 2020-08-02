<template>
  <section class="plant-type">
    <v-text color="inactive">
      <strong>Plant type</strong>
    </v-text>

    <button @click="$emit('open-dialog')">
      <v-text color="special" type="button">{{ label }}</v-text>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 165 30" preserveAspectRatio="none">
        <path
          fill-rule="evenodd"
          d="M15.2980242 1.6865913C54.3474655-.0040447 142.277064-1.0595373 158.333369 1.687221c3.375937.5775946 5.502516 1.7986084 5.918387 3.8707842 1.21636 6.106668 1.016982 12.190389-1.095662 18.3021319-1.949603 5.6402323-10.579788 5.712085-23.246595 5.8007791C1.8856749 30.6329676 1.9064585 29.5996066.7651242 25.4596764c-.4861923-1.7819255-.903879-3.6105191-.7214437-5.4103613C1.9143985 2.0020504 4.40911 2.1588096 15.2980242 1.6865913"
        />
      </svg>
    </button>
  </section>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { PlantType } from '@/types/plant'

  export default Vue.extend({
    name: 'ModuleType',
    props: {
      type: {
        type: Object as PropType<PlantType>,
      },
    },
    computed: {
      label(): string {
        return this.type?.label || 'No type'
      },
    },
  })
</script>

<style lang="postcss" scoped>
  .plant-type {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: calc(0.5 * var(--base-gap)) var(--base-gap) 0;

    & .text {
      position: relative;
      z-index: 1;
    }

    & button:not(.btn) {
      background: transparent;
      border: none;
      position: relative;
      z-index: 0;
      padding: calc(0.5 * var(--base-gap)) var(--base-gap);

      &:focus {
        outline: none;

        & .text {
          color: var(--brand-green);
        }

        & svg path {
          fill: var(--brand-yellow);
        }
      }

      & svg {
        height: 85%;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);

        & path {
          fill: var(--brand-green);
        }
      }
    }
  }
</style>
