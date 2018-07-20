<template>
  <section :class="{ 'plant-footer': true, 'no-modules': noModules }">
    <v-button
      color="grey"
      class="footer-modules"
      @click.native.prevent="emitShowModules">
      <feather-box slot="icon" />
      Manage modules
    </v-button>

    <p v-if="noModules">
      Modules let you keep track of the individual requirements and needs of your plant.
    </p>

    <v-button
      v-if="showTagButton"
      color="grey"
      class="footer-tags"
      @click.native.prevent="emitShowTags">
      <feather-tag slot="icon" />
      Add tags
    </v-button>
  </section>
</template>

<script>
  import Button from '@/components/Button'
  export default {
    name: 'PlantFooter',

    props: {
      noModules: { type: Boolean, default: true },
      showTagButton: { type: Boolean, default: false }
    },

    components: {
      'v-button': Button,
      'feather-box': () =>
        import('vue-feather-icons/icons/BoxIcon' /* webpackChunkName: "icons" */),
      'feather-tag': () =>
        import('vue-feather-icons/icons/TagIcon' /* webpackChunkName: "icons" */)
    },

    methods: {
      emitShowModules () {
        this.$emit('manage-modules')
      },
      emitShowTags () {
        this.$emit('show-tags')
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
      font-size: var(--text-size-xsmall);
    }
  }
</style>
