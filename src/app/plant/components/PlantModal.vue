<template>
  <app-dialog
    class="app-dialog"
    :show="show"
    :close="true"
    @close-dialog="emitCloseDialog">
    <h1 slot="headline">Update your plant</h1>

    <div slot="content">
      <form class="modal-content" @submit.prevent="updatePlant">
        <label for="modal-name">
          <h2>Name</h2>
          <input
            id="modal-name"
            type="text"
            :value="name"
            @change="updateName">
        </label>

        <label for="modal-file">
          <h2>Upload or change photo</h2>
          <span>You can either select a photo from your gallery or take one now.</span>
          <file-upload
            name="modal-file"
            @loading-file="handleLoadingState"
            @file-selected="assignPhoto" />
        </label>

        <div class="modal-actions">
          <button :disabled="isUploadingFile">
            Save
          </button>

          <button class="warning" @click="emitDeletePlant">
            <feather-trash />
            Delete plant
          </button>
        </div>
      </form>

      <div class="modal-meta">
        <span>Last updated: {{ modified | formatDate }}</span>
        <span>Created: {{ created | formatDate }}</span>
      </div>
    </div>
  </app-dialog>
</template>

<script>
  import { isBlobbable } from '@/utils/blob'
  import Dialog from '@/components/Dialog'
  import FileUpload from '@/components/FileUpload'

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
      'file-upload': FileUpload,
      'feather-trash': () =>
        import('vue-feather-icon/components/trash' /* webpackChunkName: "plant" */)
    },

    data () {
      return {
        newName: '',
        newPhoto: '',
        isUploadingFile: false
      }
    },

    methods: {
      handleLoadingState ({ loading }) {
        this.isUploadingFile = loading
      },
      updateName (event) {
        if (!event.target.value) return
        this.newName = event.target.value
      },
      emitCloseDialog () {
        Object.assign(this.$data, this.$options.data()) // Reset state
        this.$emit('close-modal')
      },
      assignPhoto (data) {
        if (!data.blob) {
          return
        }
        this.newPhoto = data.blob
      },
      updatePlant () {
        const data = { name: this.name }

        if (this.name !== this.newName && this.newName !== '') {
          data.name = this.newName
        }
        if (this.newPhoto !== '' && isBlobbable(this.newPhoto)) {
          data.blob = this.newPhoto
        }

        this.$emit('content-update', data)
        this.emitCloseDialog()
      },
      emitDeletePlant () {
        this.$emit('delete-plant')
        this.emitCloseDialog()
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .modal-content {
    border-top: 3px solid rgba(0, 0, 0, 0.06);
    padding-top: var(--base-gap);
  }

  label {
    display: block;
    margin-bottom: calc(var(--base-gap) * 2);

    & h2 {
      margin-bottom: var(--base-gap);
    }

    & span {
      display: block;
      color: var(--text-color-secondary);
      font-size: var(--text-size-small);
      margin-bottom: var(--base-gap);
      padding: 0 1px;
    }

    & input {
      width: 100%;
    }
  }

  .modal-actions {
    display: flex;
    justify-content: space-between;
  }

  .modal-delete {
    border-top: 3px solid rgba(0, 0, 0, 0.06);
    padding-top: calc(var(--base-gap) * 2);
    margin-top: calc(var(--base-gap) * 2);

    & button {
      width: 100%;
      display: flex;
      justify-content: center;
    }
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
