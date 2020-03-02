<template>
  <header id="app-header" role="banner">
    <div class="app-header-inner">
      <div class="app-header-logo">
        <img
          src="~/assets/happyplants-logo.svg"
          alt="HappyPlants logo"
          title="HappyPlants logo"
        >
      </div>

      <nav role="navigation">
        <ul>
          <li>
            <a ref="appChangelogEl" class="app-changelog">
              Changelog
              <div class="app-changelog-dot" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
  export default {
    data: () => ({
      appVersion: '1.7.3'
    }),
    mounted () {
      if ('Headway' in window && process.env.HEADWAY_ACCOUNT) {
        window.Headway.init({
          selector: '.app-changelog-dot',
          trigger: '.app-changelog',
          account: process.env.HEADWAY_ACCOUNT,
          enabled: true
        })
      } else {
        const $changelog = this.$refs.appChangelogEl
        $changelog.setAttribute('href', 'https://headwayapp.co/happyplants-changelog')
        $changelog.setAttribute('target', '_blank')
        $changelog.setAttribute('rel', 'noopener')
      }
    }
  }
</script>


<style lang="postcss" scoped>
  @custom-media --small-viewport (max-width: 600px);

  #app-header {
    width: 100vw;
    position: absolute;
    z-index: 1;
    background:
      linear-gradient(
        180deg,
        var(--brand-green) 0%,
        transparent 100%
      );

    & .app-header-inner {
      width: 100%;
      max-width: var(--max-page-width);
      margin: 0 auto;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: var(--base-gap);
      padding-bottom: 0;

      @media (--small-viewport) {
        flex-direction: column;
        align-items: center;
      }
    }

    & .app-header-logo {
      width: 320px;
      position: relative;

      & img {
        width: 100%;
        height: auto;
      }
    }

    & a {
      color: var(--text-color-inverse);
      display: flex;
      padding: calc(var(--base-gap) / 4) 0;
      cursor: pointer;
      font-weight: 500;
    }

    & nav {
      padding-top: calc(var(--base-gap) / 2);
      padding-right: calc(var(--base-gap) / 2);

      @media (--small-viewport) {
        display: none;
      }
    }

    & ul {
      list-style: none;
    }

    & .app-changelog {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
