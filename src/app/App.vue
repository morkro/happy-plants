<template>
  <div id="app">
    <app-notifications class="notifications" :message="'Foo'"></app-notifications>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import Notifications from '@/app/shared/Notifications'

  export default {
    name: 'HappyPlants',

    components: {
      'app-notifications': Notifications
    },

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
  @import "~styles/z-index";

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

  .notifications {
    display: none;
    z-index: z($page-elements, notifications);
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
