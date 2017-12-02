<template>
  <div :class="{ 'categorise-container': true, 'active': activeSelection }">
    <button
      aria-label="Categorise"
      :class="buttonCategoriseClass"
      @click="activate($event)">
      <feather-layers width="18" height="18" />
    </button>

    <div class="categorise-content">
      <p>Feature currently inactive.</p>
    </div>

    <button
      aria-label="Cancel categorisation"
      class="cancel icon"
      @click="cancel($event)">
      <feather-x width="18" height="18" />
    </button>
  </div>
</template>

<script>
  export default {
    name: 'SelectionCategorise',

    props: {
      activeSelection: { type: Boolean, default: false }
    },

    components: {
      'feather-layers': () =>
        import('vue-feather-icon/components/layers' /* webpackChunkName: "overview" */),
      'feather-x': () =>
        import('vue-feather-icon/components/x' /* webpackChunkName: "overview" */)
    },

    computed: {
      buttonCategoriseClass () {
        if (this.activeSelection) {
          return 'categorise icon'
        }
        return 'categorise circle icon inverse'
      }
    },

    methods: {
      activate (event) {
        if (event.currentTarget) event.currentTarget.blur()
        this.$emit('categorise-selection')
      },
      cancel (event) {
        if (event.currentTarget) event.currentTarget.blur()
        this.$emit('cancel-selection')
      }
    }
  }
</script>

<style lang="scss" scoped>
  $btn-size: 50px;

  .categorise-container {
    button {
      width: $btn-size;
      height: $btn-size;
      flex: 1 0 auto;
    }

    &:not(.active) button.categorise {
      padding: 0;
      background: var(--background-primary);
      box-shadow: var(--plain-shadow);
    }

    button.cancel {
      display: none;
    }
  }

  .categorise-container.active {
    display: flex;
    background: var(--brand-green);
    border-radius: var(--border-radius);
    box-shadow: var(--plain-shadow);
    width: 100%;

    button {
      display: flex;
      justify-content: center;

      svg {
        margin-right: 0;
      }
    }

    button.categorise {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .categorise-content {
    width: 100%;
    display: none;
    align-items: center;
    text-align: left;
    color: var(--text-color-inverse);
    padding: 0 var(--base-gap);

    .active & {
      display: flex;
    }

    p {
      font-weight: 600;
    }
  }
</style>
