<template>
  <app-modal
    class="app-modal"
    :show="show"
    @close-modal="emitCloseModal">
    <h1 slot="headline">Update your plant</h1>

    <form slot="content" class="modal-content" @submit.prevent="updatePlant">
      <label for="modal-name">
        <h2>Name</h2>
        <input
          id="modal-name"
          type="text"
          :value="name"
          @change="updateName" />
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
      name: { type: String }
    },

    components: {
      'app-modal': Modal,
      'file-upload': FileUpload
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";
  @import "~styles/fonts";

  $photo-size: 59px;

  .modal-content {
    border-top: 3px solid rgba(0, 0, 0, 0.06);
    padding-top: $base-gap;
  }

  label {
    display: block;
    margin-bottom: $base-gap * 2;

    h2 {
      margin-bottom: $base-gap;
    }

    span {
      display: block;
      color: $text-color-secondary;
      font-size: $text-size-small;
      margin-bottom: $base-gap;
      padding: 0 1px;
    }

    input {
      width: 100%;
    }
  }
</style>
