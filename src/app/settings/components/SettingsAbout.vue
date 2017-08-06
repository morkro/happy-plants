<template>
  <section>
    <p>
      Happy Plants is a progressive web application
      build with Vue.js and other great web technologies by
      <a href="http://moritz.berlin" target="_blank">Moritz Kröger</a>.
      <br /><br />
      The codebase is open source and availabe on <a href="https://github.com/morkro/happy-plants" target="_blank">GitHub</a>.
      Any contribution is very welcome!
    </p>
  </section>
</template>

<script>
  export default {
    name: 'SettingsAbout'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  section {
    padding: $base-gap;
    line-height: 150%;

    a {
      color: $text-color-special;
    }
  }
</style>
