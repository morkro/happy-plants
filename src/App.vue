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
  @import "./styles/typography";
  @import "./styles/buttons";

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
    width: 80vw;
    max-width: 1400px;
  }
</style>
