<template>
  <div>
    <a id="skiptocontent" href="#app-content">
      Skip to main content
    </a>

    <app-header />

    <main id="app-content" role="main">
      <nuxt />
    </main>

    <app-footer />
  </div>
</template>

<style lang="postcss">
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: var(--font-family);
    font-size: var(--text-size-base);
    font-weight: 500;
    color: var(--text-color-base);
    line-height: 150%;
    text-rendering: geometricPrecision;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    background: var(--background-primary);
  }

  picture {
    display: block;
  }

  img {
    vertical-align: middle;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  #skiptocontent {
    height: 1px;
    width: 1px;
    position: absolute;
    overflow: hidden;
    top: -10px;
  }
</style>
