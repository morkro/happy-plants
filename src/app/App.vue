<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'HappyPlants',

    methods: mapActions([
      'loadPlants'
    ]),

    mounted () {
      this.loadPlants()
    }
  }
</script>

<style lang="scss">
  @import "~node_modules/normalize.css/normalize";
  @import "~styles/fonts";
  @import "~styles/typography";
  @import "~styles/forms";
  @import "~styles/buttons";

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    justify-content: center;
  }

  #app {
    width: 100vw;
    max-width: 1400px;
    min-height: 100vh;
    height: 100%;
  }

  .main-wireframe {
    display: flex;
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding-top: $app-header-size;
  }
</style>
