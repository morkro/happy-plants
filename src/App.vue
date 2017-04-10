<template>
  <div id="app">
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
    display: flex;
    justify-content: center;
  }

  #app {
    width: 80vw;
    max-width: 1400px;
  }
</style>
