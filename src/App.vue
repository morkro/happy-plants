<template>
  <div id="app">
    <h1>Happy Plants 🌵</h1>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'happy-plants'
  }
</script>

<style src="../node_modules/normalize.css/normalize.css"></style>
<style lang="scss">
  @import "./styles/typography.scss";

  // General
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-weight: 400;
    text-rendering: geometricPrecision;
    // Enable best font rendering
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
