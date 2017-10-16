<template>
  <section>
    <feather-clock class="updates-icon" />
    <p>Last updated: {{ formatDate(modified) }}</p>
  </section>
</template>

<script>
  export default {
    name: 'PlantSeasons',

    props: {
      modified: { type: Number, default: Date.now() }
    },

    components: {
      FeatherClock: () => import('vue-feather-icon/components/clock' /* webpackChunkName: "plant" */)
    },

    methods: {
      formatDate (dateObject) {
        const date = new Date(dateObject)
        const year = date.getFullYear()
        const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
        const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()
        return `${day}.${month}.${year}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/animations";
  @import "~styles/colors";
  @import "~styles/fonts";
  @import "~styles/layout";

  section {
    background: $background-secondary;
    width: 100%;
    padding: $base-gap/2 $base-gap ($base-gap/2)+3;
    font-size: $text-size-xsmall;
    font-style: italic;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      color: $text-color-secondary;
    }
  }

  .updates-icon {
    margin-right: $base-gap/3;
    height: 16px;
    width: 16px;
    stroke: $text-color-secondary;
    opacity: 0.5;
  }
</style>
