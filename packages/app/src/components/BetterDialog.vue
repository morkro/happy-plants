<template>
  <a11y-dialog
    disable-native
    :id="dialogIdentifier"
    app-root="#app"
    dialog-root="#dialog"
    :class-names="dialogClassNames"
    @dialog-ref="assignDialogRef"
  >
    <template v-slot:closeButtonContent>
      <feather-x
        width="24"
        height="24"
      />
    </template>

    <template v-slot:title>
      <slot name="headline" />
    </template>

    <div class="happy-dialog-content">
      <slot />
    </div>
  </a11y-dialog>
</template>

<script>
  export default {
    name: 'BetterDialog',

    props: {
      id: { type: String, required: true },
      show: { type: Boolean, default: false },
      type: { type: String, default: 'normal' }
    },

    components: {
      'feather-x': () =>
        import('vue-feather-icons/icons/XIcon' /* webpackChunkName: "icons" */)
    },

    data: () => ({
      dialog: null
    }),

    computed: {
      dialogClassNames () {
        return {
          base: 'happy-dialog-base',
          overlay: 'happy-dialog-overlay',
          element: `happy-dialog-element box ${this.type}`,
          document: 'happy-dialog-document',
          title: 'happy-dialog-title',
          closeButton: 'happy-dialog-close-button circle plain'
        }
      },
      dialogIdentifier () {
        return this.id || 'app-dialog'
      }
    },

    watch: {
      show (showDialog) {
        if (showDialog) {
          this.$root.$el.parentNode.classList.add('js-no-scrolling')
          if (this.dialog) {
            this.dialog.show()
          }
        } else {
          this.$root.$el.parentNode.classList.remove('js-no-scrolling')
          if (this.dialog) {
            this.dialog.hide()
          }
        }
      }
    },

    methods: {
      assignDialogRef (dialog) {
        this.dialog = dialog
        if (this.dialog) {
          this.dialog.on('hide', this.onDialogClose)
        }
      },
      onDialogClose () {
        this.$emit('close-dialog')
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

  .happy-dialog-element.box {
    width: 100%;
    height: auto;
    max-width: 90vw;
    max-height: 90vh;
    padding: var(--base-gap);
    overflow: scroll !important;
    border: none;
    position: relative;
    background: var(--background-secondary);

    @nest html[data-theme="dark"] & {
      background: var(--background-primary);
    }

    @media (--min-desktop-viewport) {
      width: calc(var(--app-desktop-max-width) / 2);
    }

    &.danger {
      background: var(--brand-red);
      color: var(--text-color-inverse);
      box-shadow: 0 2px 7px var(--brand-red-medium);
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
    word-break: break-word;

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
