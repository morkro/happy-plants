<template>
  <div id="app">
    <app-notifications class="notifications" :message="message" ></app-notifications>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import Notifications from '@/app/shared/Notifications'

  export default {
    name: 'HappyPlants',

    components: {
      'app-notifications': Notifications
    },

    data () {
      return {
        notificationTimeout: 2000
      }
    },

    computed: mapState({
      message: state => state.notification.message
    }),

    methods: mapActions([
      'loadPlants',
      'loadSettings',
      'hideNotification'
    ]),

    mounted () {
      this.loadSettings()
      this.loadPlants()
    },

    updated () {
      if (this.message) {
        setTimeout(this.hideNotification, this.notificationTimeout)
      }
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
