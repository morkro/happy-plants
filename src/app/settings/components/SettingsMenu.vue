<template>
  <ul>
    <li v-for="item in menu">
      <router-link :to="{ name: item.name }">
        <h2>{{ item.label }}</h2>
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

    data () {
      return {
        version: pkg.version,
        menu: [
          { label: 'Application Data', name: 'SettingsData' },
          { label: 'About', name: 'SettingsAbout' }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";
  @import "~styles/fonts";

  ul li {
    padding: $base-gap;
    display: flex;
    align-items: center;

    &:not(:last-child) {
      border-bottom: 3px solid rgba(0, 0, 0, 0.05);
    }

    a, &.menu-version {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    &.menu-version {
      font-size: 80%;
      color: $text-color-secondary;
    }
  }
</style>
