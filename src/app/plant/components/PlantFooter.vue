<template>
  <section :class="{ 'plant-footer': true, 'no-modules': noModules }">
    <button class="plain" @click.prevent="emitButtonClicked">
      <feather-box />
      <span>Manage modules</span>
    </button>

    <p v-if="noModules">
      Modules let you keep track of the individual requirements and needs of your plant.
    </p>
  </section>
</template>

<script>
  export default {
    name: 'PlantFooter',

    props: {
      noModules: { type: Boolean, default: true }
    },

    components: {
      'feather-box': () =>
        import('vue-feather-icon/components/box' /* webpackChunkName: "plant" */)
    },

    methods: {
      emitButtonClicked () {
        this.$emit('manage-modules')
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .plant-footer {
    background: var(--background-secondary);
    width: 100%;
    padding:
      calc(var(--base-gap) / 2) var(--base-gap)
      calc(var(--base-gap) / 2 + 3px);
    font-size: var(--text-size-xsmall);
    font-style: italic;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.no-modules {
      font-size: var(--text-size-base);
      font-style: normal;
      padding: var(--base-gap);
      flex-direction: column;
      justify-content: center;
      flex: 1;
    }
  }

  .no-modules {
    & p,
    & span {
      text-align: center;
    }

    & p {
      margin: calc(var(--base-gap) * 1.5) 0;
    }

    & span {
      font-size: var(--text-size-xsmall);
      font-style: italic;
      display: block;
    }
  }
</style>
