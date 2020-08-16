<template>
  <div :class="['fileupload', error && 'has-error']" tabindex="0" @keypress="triggerUpload">
    <input
      ref="fileInput"
      type="file"
      tabindex="-1"
      :id="id"
      :accept="acceptedFilePattern"
      @change="emitPhoto"
    />

    <div class="fileupload-container">
      <div :class="['loading-icon', loading && 'loading']">
        <feather-loader v-if="loading" />
        <feather-image v-else-if="!loading && !imageBlob && !preview" />
        <img v-else :src="image" />
      </div>
      <div>
        <v-text color="inactive">{{ fileName }}</v-text>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { HTMLElementEvent } from '@/types/events'
  import { getUrlFromBlob, resizeBlob } from '@/utils/blob'

  export default Vue.extend({
    name: 'FileUpload',
    props: {
      id: { type: String },
      accepts: { type: [Array, String], default: () => ['image/png', 'image/jpg', 'image/jpeg'] },
      error: { type: Boolean, default: false },
      preview: { type: String },
    },
    components: {
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
      'feather-image': () =>
        import('vue-feather-icons/icons/ImageIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        loading: false,
        imageName: null,
        imageBlob: null,
        imageURL: null,
      }
    },
    computed: {
      fileName(): string {
        if (this.loading) {
          return 'Loading...'
        }

        if (this.imageBlob && this.imageName) {
          return this.imageName
        }

        return 'Select photo'
      },
      acceptedFilePattern(): string {
        return Array.isArray(this.accepts) ? this.accepts.join(', ') : this.accepts
      },
      image(): string {
        return this.preview && !this.imageBlob ? this.preview : this.imageURL
      },
    },
    methods: {
      triggerUpload(): void {
        ;(this.$refs.fileInput as HTMLInputElement).click()
      },
      async emitPhoto(event: HTMLElementEvent<HTMLInputElement>): Promise<void> {
        if (!event.target.files && !event.target.files.length) {
          return
        }

        this.loading = true
        this.$emit('loading-file', { loading: this.loading })

        const file = event.target.files[0]
        if (!this.acceptedFilePattern.includes(file.type)) {
          this.$emit('has-error', 'File format not supported.')
          this.loading = false
          this.$emit('loading-file', { loading: this.loading })
          return
        }

        if (!file.type.includes('image')) {
          this.imageBlob = file
        } else {
          try {
            this.imageBlob = await resizeBlob(file, { width: window.outerWidth * 1.5 })
          } catch (e) {
            this.imageBlob = file
          }
        }

        this.loading = false
        this.imageName = file.name
        this.imageURL = getUrlFromBlob(this.imageBlob)

        this.$emit('loading-file', { loading: this.loading })
        this.$emit('file-selected', { blob: this.imageBlob, fileName: this.imageName })
      },
    },
  })
</script>

<style lang="postcss" scoped>
  .fileupload {
    background: var(--brand-white);
    border-radius: var(--base-radius);
    overflow: hidden;
    border: 2px solid var(--brand-white);
    font-family: 'FiraMono', 'Courier New', Courier, monospace;

    &.has-error {
      border-color: var(--brand-red);
    }

    &:focus {
      border-color: var(--brand-beige-dark);
      outline: none;
      box-shadow: 0 2px 9px var(--brand-beige-dark);
    }
  }

  .fileupload input[type='file'] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .fileupload-container {
    display: grid;
    grid-template-columns: 67px 1fr;

    & > div:not(.loading-icon) {
      padding: calc(var(--base-gap) * 1.5);
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      & .text {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    & > .loading-icon {
      background: var(--brand-beige-dark);
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--brand-white);
      height: 67px;

      &.loading svg {
        animation: spin 3s linear infinite;
      }

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
