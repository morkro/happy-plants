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
        <div class="modal-file-photo">
          <div :class="{ fallback: !photo }">
            <img v-if="photo" :src="photo" :alt="name" />
            <svg-icon v-else icon="cactus" width="30" height="30" color="#000"></svg-icon>
          </div>
          <span>You can either select a photo from your gallery or take one now.</span>
        </div>
        <input id="modal-file" type="file" @change="assignPhoto" />
      </label>
      <button>Save</button>
    </form>
  </app-modal>
</template>

<script>
  import { isBlobbable } from '@/utils/blob'
  import Modal from '@/app/shared/Modal'
  import '@/assets/cactus'

  export default {
    name: 'PlantModal',

    props: {
      show: { type: Boolean, default: false },
      name: { type: String },
      photo: { type: [String, Boolean], default: false }
    },

    components: {
      'app-modal': Modal
    },

    data () {
      return {
        newName: '',
        newPhoto: ''
      }
    },

    methods: {
      emitCloseModal () {
        this.newName = ''
        this.newPhoto = ''
        this.$emit('close-modal')
      },
      assignPhoto (event) {
        if (event.target.files && event.target.files.length) {
          this.newPhoto = event.target.files[0]
        }
      },
      updatePlant () {
        const data = { name: this.name, photo: this.photo }

        if (this.name !== this.newName && this.newName !== '') {
          data.name = this.newName
        }
        if (this.newPhoto !== '' && isBlobbable(this.newPhoto)) {
          data.photo = this.newPhoto
        }

        this.$emit('content-update', data)
        this.emitCloseModal()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  $photo-size: 50px;

  .modal-content {
    border-top: 3px solid rgba(0, 0, 0, .06);
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

  .modal-file-photo {
    display: flex;
    margin-bottom: $base-gap;

    > div {
      border-radius: $border-radius;
      width: $photo-size;
      height: $photo-size;
      flex-shrink: 0;
      overflow: hidden;
      margin-right: $base-gap;

      &.fallback {
        background: $dark-transparency;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    img {
      width: 100%;
    }

    svg {
      height: 80%;
      opacity: .22;
    }

    span {
      color: $text-color-secondary;
      font-size: 90%;
    }
  }
</style>
