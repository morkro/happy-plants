<template>
  <app-modal
    class="app-modal"
    :show="show"
    @close-modal="emitCloseModal">
    <h1 slot="headline">Update your plant</h1>
    <form slot="content" class="modal-content" @submit.prevent="updatePlant">
      <label for="modal-name">
        <h2>Name</h2>
        <input id="modal-name" type="text" :placeholder="name" v-model="newName" />
      </label>
      <label for="modal-file">
        <h2>Upload or change photo</h2>
        <span>You can either select a photo from your gallery or take one now.</span>
        <div class="modal-file-photo">
          <div :class="{ fallback: imageURL === '' }">
            <img v-if="imageURL !== ''" :src="imageURL" :alt="name" />
            <svg-icon v-else icon="cactus" width="30" height="30" color="#000"></svg-icon>
          </div>
          <span>{{ fileName }}</span>
        </div>
        <input id="modal-file" type="file" @change="assignPhoto" />
      </label>
      <button>Save</button>
    </form>
  </app-modal>
</template>

<script>
  import { isBlobbable, getUrlFromBlob } from '@/utils/blob'
  import Modal from '@/components/Modal'
  import '@/assets/cactus'

  export default {
    name: 'PlantModal',

    props: {
      show: { type: Boolean, default: false },
      name: { type: String }
    },

    components: {
      'app-modal': Modal
    },

    data () {
      return {
        newName: '',
        newPhoto: '',
        imageURL: '',
        fileName: 'Choose a file'
      }
    },

    methods: {
      emitCloseModal () {
        Object.assign(this.$data, this.$options.data()) // Reset state
        this.$emit('close-modal')
      },
      assignPhoto (event) {
        if (!event.target.files && !event.target.files.length) {
          return
        }

        this.newPhoto = event.target.files[0]
        this.fileName = this.newPhoto.name
        this.imageURL = getUrlFromBlob(this.newPhoto)
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

    input {
      width: 100%;
    }
  }

  input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  label[for="modal-file"] {
    > span {
      color: $text-color-secondary;
      font-size: 90%;
      display: block;
      margin-bottom: $base-gap;
    }
  }

  .modal-file-photo {
    display: flex;
    margin-bottom: $base-gap;
    background: $background-primary;
    border-radius: $border-radius;
    overflow: hidden;
    cursor: pointer;

    > div {
      width: $photo-size;
      height: $photo-size;
      flex-shrink: 0;
      overflow: hidden;

      &.fallback {
        background: $dark-transparency;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    span {
      background: transparent;
      box-shadow: none;
      color: $text-color-base;
      padding: $base-gap + 5 $base-gap;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    img {
      width: $photo-size;
      height: $photo-size;
      object-fit: cover;
    }

    svg {
      height: 80%;
      opacity: 0.22;
    }
  }
</style>
