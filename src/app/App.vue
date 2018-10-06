<template>
  <div id="app">
    <app-notifications
      class="notifications"
      :message="message" />

    <app-header
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

    <app-dialog
      id="new-release-dialog"
      app-root=".main-wireframe"
      class="app-dialog"
      :show="showReleaseDialog"
      @close-dialog="emitCloseDialog">
      <span slot="headline">
        A new release has been downloaded!
        <span class="headline-emoji">( ˘ ³˘)♥</span>
      </span>

      <div>
        <p>
          Happy Plants {{ version }} introduces the following updates:
        </p>

        <md-changelog ref="releaseUpdates" />
      </div>
    </app-dialog>

    <router-view />
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import Changelog from '#/CHANGELOG.md'
  import AppHeader from '@/components/AppHeader'
  import AppNotifications from '@/components/AppNotifications'
  import HappyDialog from '@/components/HappyDialog'
  import {
    getEntry as getSessionEntry,
    deleteEntry as deleteSessionEntry
  } from '@/api/sessionStorage'

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
      'app-header': AppHeader,
      'app-dialog': HappyDialog,
      'md-changelog': Changelog
    },

    data () {
      return {
        notificationTimeout: 2000,
        showReleaseDialog: false
      }
    },

    watch: {
      hasNewRelease (newRelease) {
        if (newRelease) {
          this.showReleaseDialog = true
        }
      }
    },

    computed: mapState({
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
      settingsBtn: state => state.appheader.settingsBtn,
      settingsBtnOnClick: state => state.appheader.settingsBtnOnClick,
      showIconBackdrop: state => state.appheader.showIconBackdrop
    }),

    methods: {
      ...mapActions([
        'updateAuthMethod',
        'authRedirectResults',
        'authenticateUser',
        'loadVersion',
        'updateVersion',
        'loadSettings',
        'loadStorage',
        'updateStorage',
        'loadPlants',
        'loadTags',
        'showNotification',
        'hideNotification',
        'updateAppHeader'
      ]),
      emitCloseDialog () {
        this.showReleaseDialog = false
      }
    },

    async created () {
      await this.loadVersion()
      await this.updateVersion()
      await this.loadStorage()
      await this.updateStorage({ type: this.storageType })
      await this.loadSettings()

      if (getSessionEntry('USER_SIGNIN_PROGRESS')) {
        this.updateAuthMethod()
        deleteSessionEntry('USER_SIGNIN_PROGRESS')
        try {
          await this.authRedirectResults()
        } catch (error) {
          this.showNotification()
        }
      // If not, we just want a regular authentication observer.
      } else if (this.storageType === 'cloud') {
        try {
          await this.authenticateUser()
        } catch (error) {
          this.$router.push('/intro')
        }
      }

      await this.loadPlants()
      await this.loadTags()

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

  #new-release-dialog {
    & .headline-emoji {
      font-family: monospace;
      font-size: var(--text-size-xsmall);
      letter-spacing: -4px;
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
      padding-left: calc(2 * var(--base-gap));
      margin-bottom: calc(var(--base-gap) / 2);
    }

    & .happy-dialog-content section p,
    & .happy-dialog-content section h3 {
      margin-bottom: calc(var(--base-gap) / 2);
    }
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
