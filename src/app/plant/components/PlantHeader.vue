<template>
  <header class="plant-header">
    <div class="plant-header-view">
      <div :class="{ 'is-skeleton': !name, 'no-photo': !imageUrl, 'header-content': true }">
        <v-touch tag="h1"
          @tap="updateTitle"
          :contenteditable="editTitle"
          @blur.native="emitTitleUpdate">
          {{ name }}
        </v-touch>
      </div>
      <v-touch class="header-background" @tap="uploadPhoto">
        <div class="header-upload" v-if="showUploadInfo">
          <div v-if="photoLoading">
            <feather-aperture stroke="white" />
          </div>

          <div v-else>
            <feather-image stroke="white" />
            <span>Tap again to upload photo</span>
          </div>

          <file-upload
            ref="plantHeaderUpload"
            name="header-file"
            :trigger-upload="triggerUpload"
            :disable-preview="true"
            @loading-file="handleLoadingState"
            @file-selected="assignNewPhoto" />
        </div>
        <img
          v-if="imageUrl"
          :src="imageUrl"
          :alt="name">
        <svgicon
          v-else
          icon="cactus"
          width="50"
          height="50"
          color="#000" />
      </v-touch>
    </div>
  </header>
</template>

<script>
  import FileUpload from '@/components/FileUpload'
  import '@/assets/cactus'
  export default {
    name: 'PlantHeader',

    props: {
      name: { type: [String, Boolean], default: false },
      imageUrl: { type: [String, Boolean], default: false }
    },

    components: {
      'file-upload': FileUpload,
      'feather-image': () =>
        import('vue-feather-icon/components/image' /* webpackChunkName: "plant" */),
      'feather-aperture': () =>
        import('vue-feather-icon/components/aperture' /* webpackChunkName: "plant" */)
    },

    data: () => ({
      editTitle: false,
      showUploadInfo: false,
      triggerUpload: false,
      photoLoading: false
    }),

    methods: {
      updateTitle () {
        this.editTitle = true
      },

      emitTitleUpdate (event) {
        this.editTitle = false
        if (event.target && event.target.textContent) {
          this.$emit(
            'update-name',
            event.target.textContent.trim().replace(/\s\s+/g, ' ')
          )
        }
      },

      uploadPhoto () {
        if (!this.showUploadInfo) {
          this.showUploadInfo = true
          setTimeout(() => {
            if (!this.triggerUpload) this.showUploadInfo = false
          }, 3000)
          return
        }

        this.triggerUpload = true
      },

      handleLoadingState ({ loading }) {
        this.photoLoading = loading
      },

      assignNewPhoto (data) {
        console.log('ASSIGN PHOTO', data)
        this.showUploadInfo = false
        this.photoLoading = false
        this.triggerUpload = false

        if (!data.blob) {
          return
        }

        this.$emit('update-photo', data.blob)
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .plant-header {
    position: relative;
    color: var(--text-color-inverse);
    height: 100vw;
    background: var(--grey);
    z-index: 1;
  }

  .plant-header-view {
    height: 100%;

    & h1 {
      padding: var(--base-gap);
      font-size: var(--text-size-large);
      font-weight: 600;
      color: var(--text-color-inverse);
      line-height: 115%;
      position: relative;
      width: 100%;

      &[contenteditable="true"] {
        outline: none;
        background: var(--transparency-black-medium);
      }
    }

    & .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      position: absolute;
      bottom: 0;
      width: 100%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
      z-index: 1;

      &.no-photo {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
      }
    }

    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 0;
    }

    & .header-background {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      & > svg {
        width: 65% !important;
        height: auto !important;
        opacity: 0.12;
      }
    }

    & .header-upload {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: var(--transparency-black-medium);
      color: var(--text-color-inverse);

      & > div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      & svg {
        margin-bottom: var(--base-gap);
      }

      & .file-upload {
        position: absolute;
        left: 0;
        transform: translateX(-100%);
        height: 0;
        opacity: 0;
      }
    }
  }
</style>
