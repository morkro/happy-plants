<template>
  <div class="settings-about">
    <section class="about-intro box">
      <p>
        <strong>HappyPlants</strong> is all about organising,
        collecting all sorts of information,
        and adding notes to your little friends. Basically, creating your own plant database.
        <br><br>
        This app is a <em>progressive web application</em>
        build with <strong>Vue.js</strong>, <strong>Google Firebase</strong> and other great web technologies by
        <a href="http://moritz.berlin"
          target="_blank"
          rel="noopener">
          <strong>Moritz Kröger</strong>
        </a>.
        <br><br>
        The codebase is open source and availabe on
        <a href="https://github.com/morkro/happy-plants"
          target="_blank"
          rel="noopener">
          <feather-github />GitHub
        </a>.
      </p>
    </section>

    <section class="about-contrubtions box green">
      <h2>I want to make this better</h2>
      <em>
        Please, yes! Bugs? Feature requests? Other issues?<br>
        <a href="https://github.com/morkro/happy-plants"
          target="_blank"
          rel="noopener">
          <span><feather-heart /></span> Any contribution is very welcome!
        </a>
      </em>
    </section>

    <section class="about-credits">
      <div>
        <h2>Credits</h2>
        <p>
          Plant icons made by
          <a href="http://www.flaticon.com/authors/dimitry-miroliubov"
            target="_blank"
            rel="noopener">
            Dimitry Miroliubov
          </a>,
          licensed under CC 3.0.
        </p>
      </div>
      <div>
        <h2>License</h2>
        <a href="https://github.com/morkro/happy-plants/blob/master/LICENSE"
          target="_blank"
          rel="noopener">
          MIT
        </a>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'SettingsAbout',

    meta: {
      title: 'About HappyPlants'
    },

    components: {
      'feather-github': () =>
        import('vue-feather-icons/icons/GithubIcon' /* webpackChunkName: "icons" */),
      'feather-heart': () =>
        import('vue-feather-icons/icons/HeartIcon' /* webpackChunkName: "icons" */)
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../../../styles/media-queries";

  .settings-about {
    padding: var(--base-gap);
    line-height: 150%;

    & .box {
      padding: var(--base-gap);
      margin-bottom: var(--base-gap);
    }

    & h2 {
      margin-bottom: calc(var(--base-gap) / 2);
    }

    & svg {
      width: var(--icon-size-small);
      height: var(--icon-size-small);
      vertical-align: middle;
      margin-right: calc(var(--base-gap) / 3);
    }
  }

  .about-contrubtions {
    font-size: var(--text-size-small);

    & a {
      display: flex;
      align-items: center;
    }

    & a span {
      background: var(--background-primary);
      border-radius: 50%;
      padding: 4px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-right: calc(var(--base-gap) / 2);
    }

    & svg {
      stroke: var(--brand-red);
      margin-right: 0;
    }
  }

  .about-credits {
    & div {
      margin-bottom: calc(var(--base-gap) / 2);
    }
  }
</style>
