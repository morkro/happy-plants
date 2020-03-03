<template>
  <section class="plant-component">
    <header>
      <div class="component-title">
        <slot name="icon" />
        <slot name="title" />
      </div>

      <div class="component-settings" v-if="settings">
        <button
          type="button"
          class="icon"
          aria-role="Options"
        >
          <feather-more-horizontal />
        </button>
      </div>
    </header>

    <div class="component-content">
      <slot name="content" />
    </div>
  </section>
</template>

<script>
  export default {
    name: 'PlantComponent',

    props: {
      settings: { type: Boolean, default: false }
    },

    components: {
      'feather-more-horizontal': () =>
        import('vue-feather-icons/icons/MoreHorizontalIcon' /* webpackChunkName: "icons" */)
    }
  }
</script>

<style lang="postcss" scoped>
  section.plant-component {
    background-color: var(--background-primary);
    width: 100%;
    padding: var(--base-gap);
    margin-bottom: 4px;
    overflow: hidden;
    z-index: 0;
    position: relative;
  }

  .plant-component header {
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
        width: var(--icon-size--small);
        height: var(--icon-size-small);
        opacity: 0.5;
        margin-right: calc(var(--base-gap) / 3);
      }
    }
  }

  .plant-component .component-content {
    display: flex;
    width: 100%;
  }
</style>
