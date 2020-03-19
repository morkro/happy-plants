<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'HappyPlants',
  })
</script>

<style lang="postcss">
  @import 'normalize.css';
  @import '@happy-plants/styles/dist/colors-next.css';
  @import '@happy-plants/styles/dist/fonts.css';

  :root {
    --base-radius: 2px;
    --base-gap: 15px;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: var(--brand-beige);
    display: flex;
    justify-content: center;
    font-family: 'Asap', Open Sans, Helvetica, Arial, sans-serif;
    font-size: var(--text-size-base);
    font-weight: 400;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 100%;
  }

  #app {
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    display: flex;
  }
</style>
