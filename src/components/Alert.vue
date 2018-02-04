<template>
  <div v-if="show" class="alert-backdrop" @click.self="emitAlertClose">
    <section
      :class="alertClass"
      :style="{ backgroundColor: backgroundColor || '' }">
      <header class="alert-header">
        <slot name="headline"></slot>
        <button
          v-if="close"
          aria-label="Close"
          class="circle inverse"
          @click.prevent="emitAlertClose">
          <feather-x width="24" height="24" />
        </button>
      </header>

      <div class="alert-content">
        <slot name="content"></slot>

        <div class="alert-actions" v-if="actions">
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
      type: { type: String, default: 'normal' },
      actions: { type: Boolean, default: true }
    },

    components: {
      'feather-x': () =>
          import('vue-feather-icon/components/x' /* webpackChunkName: "general" */)
    },

    computed: {
      alertClass () {
        return {
          [`alert-${this.type}`]: true,
          'box': true,
          'red': this.type === 'warning'
        }
      }
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

<style lang="postcss" scoped>
  .alert-backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--transparency-black-medium);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
  }

  section {
    width: auto;
    max-width: 90vw;
    max-height: 95vh;
    padding: var(--base-gap);

    &.alert-warning {
      color: var(--text-color-inverse);
    }
  }

  .alert-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: var(--base-gap);

    & button {
      margin-left: calc(var(--base-gap) + 5px);
      background: var(--grey);
      color: var(--link-color);
      box-shadow: none;
      flex: 0 0 auto;
    }

    & h1 {
      font-size: var(--text-size-large);
      font-weight: 600;
      line-height: 115%;

      @nest .alert-warning & {
        color: var(--text-color-inverse);
      }
    }
  }

  .alert-actions {
    display: flex;
    margin-top: var(--base-gap);

    & button:first-of-type {
      margin-right: calc(var(--base-gap) * 2);
    }
  }
</style>
