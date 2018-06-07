<template>
  <app-dialog
    class="app-dialog"
    :show="show"
    :close="true"
    @close-dialog="emitCloseDialog">
    <h1 slot="headline">Delete plant</h1>

    <div slot="content">
      <button class="warning" @click="emitDeletePlant">
        <feather-trash />
        <span>Yes, delete this plant</span>
      </button>

      <div class="modal-meta">
        <span>Last updated: {{ modified | formatDate }}</span>
        <span>Created: {{ created | formatDate }}</span>
      </div>
    </div>
  </app-dialog>
</template>

<script>
  import Dialog from '@/components/Dialog'
  import '@/assets/cactus'

  export default {
    name: 'PlantModal',

    props: {
      show: { type: Boolean, default: false },
      name: { type: String, default: '' },
      modified: { type: Number, default: Date.now() },
      created: { type: Number, default: Date.now() }
    },

    components: {
      'app-dialog': Dialog,
      'feather-trash': () =>
        import('vue-feather-icon/components/trash' /* webpackChunkName: "plant" */)
    },

    methods: {
      emitCloseDialog () {
        this.$emit('close-modal')
      },
      emitDeletePlant () {
        this.$emit('delete-plant')
        this.emitCloseDialog()
      }
    }
  }
</script>

<style lang="postcss" scoped>
  button.warning {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .modal-meta {
    margin-top: var(--base-gap);
    margin-bottom: calc(-1 * var(--base-gap)); /* @FIXME Ugly spacings hack. */
    background: var(--background-secondary);
    border-radius: var(--border-radius);
    padding: var(--base-gap) 0;

    & span {
      font-size: var(--text-size-small);
      color: var(--text-color-secondary);
      text-align: center;
      display: block;
    }
  }
</style>
