<template>
  <section :class="{ 'plant-footer': true, 'no-modules': noModules }">
    <button class="plain" @click.prevent="emitButtonClicked">
      <feather-box />
      <span>Manage modules</span>
    </button>

    <p v-if="noModules">
      Modules let you keep track of the individual requirements and needs of your plant.
    </p>

    <div class="plant-meta">
      <span>Last updated: {{ modifiedDate }}</span>
      <span>Created: {{ createdDate }}</span>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'PlantFooter',

    props: {
      modified: { type: Number, default: Date.now() },
      created: { type: Number, default: Date.now() },
      noModules: { type: Boolean, default: true }
    },

    components: {
      'feather-box': () =>
          import('vue-feather-icon/components/box' /* webpackChunkName: "plant" */)
    },

    computed: {
      modifiedDate () {
        return this.formatDate(this.modified)
      },
      createdDate () {
        return this.formatDate(this.created)
      }
    },

    methods: {
      formatDate (dateString) {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        return `${day}.${month}.${year}`
      },
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

  .plant-meta {
    & span {
      color: var(--text-color-secondary);
      text-align: right;
      display: block;
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
