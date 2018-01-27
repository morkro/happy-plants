<template>
  <section class="plant-footer">
    <button class="icon inverse" @click.prevent="emitButtonClicked">
      <feather-box />
      Add modules
    </button>
    <p>
      Modules let you keep track of the individual requirements and needs of your plant.
    </p>
    <div>
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
      created: { type: Number, default: Date.now() }
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

<style lang="scss" scoped>
  @import "~styles/animations";

  .plant-footer {
    background: var(--background-secondary);
    width: 100%;
    padding:
      calc(var(--base-gap) / 2) var(--base-gap)
      calc(var(--base-gap) / 2 + 3px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;

    p,
    span {
      color: var(--text-color-secondary);
      text-align: center;
    }

    p {
      margin: var(--base-gap) 0;
    }

    span {
      font-size: var(--text-size-xsmall);
      font-style: italic;
      display: block;
    }

    button {
      border: 2px dashed var(--grey);
      color: var(--text-color-base);
      padding: 12px;
      font-size: var(--text-size-base);
    }
  }
</style>
