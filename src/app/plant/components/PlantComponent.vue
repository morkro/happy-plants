<template>
  <section class="plant-component">
    <header>
      <div class="component-title">
        <slot name="icon"></slot>
        <slot name="title"></slot>
      </div>

      <div class="component-settings" v-if="settings">
        <button class="icon" aria-role="Options">
          <feather-more-horizontal />
        </button>
      </div>
    </header>

    <slot class="component-content" name="content"></slot>
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
        import('vue-feather-icon/components/more-horizontal' /* webpackChunkName: "plant" */)
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
</style>
