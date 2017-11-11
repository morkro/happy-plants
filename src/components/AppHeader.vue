<template>
  <header>
    <div class="header-ctrl">
      <router-link
        v-if="back"
        :to="backPath"
        :class="{ 'link-wrapper': true, 'backdrop': isWhite(color) }">
        <span hidden>Back</span>
        <feather-arrow-left :stroke="color" />
      </router-link>
      <slot name="custom-action-left"></slot>
    </div>

    <slot name="title"></slot>

    <div class="header-ctrl">
      <router-link
        v-if="settings"
        :to="{ path: '/settings' }"
        :class="{ 'link-wrapper': true, 'backdrop': isWhite(color) }">
        <span hidden>Settings</span>
        <feather-settings class="header-settings-icon" />
      </router-link>
      <slot name="custom-action-right"></slot>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader',

    props: {
      backPath: { type: [String, Object], default: '/' },
      back: { type: Boolean, default: false },
      settings: { type: Boolean, default: false },
      color: { type: String, default: 'black' }
    },

    components: {
      'feather-arrow-left': () => import('vue-feather-icon/components/arrow-left'),
      'feather-settings': () => import('vue-feather-icon/components/settings')
    },

    methods: {
      isWhite (color) {
        return color === 'white'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";
  @import "~styles/z-index";

  header {
    box-shadow: 0 0 22px rgba(0, 0, 0, 0.05);
    background: $background-primary;
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
      padding: $base-gap 0;
    }

    /* TODO: Remove when desktop layout is actually in development. */
    @media (min-width: $app-media-max-size) {
      width: $app-media-max-size;
    }
  }

  .header-ctrl {
    width: $app-header-size;
    min-height: $app-header-size;
    height: 100%;

    a {
      width: $app-header-size;
      min-height: $app-header-size;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .backdrop {
      position: relative;

      &::before {
        background: rgba(0, 0, 0, 0.22);
        border-radius: 50%;
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: $icon-size + $base-gap;
        height: $icon-size + $base-gap;
        transform: translate(-50%, -50%);
        z-index: -1;
      }
    }
  }

  .header-settings-icon {
    width: $icon-size;
    height: $icon-size;
  }
</style>
