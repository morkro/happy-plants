<template>
  <div class="main-wireframe">
    <router-view class="intro-wrapper" />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Intro',

    meta: {
      title: 'Welcome to HappyPlants!'
    },

    methods: mapActions([
      'updateAppHeader'
    ]),

    mounted () {
      this.updateAppHeader({
        title: false,
        transparent: true,
        backBtn: false,
        rightBtn: false,
        color: 'black'
      })
    },

    beforeDestroy () {
      this.updateAppHeader({ transparent: false })
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../../styles/media-queries";

  .main-wireframe {
    width: 100%;
    min-height: 100vh;
    padding-left: var(--base-gap);
    padding-right: var(--base-gap);
    padding-bottom: var(--base-gap);
    max-width: var(--app-desktop-max-width);
    margin: 0 auto;

    & p {
      font-weight: 500;
    }
  }

  .intro-wrapper {
    padding-top: var(--base-gap);
  }
</style>
