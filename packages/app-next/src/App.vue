<template>
  <div id="app">
    <transition>
      <app-notification v-if="notificationMessage" />
    </transition>
    <router-view />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { RootState } from './store'
  export default Vue.extend({
    name: 'HappyPlants',
    components: {
      'app-notification': () => import('@/modules/notifications/components/Notification.vue'),
    },
    computed: mapState({
      notificationMessage: (state: RootState) => state.notifications.message,
    }),
  })
</script>

<style lang="postcss">
  @import 'normalize.css';
  @import '@happy-plants/styles/dist/colors-next.css';
  @import '@happy-plants/styles/dist/fonts.css';
  @import 'shared/styles/animations.css';

  :root {
    --base-radius: 2px;
    --base-gap: 15px;
    --app-header-height: 50px;
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
    line-height: 120%;
  }

  #app {
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    display: flex;
    overflow-x: hidden;
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
