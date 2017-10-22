<template>
  <v-touch
    id="app"
    @swiperight="onSwipeRight"
    @swipeleft="onSwipeLeft"
    :swipe-options="{ direction: 'horizontal' }">
    <app-notifications class="notifications" :message="message" ></app-notifications>
    <router-view></router-view>
  </v-touch>
</template>

<script>
  import firebase from 'firebase'
  import { mapActions, mapState } from 'vuex'
  import AppNotifications from '@/components/AppNotifications'

  export default {
    name: 'HappyPlants',

    components: {
      'app-notifications': AppNotifications
    },

    data () {
      return {
        notificationTimeout: 2000
      }
    },

    computed: mapState({
      authenticated: state => state.user.authenticated,
      message: state => state.notification.message
    }),

    methods: {
      ...mapActions([
        'loadPlants',
        'loadSettings',
        'hideNotification',
        'signInUser',
        'signOutUser',
        'authError'
      ]),
      isOverviewRoute () {
        return (
          this.$route.name === 'Overview' ||
          this.$route.path === '/'
        )
      },
      onSwipeRight () {
        if (this.isOverviewRoute()) {
          return
        }
        this.$router.back()
      },
      onSwipeLeft () {
        if (!this.isOverviewRoute()) {
          return
        }
        this.$router.push('/add')
      }
    },

    created () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.signInUser(user)
        } else {
          this.signOutUser()
        }
      })
    },

    mounted () {
      this.loadSettings()
        .then(() => this.loadPlants())
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
  @import "~styles/layout";
  @import "~styles/z-index";

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    justify-content: center;

    &.js-no-scrolling {
      overflow: hidden;
    }
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
