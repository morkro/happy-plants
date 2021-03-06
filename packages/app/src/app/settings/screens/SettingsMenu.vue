<template>
  <div class="settings-menu">
    <better-dialog
      id="settings-happy-dialog"
      :show="showLoginDialog"
      @close-dialog="closeLoginDialog"
    >
      <template v-slot:headline>
        <span>Select login</span>
      </template>

      <auth-provider-list
        :loading="authFromRedirect"
        :disabled="disabled"
        @provider-selected="loginUser"
      />
    </better-dialog>

    <ul class="settings-menu-list">
      <li
        v-for="category in menu"
        :key="category.label"
      >
        <h3>{{ category.label }}</h3>

        <ul class="settings-submenu">
          <li
            v-for="(item, index) in category.children"
            :key="index"
            :class="`menu-${item.label.toLowerCase()}`"
          >
            <router-link v-if="item.type === 'link'" :to="{ name: item.name }">
              <div class="menu-item-text">
                <span>{{ item.label }}</span>
                <span v-if="hasReleaseUpdates(item)" class="description">
                  {{ item.description }}
                </span>
              </div>
              <div :class="['menu-icon', { highlight: hasReleaseUpdates(item) }]">
                <component :is="`feather-${item.icon}`" />
              </div>
            </router-link>

            <div v-else-if="item.type === 'button'">
              <span>{{ item.label }}</span>
              <div v-if="item.buttons">
                <v-button
                  v-for="(option, btnIndex) in item.buttons"
                  :key="btnIndex"
                  type="small"
                  :color="getThemeButtonColor(option.option)"
                  :class="getThemeButtonClass(option.option)"
                  @click.native="emitThemeChange(option.option)"
                >
                  {{ option.label }}
                </v-button>
              </div>
            </div>
          </li>
        </ul>
      </li>

      <li>
        <h3>User</h3>

        <ul class="settings-submenu">
          <li class="menu-user">
            <div v-if="authenticated">
              <span>
                <strong>{{ userName }}</strong>
                <span v-if="userEmail">{{ userEmail }}</span>
              </span>
              <div>
                <v-button
                  type="small"
                  :loading="logOutProgress"
                  :disabled="logOutProgress"
                  @click.native="logOutUser"
                >
                  Logout
                </v-button>
              </div>
            </div>
            <div v-else class="user-logged-out">
              <span>
                Login with your account.
              </span>
              <div>
                <v-button type="small" @click.native="openLoginDialog">
                  Login
                </v-button>
              </div>
            </div>
          </li>
        </ul>
      </li>

      <li class="menu-version">
        <span>Version</span><span>{{ version }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import getMenuData from '@/app/settings/utils/get-menu-data'

  export default {
    name: 'SettingsMenu',

    components: {
      'feather-tag': () =>
        import('vue-feather-icons/icons/TagIcon' /* webpackChunkName: "icons" */),
      'feather-database': () =>
        import('vue-feather-icons/icons/DatabaseIcon' /* webpackChunkName: "icons" */),
      'feather-save': () =>
        import('vue-feather-icons/icons/SaveIcon' /* webpackChunkName: "icons" */),
      'feather-users': () =>
        import('vue-feather-icons/icons/UsersIcon' /* webpackChunkName: "icons" */),
      'feather-file-text': () =>
        import('vue-feather-icons/icons/FileTextIcon' /* webpackChunkName: "icons" */),
      'feather-twitter': () =>
        import('vue-feather-icons/icons/TwitterIcon' /* webpackChunkName: "icons" */),
      'feather-google': () =>
        import('vue-feather-icons/icons/ChromeIcon' /* webpackChunkName: "icons" */),
      'feather-github': () =>
        import('vue-feather-icons/icons/GithubIcon' /* webpackChunkName: "icons" */)
    },

    data: () => ({
      signInProgress: false,
      logOutProgress: false,
      showLoginDialog: false,
      menu: getMenuData()
    }),

    computed: {
      ...mapState({
        storageType: state => state.storage.type,
        authenticated: state => state.user.authenticated,
        authFromRedirect: state => state.user.authFromRedirect,
        authProgress: state => state.user.loading,
        userName: state => state.user.name,
        userEmail: state => state.user.email,
        version: state => state.version,
        hasNewRelease: state => state.hasNewRelease,
        theme: state => state.settings.theme
      }),
      disabled () {
        return (
          this.authFromRedirect ||
          this.authProgress ||
          this.signInProgress
        )
      }
    },

    methods: {
      ...mapActions([
        'hasSeenNewRelease',
        'updateTheme',
        'updateAppHeader',
        'signOutUser',
        'signInUser',
        'updateStorage',
        'showNotification'
      ]),
      getThemeButtonColor (type) {
        if (this.theme !== type) {
          return 'plain'
        }
      },
      getThemeButtonClass (type) {
        return { active: this.theme === type }
      },
      emitThemeChange (theme) {
        const $html = document.documentElement
        $html.classList.add('js-theme-in-transition')
        this.updateTheme({ theme })
          .then(() => setTimeout(() =>
            $html.classList.remove('js-theme-in-transition'),
            1000
          ))

        this.updateAppHeader({
          iconColor: theme === 'light' ? 'black' : 'white'
        })
      },
      hasReleaseUpdates (item) {
        return (
          item.name === 'SettingsReleaseNotes' &&
          item.description &&
          this.hasNewRelease
        )
      },
      async logOutUser () {
        this.logOutProgress = true
        await this.updateStorage({ type: 'local' })
        await this.signOutUser()
        this.logOutProgress = false
        this.$router.push('/')
      },
      async loginUser (provider) {
        this.signInProgress = true
        await this.updateStorage({ type: 'cloud' })
        try {
          await this.signInUser(provider)
        } catch (error) {
          this.showNotification()
          return
        }
        this.signInProgress = false
      },
      openLoginDialog () {
        this.showLoginDialog = true
      },
      closeLoginDialog () {
        this.showLoginDialog = false
      }
    },

    beforeDestroy () {
      if (this.hasNewRelease) {
        this.hasSeenNewRelease()
      }
    }
  }
</script>

<style lang="postcss">
  #settings-happy-dialog .auth-provider-list button {
    margin-top: 0;
  }

  .settings-menu-list {
    list-style: none;

    & > li {
      & h3 {
        padding: calc(var(--base-gap) / 2) var(--base-gap);
        color: var(--text-color-secondary);
      }

      &.menu-version {
        font-size: var(--text-size-xsmall);
        color: var(--text-color-secondary);
        padding: var(--base-gap);
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .settings-submenu li {
    display: flex;
    align-items: center;
    background: var(--background-primary);

    @nest [data-theme="dark"] & {
      --border-color: var(--background-secondary);
    }

    &:not(:last-child) {
      border-bottom: 2px solid var(--border-color);
    }

    & a,
    & > div {
      font-weight: 500;
      font-size: var(--text-size-medium);
      padding: var(--base-gap);
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:focus {
        outline: none;
        background: var(--brand-green);
        color: var(--text-color-inverse);
      }

      &:focus svg {
        filter: invert(100%);
      }
    }

    & svg {
      transform: scale(0.8);
    }

    & .menu-item-text {
      display: flex;
      align-items: flex-start;
      flex-direction: column;

      & .description {
        font-size: var(--text-size-xsmall);
        font-weight: 400;
        display: block;
        margin-top: calc(var(--base-gap) / 3);
        color: var(--text-color-secondary);
      }
    }

    & .menu-icon {
      position: relative;
    }

    & .menu-icon.highlight::after {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--brand-red);
      box-shadow: 0 0 6px var(--brand-red);
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .menu-theme,
  .menu-user {
    border-bottom: none;
    padding-bottom: 0;

    & div {
      display: flex;
      font-size: var(--text-size-xsmall);
    }
  }

  .menu-theme {
    & button.active {
      font-weight: 500;
    }

    & button:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    & button:last-of-type {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .menu-user span {
    font-size: var(--text-size-xsmall);
    word-break: break-all;

    @nest .menu-user > div > & {
      padding-right: var(--base-gap);
    }

    & strong {
      display: block;
    }

    & span {
      font-weight: 400;
      color: var(--text-color-secondary);
    }
  }
</style>
