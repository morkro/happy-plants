<template>
  <div class="file-upload">
    <div class="upload-preview">
      <div :class="{
        fallback: disablePreview || imageURL === '',
        'has-file': disablePreview && newPhoto !== '' }">
        <img v-if="disablePreview == false && imageURL !== ''"
          :src="imageURL"
          :alt="name" />
        <svgicon v-else
          icon="cactus"
          width="30"
          height="30"
          color="#000">
        </svgicon>
      </div>
      <span>{{ fileName }}</span>
    </div>

    <input
      type="file"
      :id="name"
      :accept="acceptedFilePattern"
      @change="emitPhoto" />
  </div>
</template>

<script>
  import { getUrlFromBlob } from '@/utils/blob'
  import '@/assets/cactus'

  export default {
    name: 'FileUpload',

    props: {
      name: { type: String },
      accepts: { type: [Array, String], default: () => ['.png', '.jpg', '.jpeg'] },
      disablePreview: { type: Boolean, default: false }
    },

    data () {
      return {
        newName: '',
        newPhoto: '',
        imageURL: '',
        fileName: 'Choose a file'
      }
    },

    computed: {
      acceptedFilePattern () {
        return Array.isArray(this.accepts)
          ? this.accepts.join(', ')
          : this.accepts
      }
    },

    methods: {
      emitPhoto (event) {
        if (!event.target.files && !event.target.files.length) {
          return
        }

        this.newPhoto = event.target.files[0]
        this.fileName = this.newPhoto.name
        this.imageURL = getUrlFromBlob(this.newPhoto)

        this.$emit('file-selected', { blob: this.newPhoto })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";
  @import "~styles/animations";

  $photo-size: 64px;

  .file-upload input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .file-upload .upload-preview {
    display: flex;
    margin-bottom: $base-gap;
    background: $background-primary;
    border-radius: $border-radius;
    overflow: hidden;
    cursor: pointer;

    > div {
      width: $photo-size;
      flex-shrink: 0;
      overflow: hidden;

      &.fallback {
        background: $dark-transparency;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color $base-speed ease-in-out;
      }

      &.fallback.has-file {
        background: $green;
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
      height: 100%;
      object-fit: cover;
    }

    svg {
      height: 80%;
      opacity: 0.22;
    }
  }
</style>
