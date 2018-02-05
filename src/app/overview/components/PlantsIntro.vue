<template>
  <section class="plants-intro">
    <svgicon
      class="preview-icon"
      icon="cactus"
      :width="iconSize"
      :height="iconSize"
      color="#fff" />
    <div class="intro-content">
      <h2>Welcome to HappyPlants!</h2>
      <p>
        Looks like you haven't added any friends yet!<br>
      </p>
      <ul>
        <li>
          <p>Tap on the bottom button to add your first plant.</p>
        </li>
        <li>
          <p>
            Later on, you can update the sorting by clicking on the view button
            <span aria-hidden="true">(<feather-grid />)</span> in the lower menu
          </p>
        </li>
        <li>
          <p>
            In the settings <span aria-hidden="true">(<feather-settings />)</span>
            you can manage categories.
          </p>
        </li>
      </ul>
      <p>Happy organising!</p>
    </div>
  </section>
</template>

<script>
  import '@/assets/cactus'
  export default {
    name: 'PlantsIntro',

    components: {
      'feather-settings': () =>
        import('vue-feather-icon/components/settings' /* webpackChunkName: "general" */),
      'feather-grid': () =>
        import('vue-feather-icon/components/grid' /* webpackChunkName: "overview" */)
    },

    data () {
      return {
        iconSize: '100'
      }
    }
  }
</script>

<style lang="postcss" scoped>
  section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 95%;
  }

  .intro-content {
    padding-top: var(--base-gap);

    & h2 {
      margin-bottom: var(--base-gap);
    }

    & p {
      color: var(--text-color-secondary);
      font-weight: 600;
    }

    & ul {
      margin: var(--base-gap) 0;
    }

    & li {
      margin-left: var(--base-gap);

      &:not(:last-child) {
        margin-bottom: calc(var(--base-gap) / 2);
      }
    }

    & svg {
      display: inline-block;
      vertical-align: middle;
      width: calc(var(--icon-size-base) / 1.25);
      height: calc(var(--icon-size-base) / 1.25);
    }
  }

  .preview-icon {
    opacity: 0.2;
  }
</style>
