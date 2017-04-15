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

<style lang="scss">
  @import "../node_modules/normalize.css/normalize";
  @import "./styles/fonts";
  @import "./styles/typography";
  @import "./styles/forms";
  @import "./styles/buttons";
  @import "./styles/header";

  // General
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    justify-content: center;
  }

  #app {
    width: 100vw;
    max-width: 1400px;
    height: 100vh;
  }
</style>
