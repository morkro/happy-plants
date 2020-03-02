<template>
  <v-box class="plant-component">
    <div class="component-header">
      <div class="component-title">
        <slot name="icon" />
        <slot name="title" />
      </div>

      <div v-if="settings" class="component-settings">
        <button
          type="button"
          class="icon"
          aria-role="Options"
        >
          <feather-more-horizontal />
        </button>
      </div>
    </div>

    <div class="component-content">
      <slot name="content" />
    </div>
  </v-box>
</template>

<script>
  import { MoreHorizontalIcon } from 'vue-feather-icons'
  export default {
    name: 'PlantComponent',

    components: {
      'feather-more-horizontal': MoreHorizontalIcon
    },

    props: {
      settings: { type: Boolean, default: false }
    }
  }
</script>

<style lang="postcss">
  .plant-component {
    width: 100%;
    padding: var(--base-gap);
    overflow: hidden;
    z-index: 0;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .plant-component .component-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: calc(var(--base-gap) / 1.5);
    position: relative;
    z-index: 2;

    & .component-title {
      display: flex;
      align-items: center;

      & svg {
        width: var(--icon-size-small);
        height: var(--icon-size-small);
        opacity: 0.5;
        margin-right: calc(var(--base-gap) / 3);
      }
    }
  }

  .plant-component .component-content {
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>
