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
      <feather-x />
    </template>

    <template v-slot:title>
      <slot name="headline" />
    </template>

    <div class="app-dialog-content">
      <slot />
    </div>
  </a11y-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import A11yDialog from '@/types/a11y-dialog'

  export default Vue.extend({
    name: 'AppDialog',

    props: {
      id: { type: String, required: true },
      show: { type: Boolean, default: false },
    },

    components: {
      'feather-x': () => import('vue-feather-icons/icons/XIcon' /* webpackChunkName: "icons" */),
    },

    data(): { dialog: A11yDialog } {
      return {
        dialog: null,
      }
    },

    computed: {
      dialogClassNames(): Record<string, string> {
        return {
          base: 'app-dialog-base',
          overlay: 'app-dialog-overlay',
          element: 'app-dialog-element',
          document: 'app-dialog-document',
          title: 'app-dialog-title',
          closeButton: 'app-dialog-close-btn btn blue round small',
        }
      },
      dialogIdentifier(): string {
        return this.id || 'app-dialog'
      },
    },

    watch: {
      show(showDialog: boolean): void {
        if (showDialog) {
          ;(this.$root.$el.parentNode as Element).classList.add('js-no-scrolling')
          if (this.dialog) {
            this.dialog.show()
          }
        } else {
          ;(this.$root.$el.parentNode as Element).classList.remove('js-no-scrolling')
          if (this.dialog) {
            this.dialog.hide()
          }
        }
      },
    },

    methods: {
      assignDialogRef(dialog: A11yDialog): void {
        this.dialog = dialog

        if (this.show) {
          ;(this.$root.$el.parentNode as Element).classList.add('js-no-scrolling')
          if (this.dialog) {
            this.dialog.show()
          }
        }

        if (this.dialog) {
          this.dialog.on('hide', this.onDialogClose)
        }
      },
      onDialogClose(): void {
        this.$emit('close-dialog')
      },
    },
  })
</script>

<style lang="postcss">
  .app-dialog-base {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;

    &[aria-hidden='true'] {
      display: none;
    }
  }

  .app-dialog-overlay {
    width: 100%;
    height: 100%;
    background: var(--brand-black-50);
    top: 0;
    left: 0;
    position: absolute;
    z-index: 0;
  }

  .app-dialog-element {
    width: 100%;
    height: auto;
    max-width: 90vw;
    max-height: 90vh;
    border: none;
    position: relative;
    background: var(--brand-beige);
    border-radius: var(--base-radius);
    box-shadow: 0 2px 7px var(--brand-black-50);
  }

  .app-dialog-document {
    display: grid;
    grid-template-areas:
      'title close'
      'content content';
    grid-template-columns: 1fr min-content;
  }

  .app-dialog-title {
    grid-area: title;
    align-self: center;
    word-break: break-word;
    font-size: 125%;
    font-weight: 500;
    color: var(--brand-green-dark);
    margin: 0;
    padding: var(--base-gap);
    padding-right: 0;
  }

  .app-dialog-close-btn {
    grid-area: close;
    margin: var(--base-gap);
  }

  .app-dialog-content {
    grid-area: content;
    overflow: scroll;
    max-height: 70vh;
    padding: 0 var(--base-gap) var(--base-gap);
  }
</style>
