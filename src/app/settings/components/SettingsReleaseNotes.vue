<template>
  <div class="settings-release-notes">
    <md-changelog ref="changelog" />
  </div>
</template>

<script>
  import Changelog from '#/CHANGELOG.md'
  export default {
    name: 'SettingsReleaseNotes',

    components: {
      'md-changelog': Changelog
    },

    mounted () {
      const $linkNodes = this.$refs.changelog.$el.querySelectorAll('a[href]')
      if ($linkNodes) {
        for (const $link of $linkNodes) {
          $link.setAttribute('target', '_blank')
        }
      }
    }
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
      margin-bottom: var(--base-gap);
      background: var(--background-primary);
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
      padding-left: calc(2 * var(--base-gap));
    }
  }
</style>
