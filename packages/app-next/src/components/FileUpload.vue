<template>
  <div class="fileupload">
    <input ref="fileInput" type="file" :id="id" :accept="acceptedFilePattern" @change="emitPhoto" />

    <div class="fileupload-preview">
      <span class="loading-icon">
        <feather-loader v-if="loading" />
        <feather-image v-else-if="!loading && !imageBlob" />
        <img v-else :src="imageURL" />
      </span>
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
      accepts: { type: [Array, String], default: () => ['.png', '.jpg', '.jpeg'] },
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
      acceptedFilePattern() {
        return Array.isArray(this.accepts) ? this.accepts.join(', ') : this.accepts
      },
    },
    methods: {
      triggerUpload() {
        ;(this.$refs.fileInput as HTMLInputElement).click()
      },
      async emitPhoto(event: HTMLElementEvent<HTMLInputElement>) {
        if (!event.target.files && !event.target.files.length) {
          return
        }

        this.loading = true
        this.$emit('loading-file', { loading: this.loading })

        const file = event.target.files[0]
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
  .fileupload input[type='file'] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
</style>
