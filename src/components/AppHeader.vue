<template>
  <header :class="{ 'app-header': true, transparent }" role="banner">
    <div class="header-inner">
      <div class="header-ctrl">
        <router-link
          v-if="backButton"
          :to="backPath"
          :class="{ 'link-wrapper': true, 'backdrop': isWhite(color) }">
          <span hidden>Back</span>
          <feather-arrow-left :stroke="color" />
        </router-link>
        <slot name="custom-action-left" />
      </div>

      <div @click="scrollTop">
        <slot name="title" />
      </div>

      <div class="header-ctrl">
        <router-link
          v-if="settings"
          :to="{ path: '/settings' }"
          :class="{ 'link-wrapper': true, 'backdrop': isWhite(color) }">
          <span hidden>Settings</span>
          <component :is="`feather-${settingsIcon}`" class="header-settings-icon" />
        </router-link>
        <button
          v-else-if="settings === 'edit'"
          aria-label="Edit"
          :class="settingsClass"
          @click.prevent="settingsOnClick">
          <component :is="`feather-${settingsIcon}`" />
        </button>
        <slot name="custom-action-right" />
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader',

    props: {
      backPath: { type: [String, Object], default: '/' },
      backButton: { type: Boolean, default: false },
      settings: { type: [Boolean, String], default: false },
      settingsIcon: { type: String, default: 'settings' },
      settingsOnClick: { type: Function, default: () => {} },
      scrollUp: { type: Boolean, default: false },
      color: { type: String, default: 'black' },
      transparent: { type: Boolean, default: false }
    },

    components: {
      'feather-arrow-left': () =>
          import('vue-feather-icon/components/arrow-left' /* webpackChunkName: "general" */),
      'feather-settings': () =>
          import('vue-feather-icon/components/settings' /* webpackChunkName: "general" */),
      'feather-edit': () =>
        import('vue-feather-icon/components/edit-2' /* webpackChunkName: "plant" */)
    },

    computed: {
      settingsClass () {
        return {
          'edit-data': true,
          'icon': true,
          'inverse': !this.isWhite(this.color),
          'backdrop': this.isWhite(this.color)
        }
      }
    },

    methods: {
      isWhite (color) {
        return color === 'white'
      },
      scrollTop () {
        if (this.scrollUp === false) return

        const duration = 222
        const cosParameter = window.scrollY / 2
        let count = 0
        let oldTimestamp = performance.now()

        function step (newTimestamp) {
          count += Math.PI / (duration / (newTimestamp - oldTimestamp))

          if (count >= Math.PI) window.scrollTo(0, 0)
          if (window.scrollY === 0) return

          window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(count)))
          oldTimestamp = newTimestamp
          window.requestAnimationFrame(step)
        }

        window.requestAnimationFrame(step)
      }
    }
  }
</script>

<style lang="postcss">
  @import "../styles/media-queries";

  .app-header {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    background: var(--background-primary);
    max-height: var(--app-header-size);
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 2;
    transition:
      background calc(var(--base-speed) * 2) var(--ease-out-back),
      box-shadow var(--base-speed) var(--ease-out-back);

    & h1 {
      text-transform: uppercase;
      color: var(--text-color-base);
      margin: 0 var(--base-gap);
      padding: var(--base-gap) 0;
    }

    &.transparent {
      background: transparent;
      box-shadow: none;
      transition:
        background calc(var(--base-speed) * 2) var(--ease-out-back),
        box-shadow var(--base-speed) var(--ease-out-back);
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

  .app-header .header-ctrl {
    width: var(--app-header-size);
    min-height: var(--app-header-size);
    height: 100%;

    & a {
      width: var(--app-header-size);
      min-height: var(--app-header-size);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & .backdrop {
      position: relative;

      &::before {
        background: rgba(0, 0, 0, 0.22);
        border-radius: 50%;
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(var(--icon-size-base) * 2.5);
        height: calc(var(--icon-size-base) * 2.5);
        transform: translate(-50%, -50%);
        z-index: -1;
      }
    }
  }

  .app-header .header-settings-icon {
    width: var(--icon-size-base);
    height: var(--icon-size-base);
  }
</style>
