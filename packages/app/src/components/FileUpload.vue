<template>
  <div class="file-upload">
    <input
      ref="fileInput"
      type="file"
      :id="name"
      :accept="acceptedFilePattern"
      @change="emitPhoto"
    >

    <div class="upload-preview">
      <div :class="getWrapperClass">
        <img
          v-if="disablePreview === false && imageURL !== ''"
          :src="imageURL"
          :alt="name"
        >
        <svgicon
          v-else
          icon="cactus"
          width="30"
          height="30"
          color="#000"
        />
      </div>

      <span v-if="loading" class="loading-icon">
        <feather-aperture />
      </span>
      <span v-else>
        {{ fileName }}
      </span>
    </div>
  </div>
</template>

<script>
  import { getUrlFromBlob, resizeBlob } from '@/utils/blob'
  import '@/assets/icons/cactus'

  export default {
    name: 'FileUpload',

    props: {
      name: { type: String, default: '' },
      accepts: { type: [Array, String], default: () => ['.png', '.jpg', '.jpeg'] },
      disablePreview: { type: Boolean, default: false }
    },

    components: {
      'feather-aperture': () =>
        import('vue-feather-icons/icons/ApertureIcon' /* webpackChunkName: "icons" */)
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
      getWrapperClass () {
        return {
          fallback: this.disablePreview || this.imageURL === '',
          'has-file': this.disablePreview && this.newPhoto !== ''
        }
      },
      acceptedFilePattern () {
        return Array.isArray(this.accepts)
          ? this.accepts.join(', ')
          : this.accepts
      }
    },

    methods: {
      triggerUpload () {
        this.$refs.fileInput.click()
      },

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
        this.$emit('file-selected', { blob: this.newPhoto, fileName: this.fileName })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  .file-upload {
    --photo-size: 64px;
  }

  .file-upload input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;

    &:active + div,
    &:focus + div {
      outline: none;
      box-shadow:
        0 0 0 2px var(--transparency-black-light),
        0 0 12px var(--transparency-black-light);
    }
  }

  .file-upload .upload-preview {
    display: flex;
    margin-bottom: var(--base-gap);
    background: var(--background-primary);
    border-radius: var(--border-radius);
    overflow: hidden;
    cursor: pointer;

    & > div {
      width: var(--photo-size);
      height: var(--photo-size);
      flex-shrink: 0;
      overflow: hidden;

      &.fallback {
        background: var(--transparency-black-light);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color var(--base-speed) ease-in-out;
      }

      &.fallback.has-file {
        background: var(--brand-green);
      }
    }

    & span {
      background: transparent;
      box-shadow: none;
      color: var(--text-color-base);
      padding: calc(var(--base-gap) + 5px) var(--base-gap);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    & img {
      width: var(--photo-size);
      height: 100%;
      object-fit: cover;
    }

    & svg.svg-icon {
      height: 80%;
      opacity: 0.22;
    }

    & .loading-icon {
      display: flex;
      align-items: center;
      transform-origin: 50% 50%;
      animation: rotate 2s linear infinite;

      & svg {
        width: 18px;
        height: 18px;
        margin: 3px;
      }
    }
  }
</style>
