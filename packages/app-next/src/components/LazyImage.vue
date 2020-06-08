<template>
  <figure v-lazyload class="lazy-image">
    <feather-loader />
    <img :data-src="src" :alt="alt" :title="title || alt" />
  </figure>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    name: 'LazyImage',

    components: {
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
    },

    props: {
      src: { type: String, required: true },
      alt: { type: String, required: true },
      title: { type: String, default: '' },
    },
  })
</script>

<style lang="postcss">
  .lazy-image {
    width: 100%;
    height: 100%;
    position: relative;
    background: var(--brand-white);
    display: flex;
    justify-content: center;
    align-items: center;

    &.loaded svg {
      display: none;
    }

    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    & svg {
      width: 46px;
      height: 46px;
      stroke: var(--brand-beige);
      transform-origin: center center;
      animation: spin 3s linear infinite;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
