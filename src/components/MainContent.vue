<script>
  export default {
    name: 'MainContent',

    render (h) {
      return h('main', {
        class: ['main-content']
      }, [this.$slots.default])
    }
  }
</script>

<style lang="postcss">
  .main-content {
    width: 100%;
    max-width: var(--app-mobile-max-size);
    margin: 0 auto;
    padding-top: var(--base-gap);

    @media (--max-mobile-viewport) {
      max-width: var(--app-desktop-max-width);
    }
  }
</style>
