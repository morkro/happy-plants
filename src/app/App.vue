<template>
  <div id="app">
    <app-notifications
      class="notifications"
      :message="message" />

    <app-header
      :show-notification="hasNewRelease"
      :scroll-up="true"
      :transparent="transparent"
      :color="iconColor"
      :settings="settingsBtn"
      :settings-on-click="settingsBtnOnClick"
      :back-button="backBtn"
      :back-path="backBtnPath"
      :show-icon-backdrop="showIconBackdrop">
      <h1 v-if="!!pageTitle" slot="title">
        {{ pageTitle }}
      </h1>
    </app-header>

    <router-view />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import AppHeader from '@/components/AppHeader'
  import AppNotifications from '@/components/AppNotifications'

  export default {
    name: 'HappyPlants',

    meta () {
      return {
        title: 'HappyPlants',
        htmlAttrs: {
          'data-theme': this.theme
        }
      }
    },

    components: {
      'app-notifications': AppNotifications,
      'app-header': AppHeader
    },

    data () {
      return {
        notificationTimeout: 2000
      }
    },

    computed: mapState({
      hasNewRelease: state => state.settings.hasNewRelease,
      theme: state => state.settings.theme,
      message: state => state.notification.message,
      pageTitle: state => state.appheader.title,
      transparent: state => state.appheader.transparent,
      iconColor: state => state.appheader.iconColor,
      backBtn: state => state.appheader.backBtn,
      backBtnPath: state => state.appheader.backBtnPath,
      settingsBtn: state => state.appheader.settingsBtn,
      settingsBtnOnClick: state => state.appheader.settingsBtnOnClick,
      showIconBackdrop: state => state.appheader.showIconBackdrop
    }),

    methods: {
      ...mapActions([
        'authenticateUser',
        'loadVersion',
        'updateVersion',
        'loadSettings',
        'loadStorage',
        'loadPlants',
        'loadTags',
        'hideNotification',
        'updateAppHeader'
      ])
    },

    async mounted () {
      await this.loadVersion()
      await this.updateVersion()
      await this.loadStorage()
      await this.authenticateUser()
      await this.loadSettings()
      await Promise.all([
        this.loadPlants(),
        this.loadTags()
      ])

      if (this.theme === 'dark') {
        this.updateAppHeader({ iconColor: 'white' })
      }
    },

    updated () {
      if (this.message) {
        setTimeout(this.hideNotification, this.notificationTimeout)
      }
    }
  }
</script>

<style lang="postcss">
  @import "normalize.css";
  @import "../styles/colors";
  @import "../styles/animations";
  @import "../styles/media-queries";
  @import "../styles/fonts";
  @import "../styles/typography";
  @import "../styles/forms";
  @import "../styles/layout";

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    justify-content: center;
    background: var(--background-secondary);

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
  }
</style>
