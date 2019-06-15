<template>
  <div id="app">
    <app-notifications
      class="notifications"
      :message="message" />

    <better-dialog
      id="new-release-dialog"
      :show="showReleaseDialog"
      @close-dialog="emitCloseDialog">
      <template v-slot:headline>
        <span>
          A new release has been downloaded!
          <span class="headline-emoji">( ˘ ³˘)♥</span>
        </span>
      </template>

      <div>
        <p>
          Happy Plants {{ version }} introduces the following updates:
        </p>

        <md-changelog ref="releaseUpdates" />
      </div>
    </better-dialog>

    <router-view />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import Changelog from '#/CHANGELOG.md'
  import {
    getEntry as getSessionEntry,
    deleteEntry as deleteSessionEntry
  } from '@/api/sessionStorage'

  export default {
    name: 'HappyPlants',

    meta () {
      return {
        title: 'HappyPlants',
        titleTemplate: 'HappyPlants — %s',
        htmlAttrs: {
          'data-theme': this.theme
        }
      }
    },

    components: {
      'md-changelog': Changelog,
      'feather-refresh': () =>
        import('vue-feather-icons/icons/RefreshCwIcon' /* webpackChunkName: "icons" */)
    },

    data: () => ({
      applicationOnline: window && window.navigator && window.navigator.onLine,
      notificationTimeout: 2000,
      showReleaseDialog: false,
      dialog: null
    }),

    watch: {
      hasNewRelease (newRelease) {
        if (newRelease) {
          this.showReleaseDialog = true
        }
      },

      applicationOnline (online) {
        if (online === false && this.storageType === 'cloud') {
          this.showNotification({ message: 'You just went offline.' })
        }
      }
    },

    computed: {
      ...mapState({
        version: state => state.version,
        hasNewRelease: state => state.hasNewRelease,
        storageType: state => state.storage.type,
        authenticated: state => state.user.authenticated,
        theme: state => state.settings.theme,
        message: state => state.notification.message,
        pageTitle: state => state.appheader.title,
        transparent: state => state.appheader.transparent,
        iconColor: state => state.appheader.iconColor,
        backBtn: state => state.appheader.backBtn,
        backBtnPath: state => state.appheader.backBtnPath,
        rightBtn: state => state.appheader.rightBtn,
        rightBtnOnClick: state => state.appheader.rightBtnOnClick,
        showIconBackdrop: state => state.appheader.showIconBackdrop,
        plantsLoading: state => state.plants.loading,
        plantsLoaded: state => state.plants.finished
      })
    },

    methods: {
      ...mapActions([
        'updateAuthMethod',
        'authRedirectResults',
        'loadVersion',
        'updateVersion',
        'loadSettings',
        'updateStorage',
        'loadPlants',
        'loadTags',
        'showNotification',
        'hideNotification'
      ]),
      emitCloseDialog () {
        this.showReleaseDialog = false
      },
      setApplicationOnline () {
        this.applicationOnline = true
      },
      setApplicationOffline () {
        this.applicationOnline = false
      }
    },

    async created () {
      await this.loadVersion()
      await this.updateVersion()
      await this.loadSettings()

      if (getSessionEntry('USER_SIGNIN_PROGRESS')) {
        this.updateAuthMethod()
        deleteSessionEntry('USER_SIGNIN_PROGRESS')

        try {
          await this.authRedirectResults()
          await this.updateStorage({ type: 'cloud' })
        } catch (error) {
          this.showNotification()
        }
      }

      if (!this.applicationOnline && this.storageType === 'cloud') {
        this.showNotification({ message: 'You are currently offline.' })
      }

      await this.loadPlants()
      await this.loadTags()
    },

    mounted () {
      window.addEventListener('online', this.setApplicationOnline)
      window.addEventListener('offline', this.setApplicationOffline)
    },

    updated () {
      if (this.message) {
        setTimeout(this.hideNotification, this.notificationTimeout)
      }
    },

    beforeDestroy () {
      window.removeEventListener('online', this.setApplicationOnline)
      window.removeEventListener('offline', this.setApplicationOffline)
    }
  }
</script>

<style lang="postcss">
  @import 'normalize.css';
  @import '../styles/colors';
  @import '../styles/animations';
  @import '../styles/media-queries';
  @import '../styles/fonts';
  @import '../styles/typography';
  @import '../styles/layout';

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

  hr {
    border: none;
    border-top: 2px solid var(--border-color);
  }

  #app {
    width: 100vw;
    min-height: 100vh;
    height: 100%;
  }

  #new-release-dialog {
    & .headline-emoji {
      font-family: monospace;
      font-size: var(--text-size-xsmall);
      letter-spacing: -4px;
      display: inline-block;
    }

    & .happy-dialog-content section h1,
    & .happy-dialog-content section h1 ~ p,
    & .happy-dialog-content section h2,
    & .happy-dialog-content section h2:nth-of-type(2n) ~ * {
      display: none;
    }

    & .happy-dialog-content section {
      margin-top: calc(var(--base-gap) / 2);
    }

    & .happy-dialog-content section ul {
      padding-left: var(--double-gap);
      margin-bottom: calc(var(--base-gap) / 2);
    }

    & .happy-dialog-content section p,
    & .happy-dialog-content section h3 {
      margin-bottom: calc(var(--base-gap) / 2);
    }
  }

  .header-sync-data {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--app-header-size);
    min-height: var(--app-header-size);
    height: 100%;

    & svg {
      width: var(--icon-size-base);
      height: var(--icon-size-base);
      animation: rotate360 3s linear infinite;
    }
  }

  .notifications {
    z-index: 4;
  }

  .svg-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    color: inherit;
    vertical-align: middle;
  }
</style>
