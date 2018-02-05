<template>
  <header>
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
          <feather-settings class="header-settings-icon" />
        </router-link>
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
      settings: { type: Boolean, default: false },
      scrollUp: { type: Boolean, default: false },
      color: { type: String, default: 'black' }
    },

    components: {
      'feather-arrow-left': () =>
          import('vue-feather-icon/components/arrow-left' /* webpackChunkName: "general" */),
      'feather-settings': () =>
          import('vue-feather-icon/components/settings' /* webpackChunkName: "general" */)
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

<style lang="postcss" scoped>
  @import "../styles/media-queries";

  header {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    background: var(--background-primary);
    max-height: var(--app-header-size);
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 2;

    & h1 {
      text-transform: uppercase;
      color: var(--text-color-base);
      margin: 0 var(--base-gap);
      padding: var(--base-gap) 0;
    }
  }

  .header-inner {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (--min-desktop-viewport) {
      width: var(--app-desktop-max-width);
      margin: 0 auto;
    }
  }

  .header-ctrl {
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

  .header-settings-icon {
    width: var(--icon-size-base);
    height: var(--icon-size-base);
  }
</style>
