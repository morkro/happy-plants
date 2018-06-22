<template>
  <app-dialog
    id="plant-edit-dialog"
    app-root=".main-wireframe"
    class="app-dialog"
    :show="show"
    @close-dialog="emitCloseDialog">
    <span slot="headline">Delete plant</span>

    <button
      type="button"
      class="warning"
      @click="emitDeletePlant">
      <feather-trash />
      <span>Yes, delete this plant</span>
    </button>

    <div class="modal-meta">
      <span>Last updated: {{ modified | formatDate }}</span>
      <span>Created: {{ created | formatDate }}</span>
    </div>
  </app-dialog>
</template>

<script>
  import HappyDialog from '@/components/HappyDialog'
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
      'app-dialog': HappyDialog,
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
    background: var(--background-primary);
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
