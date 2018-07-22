<template>
  <ul>
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
    <li class="menu-version">
      <span>Version</span><span>{{ version }}</span>
    </li>
  </ul>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'SettingsMenu',

    components: {
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
      hasNewRelease: state => state.settings.hasNewRelease
    }),

    methods: {
      ...mapActions(['hasSeenNewRelease']),
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
</script>—

<style lang="postcss" scoped>
  ul li {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 3px solid rgba(0, 0, 0, 0.05);
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
    &.menu-version {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &.menu-version {
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
</style>
