<template>
  <section>
    <feather-clock class="updates-icon" />
    <p>Last updated: {{ modifiedDate }}</p>
  </section>
</template>

<script>
  export default {
    name: 'PlantSeasons',

    props: {
      modified: { type: Number, default: Date.now() }
    },

    components: {
      'feather-clock': () =>
        import('vue-feather-icon/components/clock' /* webpackChunkName: "plant" */)
    },

    computed: {
      modifiedDate () {
        const date = new Date(this.modified)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        return `${day}.${month}.${year}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/animations";

  section {
    background: var(--background-secondary);
    width: 100%;
    padding:
      calc(var(--base-gap) / 2) var(--base-gap)
      calc(var(--base-gap) / 2 + 3px);
    font-size: var(--text-size-xsmall);
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      color: var(--text-color-secondary);
    }
  }

  .updates-icon {
    margin-right: calc(var(--base-gap) / 3);
    height: 16px;
    width: 16px;
    stroke: var(--text-color-secondary);
    opacity: 0.5;
  }
</style>
