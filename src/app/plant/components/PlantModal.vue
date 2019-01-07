<template>
  <portal-dialog
    dialog-name="plant-edit-dialog"
    :show="show"
    @close-dialog="emitCloseDialog">
    <span slot="headline">Delete plant</span>

    <div>
      <v-button
        color="red"
        :loading="loading"
        @click.native="emitDeletePlant">
        <feather-trash slot="icon" />
        Yes, delete this plant
      </v-button>

      <div class="modal-meta">
        <span>Last updated: {{ modified | formatDate }}</span>
        <span>Created: {{ created | formatDate }}</span>
      </div>
    </div>
  </portal-dialog>
</template>

<script>
  import '@/assets/icons/cactus'

  export default {
    name: 'PlantModal',

    props: {
      show: { type: Boolean, default: false },
      name: { type: String, default: '' },
      modified: { type: Number, default: Date.now() },
      created: { type: Number, default: Date.now() },
      loading: { type: Boolean, default: false }
    },

    components: {
      'feather-trash': () =>
        import('vue-feather-icons/icons/TrashIcon' /* webpackChunkName: "icons" */)
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
  #plant-edit-dialog button {
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
