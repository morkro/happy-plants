<template>
  <section>
    <p>
      Happy Plants is a progressive web application
      build with Vue.js and other great web technologies by
      <a href="http://moritz.berlin" target="_blank" rel="noopener">Moritz Kröger</a>.
      <br /><br />
      The codebase is open source and availabe on <a href="https://github.com/morkro/happy-plants" target="_blank" rel="noopener">GitHub</a>.
      Any contribution is very welcome!
    </p>
    <hr />
    <h2>Credits</h2>
    <p>
      Plant icons made by
      <a href="http://www.flaticon.com/authors/dimitry-miroliubov" target="_blank" rel="noopener">
        Dimitry Miroliubov
      </a>,
      licensed under CC 3.0.
    </p>
  </section>
</template>

<script>
  export default {
    name: 'SettingsAbout'
  }
</script>

<style lang="scss" scoped>
  section {
    padding: var(--base-gap);
    line-height: 150%;

    hr {
      margin: var(--base-gap) 0;
      border: none;
      border-top: 3px solid var(--transparency-black-light);
    }
  }
</style>
