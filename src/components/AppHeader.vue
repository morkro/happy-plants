<template>
  <header :class="{ 'app-header': true, transparent }" role="banner">
    <div class="header-inner">
      <div class="header-ctrl">
        <router-link
          v-if="backButton"
          :to="backPath"
          :class="{ 'link-wrapper': true, 'backdrop': showIconBackdrop }"
          aria-label="Back"
        >
          <feather-arrow-left :stroke="color" />
        </router-link>
        <slot name="custom-action-left" />
      </div>

      <div class="header-title" @click="onScrollTop">
        <slot name="title" />
      </div>

      <div class="header-ctrl">
        <router-link
          v-if="rightButton === 'settings'"
          :to="{ path: '/settings' }"
          :class="{ 'link-wrapper': true, 'backdrop': showIconBackdrop }"
          aria-label="Settings"
        >
          <div :class="['header-settings-icon', { 'highlight': showNotification }]">
            <feather-settings />
          </div>
        </router-link>
        <v-button
          v-else-if="typeof rightButton === 'string' && rightButton !== false"
          :aria-label="rightButton"
          :class="rightButtonClass"
          @click.native.prevent="rightButtonOnClick"
        >
          <template v-slot:icon>
            <component :is="`feather-${rightButton}`" />
          </template>
        </v-button>
        <slot name="custom-action-right" />
      </div>
    </div>
  </header>
</template>

<script>
  import scrollTop from '@/utils/scroll-top'
  export default {
    name: 'AppHeader',

    props: {
      backPath: { type: [String, Object], default: '/' },
      backButton: { type: Boolean, default: false },
      rightButton: { type: [Boolean, String], default: false },
      rightButtonOnClick: { type: Function, default: () => {} },
      showIconBackdrop: { type: Boolean, default: false },
      scrollUp: { type: Boolean, default: false },
      color: { type: String, default: 'black' },
      transparent: { type: Boolean, default: false },
      showNotification: { type: Boolean, default: false }
    },

    components: {
      'feather-arrow-left': () =>
        import('vue-feather-icons/icons/ArrowLeftIcon' /* webpackChunkName: "icons" */),
      'feather-settings': () =>
        import('vue-feather-icons/icons/SettingsIcon' /* webpackChunkName: "icons" */),
      'feather-edit': () =>
        import('vue-feather-icons/icons/Edit2Icon' /* webpackChunkName: "icons" */),
      'feather-close': () =>
        import('vue-feather-icons/icons/XIcon' /* webpackChunkName: "icons" */)
    },

    computed: {
      rightButtonClass () {
        return {
          'edit-data': true,
          'icon': true,
          'inverse': !this.isWhite(this.color),
          'backdrop': this.showIconBackdrop
        }
      }
    },

    methods: {
      isWhite (color) {
        return color === 'white'
      },
      onScrollTop () {
        if (this.scrollUp === false) return

        scrollTop()
      }
    }
  }
</script>

<style lang="postcss">
  @import "../styles/media-queries";

  .app-header {
    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.1);
    background: var(--background-primary);
    max-height: var(--app-header-size);
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
    transition:
      background calc(var(--base-speed) * 2) var(--ease-out-back),
      box-shadow var(--base-speed) var(--ease-out-back);

    & h1 {
      text-transform: uppercase;
      color: var(--text-color-base);
      padding: var(--base-gap) 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &.transparent {
      background: transparent;
      box-shadow: none;
      transition:
        background calc(var(--base-speed) * 2) var(--ease-out-back),
        box-shadow var(--base-speed) var(--ease-out-back);

      & h1 {
        color: var(--text-color-inverse);
      }
    }

    & .edit-data {
      position: relative;
      width: var(--app-header-size);
      min-height: var(--app-header-size);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.transparent svg {
      margin: 0;
      width: var(--icon-size-base);
      height: var(--icon-size-base);
      stroke: var(--text-color-button);
    }

    &.transparent svg polygon {
      stroke: var(--text-color-button);
    }
  }

  .app-header .header-inner {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (--min-desktop-viewport) {
      width: var(--app-desktop-max-width);
      margin: 0 auto;
    }
  }

  .app-header .header-title {
    flex-shrink: 1;
    overflow: hidden;
    padding: 0 var(--base-gap);
  }

  .app-header .header-ctrl {
    display: flex;
    min-width: var(--app-header-size);
    min-height: var(--app-header-size);
    height: 100%;

    & .backdrop::before,
    & a:focus::before {
      border-radius: 50%;
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: calc(var(--icon-size-base) * 2);
      height: calc(var(--icon-size-base) * 2);
      transform: translate(-50%, -50%);
      z-index: -1;
    }

    & .backdrop::before {
      background: rgba(0, 0, 0, 0.4);
    }

    & a,
    & button {
      color: var(--text-color-base);
      width: var(--app-header-size);
      min-height: var(--app-header-size);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background: transparent;
      box-shadow: none;

      &:focus {
        outline: none;
      }

      &:focus::before {
        background: var(--transparency-black-light);
      }
    }

    & button:focus::after {
      opacity: 0;
    }
  }

  .app-header .header-settings-icon {
    position: relative;
    width: var(--icon-size-base);
    height: var(--icon-size-base);

    &.highlight::after {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--brand-red);
      box-shadow: 0 0 6px var(--brand-red);
      position: absolute;
      top: -3px;
      right: -1px;
    }

    & svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
