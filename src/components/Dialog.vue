<template>
  <div
    v-if="show"
    class="dialog-backdrop"
    @click.self="emitDialogClose">
    <section
      :class="dialogClass"
      :style="{ backgroundColor: backgroundColor || '' }">
      <header class="dialog-header" v-if="contentOnly === false">
        <div class="dialog-headline">
          <slot name="headline" />
        </div>
        <button
          v-if="close"
          aria-label="Close"
          class="circle inverse"
          @click.prevent="emitDialogClose">
          <feather-x width="24" height="24" />
        </button>
      </header>

      <div class="dialog-content">
        <slot name="content" />

        <div class="dialog-actions" v-if="actions">
          <slot name="cancel" />
          <slot name="confirm" />
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
      contentOnly: { type: Boolean, default: false },
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
      dialogClass () {
        return {
          [`dialog-${this.type}`]: true,
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
      emitDialogClose () {
        this.$emit('close-dialog')
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .dialog-backdrop {
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
    width: 100%;
    max-width: 90vw;
    max-height: 95vh;
    padding: var(--base-gap);

    &.dialog-warning {
      color: var(--text-color-inverse);
    }
  }

  .dialog-header {
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

      &:focus {
        --button-focus: var(--dark-grey);
      }
    }

    & .dialog-headline {
      width: 100%;
      min-height: 50px;
      display: flex;
      align-items: center;
    }

    & h1 {
      font-size: var(--text-size-large);
      font-weight: 600;
      line-height: 115%;

      @nest .dialog-warning & {
        color: var(--text-color-inverse);
      }
    }
  }

  .dialog-actions {
    display: flex;
    margin-top: var(--base-gap);

    & button:first-of-type {
      margin-right: calc(var(--base-gap) * 2);
    }

    @nest .dialog-warning & .warning:focus {
      --button-focus: var(--brand-yellow-medium);
    }
  }
</style>
