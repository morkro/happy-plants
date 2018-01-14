<template>
  <section>
    <p>Last updated: {{ modifiedDate }}</p>
    <p>Created: {{ createdDate }}</p>
  </section>
</template>

<script>
  export default {
    name: 'PlantSeasons',

    props: {
      modified: { type: Number, default: Date.now() },
      created: { type: Number, default: Date.now() }
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
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    p {
      color: var(--text-color-secondary);
    }
  }
</style>
