<template>
  <ul>
    <li v-for="item in menu">
      <router-link :to="{ name: item.name }">
        <h2>{{ item.label }}</h2>
        <feather-arrow-right />
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
      'feather-arrow-right': () =>
        import('vue-feather-icon/components/arrow-right' /* webpackChunkName: "settings" */)
    },

    data () {
      return {
        version: pkg.version,
        menu: [
          // { label: 'Account', name: 'SettingsAccount' },
          { label: 'Categories', name: 'Categories' },
          { label: 'Plant Data', name: 'SettingsData' },
          { label: 'About', name: 'SettingsAbout' }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  ul li {
    padding: var(--base-gap);
    display: flex;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 3px solid rgba(0, 0, 0, 0.05);
    }

    a,
    &.menu-version {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &.menu-version {
      font-size: 80%;
      color: var(--text-color-secondary);
    }

    svg {
      transform: scale(0.8);
    }
  }
</style>
