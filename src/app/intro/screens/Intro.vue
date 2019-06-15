<script>
  export default {
    name: 'Intro',

    meta: {
      title: 'Welcome to HappyPlants!'
    },

    render (h) {
      return h('router-view', {}, [this.$slots.default])
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../../../styles/media-queries";

  .app-wireframe {
    width: 100%;
    min-height: 100vh;
    max-width: var(--app-desktop-max-width);
    margin: 0 auto;

    & p {
      font-weight: 500;
    }
  }
</style>
