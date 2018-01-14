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

    <div @click="scrollTop">
      <slot name="title"></slot>
    </div>

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

<style lang="scss" scoped>
  @import "~styles/z-index";

  header {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    background: var(--background-primary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: var(--app-header-size);
    width: 100%;
    position: fixed;
    top: 0;
    z-index: z($page-elements, header);

    h1 {
      text-transform: uppercase;
      color: var(--text-color-base);
      margin: 0 var(--base-gap);
      padding: var(--base-gap) 0;
    }

    /* TODO: Remove when desktop layout is actually in development. */
    @media (min-width: var(--app-media-max-size)) {
      width: var(--app-media-max-size);
    }
  }

  .header-ctrl {
    width: var(--app-header-size);
    min-height: var(--app-header-size);
    height: 100%;

    a {
      width: var(--app-header-size);
      min-height: var(--app-header-size);
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
        width: calc(var(--icon-size-base) + var(--base-gap));
        height: calc(var(--icon-size-base) + var(--base-gap));
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
