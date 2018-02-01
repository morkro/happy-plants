<template>
  <v-touch
    id="app"
    @swiperight="onSwipeRight"
    @swipeleft="onSwipeLeft"
    :swipe-options="{ direction: 'horizontal' }">
    <app-notifications
      class="notifications"
      :message="message">
    </app-notifications>
    <router-view></router-view>
  </v-touch>
</template>

<script>
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
      message: state => state.notification.message
    }),

    methods: {
      ...mapActions([
        'loadPlants',
        'loadSettings',
        'loadCategories',
        'hideNotification'
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

    mounted () {
      Promise.all([
        this.loadSettings(),
        this.loadPlants(),
        this.loadCategories()
      ])
    },

    updated () {
      if (this.message) {
        setTimeout(this.hideNotification, this.notificationTimeout)
      }
    }
  }
</script>

<style lang="postcss">
  @import "../../node_modules/normalize.css/normalize";
  @import "../styles/colors";
  @import "../styles/animations";
  @import "../styles/media-queries";
  @import "../styles/fonts";
  @import "../styles/typography";
  @import "../styles/forms";
  @import "../styles/buttons";
  @import "../styles/layout";

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
    min-height: 100vh;
    height: 100%;
  }

  .notifications {
    z-index: 4;
  }

  .main-wireframe {
    display: flex;
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding-top: var(--app-header-size);
  }

  .app-content {
    width: 100%;
    max-width: var(--app-mobile-max-size);
    margin: 0 auto;

    @media (--min-desktop-viewport) {
      max-width: var(--app-desktop-max-width);
    }
  }

  .svg-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    color: inherit;
    vertical-align: middle;
    fill: none;
    stroke: currentColor;

    & path {
      fill: currentColor;
    }
  }

  .svg-fill {
    fill: currentColor;
    stroke: none;
  }
</style>
