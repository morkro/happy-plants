<template>
  <app-wireframe>
    <app-header :back-button="true" back-path="/settings">
      <template v-slot:title>
        <h1>Release Notes</h1>
      </template>
    </app-header>

    <main-content>
      <v-button
        type="circle"
        class="release-scroll-up"
        aria-label="Scroll up"
        @click.native="onScrollTop">
        <template v-slot:icon>
          <feather-top />
        </template>
      </v-button>

      <md-changelog class="changelog" ref="changelog" />
    </main-content>
  </app-wireframe>
</template>

<script>
  import Changelog from '#/CHANGELOG.md'
  import scrollTop from '@/utils/scroll-top'

  export default {
    name: 'SettingsReleaseNotes',

    components: {
      'md-changelog': Changelog,
      'feather-top': () =>
        import('vue-feather-icons/icons/ArrowUpIcon' /* webpackChunkName: "icons" */)
    },

    mounted () {
      const $linkNodes = this.$refs.changelog.$el.querySelectorAll('a[href]')
      if ($linkNodes) {
        for (const $link of $linkNodes) {
          $link.setAttribute('target', '_blank')
        }
      }
    },

    methods: {
      onScrollTop () {
        scrollTop()
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .release-scroll-up {
    position: fixed;
    z-index: 2;
    bottom: var(--base-gap);
    left: 50%;
    transform: translateX(-50%);
  }

  .main-content {
    padding: var(--base-gap) 0;
    line-height: 150%;
  }

  .changelog {
    & h1 {
      display: none;
    }

    & h2 {
      padding: var(--base-gap);
      margin-top: calc(3 * var(--base-gap));
      margin-bottom: var(--base-gap);
      background: var(--background-primary);
      position: relative;

      &:nth-of-type(1) {
        background: var(--brand-green);
        color: var(--text-color-inverse);
      }
    }

    & h3 {
      font-size: var(--text-size-base);
    }

    & h3,
    & p,
    & ul {
      padding: 0 var(--base-gap);
      margin-bottom: var(--base-gap);
    }

    & ul {
      padding-left: var(--double-gap);
    }
  }
</style>
