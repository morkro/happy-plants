<template>
  <div id="app">
    <transition>
      <app-notification v-if="notificationMessage" />
    </transition>

    <screen-transition>
      <router-view />
    </screen-transition>

    <app-menu v-if="showAppMenu" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { NotificationsState } from '@/modules/notifications/store/state'
  import AppNotification from '@/modules/notifications/components/Notification.vue'
  import { Route } from 'vue-router'

  export default Vue.extend({
    name: 'HappyPlants',
    metaInfo: {
      title: 'HappyPlants',
      titleTemplate: '%s — HappyPlants',
    },
    data: () => ({
      showAppMenu: false,
    }),
    components: {
      'app-notification': AppNotification,
    },
    computed: mapState<NotificationsState>('notifications', {
      notificationMessage: (state: NotificationsState) => state.message,
    }),
    created() {
      this.showAppMenu = this.$router.currentRoute.matched.some(record => record.meta.showAppMenu)
      this.$router.beforeEach((to: Route, from: Route, next) => {
        this.showAppMenu = to.matched.some(record => record.meta.showAppMenu)
        next()
      })
    },
  })
</script>

<style lang="postcss">
  @import 'normalize.css';
  @import '@happy-plants/styles/dist/colors-next.css';
  @import '@happy-plants/styles/dist/fonts.css';
  @import '../styles/animations.css';
  @import '../styles/media-queries.css';

  :root {
    --base-radius: 2px;
    --base-gap: 15px;
    --app-header-height: 50px;
    --app-max-width: 375px;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--brand-beige);
    display: flex;
    justify-content: center;
    font-family: 'Asap', Open Sans, Helvetica, Arial, sans-serif;
    font-size: var(--text-size-base);
    font-weight: 400;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 140%;

    @media (--max-mobile-viewport) {
      align-items: center;
      height: 100vh;
    }
  }

  #app {
    width: 100vw;
    min-width: var(--app-max-width);
    min-height: 100vh;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
    position: relative;

    @media (--max-mobile-viewport) {
      overflow-x: hidden;
      max-width: var(--app-max-width);
      height: 812px;
      min-height: 812px;
      border-radius: 30px;
      box-shadow: 0 0 0 14px var(--brand-black-50), 0 0 0 10px var(--brand-black);
    }
  }

  .visuallyhidden:not(:focus):not(:active) {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }
</style>
