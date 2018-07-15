<template>
  <ul>
    <li v-for="(item, index) in menu" :key="index">
      <router-link :to="{ name: item.name }">
        <span>{{ item.label }}</span>
        <component :is="`feather-${item.icon}`" />
      </router-link>
    </li>
    <li class="menu-version">
      <span>Version</span><span>{{ version }}</span>
    </li>
  </ul>
</template>

<script>
  import pkg from '#/package.json'

  export default {
    name: 'SettingsMenu',

    components: {
      'feather-hash': () =>
        import('vue-feather-icons/icons/HashIcon' /* webpackChunkName: "icons" */),
      'feather-database': () =>
        import('vue-feather-icons/icons/DatabaseIcon' /* webpackChunkName: "icons" */),
      'feather-users': () =>
        import('vue-feather-icons/icons/UsersIcon' /* webpackChunkName: "icons" */)
    },

    data () {
      return {
        version: pkg.version,
        menu: [
          { label: 'Tags', name: 'SettingsTags', icon: 'hash' },
          { label: 'Plant Data', name: 'SettingsData', icon: 'database' },
          { label: 'About', name: 'SettingsAbout', icon: 'users' }
        ]
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

    & span {
      display: flex;
      align-items: center;

      & svg {
        margin-right: var(--base-gap);
        opacity: 0.5;
      }
    }
  }
</style>
