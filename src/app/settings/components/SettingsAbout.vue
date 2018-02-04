<template>
  <section>
    <p>
      <strong>HappyPlants</strong> is all about organising,
      collecting all sorts of information and trivia,
      and adding notes to your little friends. Basically, creating your own plant database.
      <br /><br />
      This app is a <em>progressive web application</em>
      build with Vue.js and other great web technologies by
      <a href="http://moritz.berlin" target="_blank" rel="noopener"><strong>Moritz Kröger</strong></a>.
      <br /><br />
      The codebase is open source and availabe on
      <a href="https://github.com/morkro/happy-plants" target="_blank" rel="noopener">
        <feather-github />GitHub
      </a>.
    </p>

    <div class="contrubtion-section">
      <em>
        Bugs? Feature requests? Any other issues?
        Please reach out to me (Email, GitHub, ...).<br />
        <feather-heart /> Any contribution is very welcome!
      </em>
    </div>

    <h2>Credits</h2>
    <p>
      Plant icons made by
      <a href="http://www.flaticon.com/authors/dimitry-miroliubov" target="_blank" rel="noopener">
        Dimitry Miroliubov
      </a>,
      licensed under CC 3.0.
    </p>
    <hr />

    <h2>License</h2>
    <a href="https://github.com/morkro/happy-plants/blob/master/LICENSE" target="_blank" rel="noopener">
      MIT
    </a>
  </section>
</template>

<script>
  export default {
    name: 'SettingsAbout',

    components: {
      'feather-github': () =>
        import('vue-feather-icon/components/github' /* webpackChunkName: "settings" */),
      'feather-heart': () =>
        import('vue-feather-icon/components/heart' /* webpackChunkName: "settings" */)
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../../../styles/media-queries";

  section {
    padding: var(--base-gap);
    line-height: 150%;

    & h2 {
      margin-bottom: var(--base-gap);
    }

    & hr {
      margin: var(--base-gap) 0;
      border: none;
      border-top: 3px solid var(--transparency-black-light);
    }

    & svg {
      width: var(--icon-size-small);
      height: var(--icon-size-small);
      vertical-align: middle;
      margin-right: calc(var(--base-gap) / 3);
    }
  }

  .contrubtion-section {
    background: var(--background-primary);
    margin: var(--base-gap) 0;
    padding: var(--base-gap);
    width: 100vw;
    transform: translateX(calc(-1 * var(--base-gap)));
    font-size: var(--text-size-small);

    @media (--min-desktop-viewport) {
      width: 100%;
      transform: none;
    }

    & svg {
      stroke: var(--brand-red);
      margin-right: 0;
      transform: translateY(-2px);
    }
  }
</style>
