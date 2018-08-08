<template>
  <ul class="settings-menu">
    <li v-for="(item, index) in menu" :key="index">
      <router-link :to="{ name: item.name }">
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
    </li>
    <li class="menu-theme">
      <span>Theme</span>
      <div>
        <v-button
          :color="getThemeButtonColor('light')"
          :class="getThemeButtonClass('light')"
          @click.native="emitThemeChange('light')">
          Light
        </v-button>
        <v-button
          :color="getThemeButtonColor('dark')"
          :class="getThemeButtonClass('dark')"
          @click.native="emitThemeChange('dark')">
          Dark
        </v-button>
      </div>
    </li>
    <li class="menu-version">
      <span>Version</span><span>{{ version }}</span>
    </li>
  </ul>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Button from '@/components/Button'

  export default {
    name: 'SettingsMenu',

    components: {
      'v-button': Button,
      'feather-tag': () =>
        import('vue-feather-icons/icons/TagIcon' /* webpackChunkName: "icons" */),
      'feather-database': () =>
        import('vue-feather-icons/icons/DatabaseIcon' /* webpackChunkName: "icons" */),
      'feather-users': () =>
        import('vue-feather-icons/icons/UsersIcon' /* webpackChunkName: "icons" */),
      'feather-file-text': () =>
        import('vue-feather-icons/icons/FileTextIcon' /* webpackChunkName: "icons" */)
    },

    data () {
      return {
        menu: [
          { label: 'Tags', name: 'SettingsTags', icon: 'tag' },
          { label: 'Plant Data', name: 'SettingsData', icon: 'database' },
          { label: 'About', name: 'SettingsAbout', icon: 'users' },
          {
            label: 'Release Notes',
            description: 'A new version has been released!',
            name: 'SettingsReleaseNotes',
            icon: 'file-text'
          }
        ]
      }
    },

    computed: mapState({
      version: state => state.version,
      hasNewRelease: state => state.settings.hasNewRelease,
      theme: state => state.settings.theme
    }),

    methods: {
      ...mapActions([
        'hasSeenNewRelease',
        'updateTheme',
        'updateAppHeader'
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
      }
    },

    beforeDestroy () {
      if (this.hasNewRelease) {
        this.hasSeenNewRelease()
      }
    }
  }
</script>

<style lang="postcss" scoped>
  ul li {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 2px solid var(--border-color);
    }

    & a {
      font-weight: 500;
      font-size: var(--text-size-medium);
      padding: var(--base-gap);

      &:focus {
        outline: none;
        background: var(--brand-green);
        color: var(--text-color-inverse);
      }

      &:focus svg {
        filter: invert(100%);
      }
    }

    & a,
    &.menu-version,
    &.menu-theme {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &.menu-version,
    &.menu-theme {
      font-size: 80%;
      color: var(--text-color-secondary);
      padding: var(--base-gap);
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

  ul li.menu-theme {
    border-bottom: none;
    padding-bottom: 0;

    & div {
      display: flex;
    }

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
</style>
