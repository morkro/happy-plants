<template>
  <div class="settings-release-notes">
    <v-button
      type="circle"
      class="release-scroll-up"
      aria-label="Scroll up"
      @click.native="onScrollTop">
      <template v-slot:icon>
        <feather-top />
      </template>
    </v-button>

    <md-changelog ref="changelog" />
  </div>
</template>

<script>
  import Changelog from '#/CHANGELOG.md'
  import { mapActions } from 'vuex'
  import scrollTop from '@/utils/scroll-top'

  export default {
    name: 'SettingsReleaseNotes',

    components: {
      'md-changelog': Changelog,
      'feather-top': () =>
        import('vue-feather-icons/icons/ArrowUpIcon' /* webpackChunkName: "icons" */)
    },

    created () {
      this.updateAppHeader({
        title: 'Release Notes'
      })
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
      ...mapActions([
        'updateAppHeader'
      ]),
      onScrollTop () {
        scrollTop()
      }
    }
  }
</script>

<style lang="postcss">
  .release-scroll-up {
    position: fixed;
    z-index: 2;
    bottom: var(--base-gap);
    left: 50%;
    transform: translateX(-50%);
  }

  .settings-release-notes {
    padding: var(--base-gap) 0;
    line-height: 150%;

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
