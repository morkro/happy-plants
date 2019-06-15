<script>
  export default {
    name: 'AppWireframe',

    render (h) {
      return h('div', {
        class: ['app-wireframe']
      }, [this.$slots.default])
    }
  }
</script>

<style lang="postcss">
  .app-wireframe {
    display: flex;
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding-top: var(--app-header-size);
  }
</style>
