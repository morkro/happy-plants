<template>
  <div class="settings-release-notes">
    <md-changelog ref="changelog" />
  </div>
</template>

<script>
  import Changelog from '#/CHANGELOG.md'
  import { mapActions } from 'vuex'
  export default {
    name: 'SettingsReleaseNotes',

    components: {
      'md-changelog': Changelog
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

    methods: mapActions([
      'updateAppHeader'
    ])
  }
</script>

<style lang="postcss">
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
