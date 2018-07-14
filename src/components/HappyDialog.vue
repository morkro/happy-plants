<template>
  <a11y-dialog disable-native
    :id="id"
    :app-root="appRoot"
    :class-names="classNames"
    @dialog-ref="assignDialogRef">
    <feather-x
      slot="closeButtonContent"
      width="24"
      height="24" />

    <slot slot="title" name="headline" />

    <div class="happy-dialog-content">
      <slot />
    </div>
  </a11y-dialog>
</template>

<script>
  export default {
    name: 'HappyDialog',

    props: {
      id: { type: String, required: true, default: 'happy-dialog' },
      appRoot: { type: String, required: true, default: '#app' },
      show: { type: Boolean, default: false },
      type: { type: String, default: 'normal' }
    },

    components: {
      'feather-x': () =>
        import('vue-feather-icon/components/x' /* webpackChunkName: "icons" */)
    },

    data: () => ({
      dialog: null
    }),

    computed: {
      classNames () {
        return {
          base: 'happy-dialog-base',
          overlay: 'happy-dialog-overlay',
          element: `happy-dialog-element box ${this.type}`,
          document: 'happy-dialog-document',
          title: 'happy-dialog-title',
          closeButton: 'happy-dialog-close-button circle inverse'
        }
      }
    },

    watch: {
      show () {
        if (this.show) {
          this.$root.$el.parentNode.classList.add('js-no-scrolling')
          if (this.dialog) this.dialog.show()
        } else {
          this.$root.$el.parentNode.classList.remove('js-no-scrolling')
          if (this.dialog) this.dialog.hide()
        }
      }
    },

    methods: {
      assignDialogRef (dialog) {
        this.dialog = dialog
        if (this.dialog) this.dialog.on('hide', this.onDialogClose)
        if (this.dialog) this.dialog.on('show', this.onDialogOpen)
      },
      onDialogClose () {
        this.$emit('close-dialog')
      },
      onDialogOpen () {
        this.$emit('open-dialog')
      }
    },

    beforeDestroy () {
      if (this.dialog) this.dialog.off('hide', this.onDialogClose)
      if (this.dialog) this.dialog.off('show', this.onDialogOpen)

      const rootNode = this.$root.$el.parentNode
      if (rootNode.classList.contains('js-no-scrolling')) {
        rootNode.classList.remove('js-no-scrolling')
      }
    }
  }
</script>

<style lang="postcss">
  @import "../styles/media-queries";

  .happy-dialog-base {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;

    &[aria-hidden="true"] {
      display: none;
    }
  }

  .happy-dialog-overlay {
    width: 100%;
    height: 100%;
    background: var(--transparency-black-medium);
    top: 0;
    left: 0;
    position: absolute;
    z-index: 0;
  }

  .happy-dialog-element {
    width: 100%;
    max-width: 90vw;
    max-height: 95vh;
    padding: var(--base-gap);
    overflow: scroll;
    border: none;
    position: relative;
    background: var(--background-secondary);

    @media (--min-desktop-viewport) {
      width: var(--app-desktop-max-width);
    }

    &.danger {
      background: var(--brand-red);
      color: var(--text-color-inverse);
    }
  }

  .happy-dialog-document {
    display: grid;
    grid-template-areas:
      "title close"
      "content content";
    grid-gap: var(--base-gap);
    grid-template-columns: 1fr 50px;
  }

  .happy-dialog-title {
    grid-area: title;
    align-self: center;
    font-size: var(--text-size-large);
    font-weight: 500;
    line-height: 115%;

    @nest .danger & {
      color: var(--text-color-inverse);
    }
  }

  .happy-dialog-close-button {
    grid-area: close;
    background: var(--grey);
    color: var(--link-color);
    box-shadow: none;

    &:focus {
      --button-focus: var(--dark-grey);
    }
  }

  .happy-dialog-content {
    grid-area: content;

    & button {
      margin-top: var(--base-gap);
    }

    @nest .danger & button {
      background: var(--brand-yellow);
      color: var(--link-color);
    }
  }
</style>
