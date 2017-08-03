<template>
  <app-modal
    class="app-modal"
    :show="show"
    @close-modal="emitCloseModal">
    <h1 slot="headline">Update your plant</h1>
    <div slot="content" class="modal-content">
      <label for="modal-name">
        <h2>Name</h2>
        <input id="modal-name" type="text" :placeholder="name" :value="name" />
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
        <input id="modal-file" type="file" />
      </label>
      <button>Save</button>
    </div>
  </app-modal>
</template>

<script>
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

    data: () => ({
      newName: false,
      newPhoto: false
    }),

    methods: {
      emitCloseModal () {
        this.$emit('close-modal')
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
