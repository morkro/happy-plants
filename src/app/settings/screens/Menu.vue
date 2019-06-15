<template>
  <app-wireframe>
    <app-header :back-button="true">
      <template v-slot:title>
        <h1>Settings</h1>
      </template>
    </app-header>

    <main-content>
      <div class="settings-menu">
        <ul class="settings-menu-list">
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
                    <v-button type="small" @click.native="logOutUser">
                      Logout
                    </v-button>
                  </div>
                </div>
                <div v-else class="user-logged-out">
                  <span>
                    Login with your account.
                  </span>
                  <div>
                    <v-button type="small" @click.native="logInUser">
                      Login
                    </v-button>
                  </div>
                </div>
              </li>
            </ul>
          </li>

          <li
            v-for="category in menu"
            :key="category.label">
            <h3>{{ category.label }}</h3>

            <ul class="settings-submenu">
              <li
                v-for="(item, index) in category.children"
                :key="index"
                :class="`menu-${item.label.toLowerCase()}`">
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
                      v-for="(option, index) in item.buttons"
                      :key="index"
                      type="small"
                      :color="getThemeButtonColor(option.option)"
                      :class="getThemeButtonClass(option.option)"
                      @click.native="emitThemeChange(option.option)">
                      {{ option.label }}
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
    </main-content>
  </app-wireframe>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import getMenuData from '@/app/settings/utils/get-menu-data'
  import sleep from '@/utils/sleep'

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
        import('vue-feather-icons/icons/FileTextIcon' /* webpackChunkName: "icons" */)
    },

    data: () => ({
      menu: getMenuData()
    }),

    computed: {
      ...mapState({
        storageType: state => state.storage.type,
        authenticated: state => state.user.authenticated,
        userName: state => state.user.name,
        userEmail: state => state.user.email,
        version: state => state.version,
        hasNewRelease: state => state.hasNewRelease,
        theme: state => state.settings.theme
      })
    },

    methods: {
      ...mapActions([
        'hasSeenNewRelease',
        'updateTheme'
      ]),
      getThemeButtonColor (type) {
        if (this.theme !== type) {
          return 'plain'
        }
      },
      getThemeButtonClass (type) {
        return { active: this.theme === type }
      },
      async emitThemeChange (theme) {
        const $html = document.documentElement
        $html.classList.add('js-theme-in-transition')
        await this.updateTheme({ theme })
        await sleep(1000)
        $html.classList.remove('js-theme-in-transition')
      },
      hasReleaseUpdates (item) {
        return (
          item.name === 'SettingsReleaseNotes' &&
          item.description &&
          this.hasNewRelease
        )
      },
      logOutUser () {
        this.$router.push('/logout')
      },
      logInUser () {
        this.$router.push('/login')
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
