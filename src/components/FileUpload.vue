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

      <span v-if="loading" class="loading-icon">
        <feather-aperture />
      </span>
      <span v-else>
        {{ fileName }}
      </span>
    </div>

    <input
      type="file"
      :id="name"
      :accept="acceptedFilePattern"
      @change="emitPhoto" />
  </div>
</template>

<script>
  import { getUrlFromBlob, resizeBlob } from '@/utils/blob'
  import '@/assets/cactus'

  export default {
    name: 'FileUpload',

    props: {
      name: { type: String },
      accepts: { type: [Array, String], default: () => ['.png', '.jpg', '.jpeg'] },
      disablePreview: { type: Boolean, default: false }
    },

    components: {
      'feather-aperture': () =>
        import('vue-feather-icon/components/aperture' /* webpackChunkName: "general" */)
    },

    data () {
      return {
        loading: false,
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
      async emitPhoto (event) {
        if (!event.target.files && !event.target.files.length) {
          return
        }

        this.loading = true
        this.$emit('loading-file', { loading: this.loading })

        const file = event.target.files[0]

        if (!file.type.includes('image')) {
          this.newPhoto = file
        } else {
          try {
            this.newPhoto = await resizeBlob(file, { width: window.outerWidth * 1.5 })
          } catch (e) {
            this.newPhoto = file
          }
        }

        this.loading = false
        this.fileName = file.name
        this.imageURL = getUrlFromBlob(this.newPhoto)

        this.$emit('loading-file', { loading: this.loading })
        this.$emit('file-selected', { blob: this.newPhoto })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";
  @import "~styles/animations";

  $photo-size: 64px;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

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
      height: $photo-size;
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

    svg.svg-icon {
      height: 80%;
      opacity: 0.22;
    }

    .loading-icon {
      display: flex;
      align-items: center;
      transform-origin: 50% 50%;
      animation: rotate 2s linear infinite;

      svg {
        width: 18px;
        height: 18px;
        margin: 3px;
      }
    }
  }
</style>
