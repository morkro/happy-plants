<template>
  <div v-if="show" class="alert-backdrop" @click.self="emitAlertClose">
    <section
      :class="`alert-${type}`"
      :style="{ backgroundColor: backgroundColor || '' }">
      <header class="alert-header">
        <button
          v-if="close"
          aria-label="Close"
          class="circle inverse"
          @click.prevent="emitAlertClose">
          <feather-x width="18" height="18" />
        </button>
        <slot name="headline"></slot>
      </header>

      <div class="alert-content">
        <slot name="content"></slot>
        <div class="alert-actions">
          <slot name="cancel"></slot>
          <slot name="confirm"></slot>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Dialog',

    props: {
      show: { type: Boolean, default: false },
      close: { type: Boolean, default: false },
      backgroundColor: { type: [String, Boolean], default: false },
      type: { type: String, default: 'normal' }
    },

    components: {
      'feather-x': () =>
        import('vue-feather-icon/components/x' /* webpackChunkName: "general" */)
    },

    watch: {
      show () {
        if (this.show) {
          this.$root.$el.parentNode.classList.add('js-no-scrolling')
        } else {
          this.$root.$el.parentNode.classList.remove('js-no-scrolling')
        }
      }
    },

    methods: {
      emitAlertClose () {
        this.$emit('close-alert')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/z-index";

  .alert-backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background: var(--transparency-black-medium);
    position: fixed;
    top: 0;
    left: 0;
    z-index: z($page-elements, modals);
  }

  section {
    width: auto;
    max-width: 85vw;
    background: var(--background-secondary);
    box-shadow: var(--plain-shadow);
    padding: var(--base-gap);
    border-radius: var(--border-radius);

    &.alert-warning {
      background: var(--brand-red);
      color: var(--text-color-inverse);
    }
  }

  .alert-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: var(--base-gap);

    button {
      margin-right: calc(var(--base-gap) + 5px);
      background: var(--background-primary);
      color: var(--link-color);
      box-shadow: var(--plain-shadow);
    }

    button + h1 {
      margin-top: 8px;
    }

    h1 {
      font-size: var(--text-size-large);
      font-weight: 600;
      line-height: 115%;

      .alert-warning & {
        color: var(--text-color-inverse);
      }
    }
  }

  .alert-actions {
    display: flex;
    margin-top: var(--base-gap);

    button:first-of-type {
      margin-right: calc(var(--base-gap) * 2);
    }
  }
</style>
