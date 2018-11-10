<template>
  <figure v-lazyload class="lazy-image">
    <feather-loader class="rotate" />
    <img
      :data-src="source"
      :alt="alt"
      :title="title || alt">
  </figure>
</template>

<script>
  export default {
    name: 'LazyImage',

    components: {
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */)
    },

    props: {
      source: { type: String, required: true },
      alt: { type: String, required: true },
      title: { type: String, default: '' }
    }
  }
</script>

<style lang="postcss">
  @import "../styles/animations";

  .lazy-image {
    --preview-background: var(--grey);
    width: 100%;
    height: 100%;
    position: relative;
    background: var(--preview-background);
    display: flex;
    justify-content: center;
    align-items: center;

    @nest html[data-theme="dark"] & {
      --preview-background: var(--dark-grey);
    }

    &.loaded svg {
      display: none;
    }

    & img {
      object-fit: cover;
      position: absolute;
      width: 100%;
      height: 100%;
    }

    & svg {
      width: 30%;
      height: auto;
      opacity: 0.12;
      transform-origin: center center;
      animation: rotate360 4s linear infinite;
    }
  }
</style>
