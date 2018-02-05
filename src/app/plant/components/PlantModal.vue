<template>
  <app-modal
    class="app-modal"
    :show="show"
    @close-modal="emitCloseModal">
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

        <button :disabled="isUploadingFile">
          Save
        </button>
      </form>

      <div class="modal-delete">
        <button class="warning" @click="emitDeletePlant">
          <feather-trash />
          Delete plant
        </button>
      </div>
    </div>
  </app-modal>
</template>

<script>
  import { isBlobbable } from '@/utils/blob'
  import Modal from '@/components/Modal'
  import FileUpload from '@/components/FileUpload'

  import '@/assets/cactus'

  export default {
    name: 'PlantModal',

    props: {
      show: { type: Boolean, default: false },
      name: { type: String, default: '' }
    },

    components: {
      'app-modal': Modal,
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
      emitCloseModal () {
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
        this.emitCloseModal()
      },
      emitDeletePlant () {
        this.$emit('delete-plant')
        this.emitCloseModal()
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
</style>
