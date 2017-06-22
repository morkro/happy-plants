<template>
  <header>
    <div class="header-ctrl">
      <router-link v-if="back" :to="backPath" class="link-wrapper">
        <svg-icon icon="left-arrow" width="20" height="20" color="#000000"></svg-icon>
      </router-link>
      <slot name="custom-action-left"></slot>
    </div>

    <slot name="title"></slot>

    <div class="header-ctrl">
      <router-link v-if="settings" :to="{ path: '/settings' }" class="link-wrapper">
        <svg-icon icon="settings" width="20" height="20" color="#000000"></svg-icon>
      </router-link>
      <slot name="custom-action-right"></slot>
    </div>
  </header>
</template>

<script>
  import '@/assets/left-arrow'
  import '@/assets/settings'

  export default {
    name: 'AppHeader',
    props: {
      backPath: { type: String, default: '/' },
      back: { type: Boolean, default: false },
      settings: { type: Boolean, default: false }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";
  @import "~styles/z-index";

  header {
    background: $background-primary;
    padding: $base-gap;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: $app-header-size;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: z($page-elements, header);

    h1 {
      text-transform: uppercase;
      color: $text-color-base;
      margin: 0 $base-gap;
    }

    svg {
      width: $icon-size;
      height: $icon-size;
      fill: $link-color;
    }
  }

  .header-ctrl {
    width: $icon-size;
    height: $icon-size;
  }
</style>
