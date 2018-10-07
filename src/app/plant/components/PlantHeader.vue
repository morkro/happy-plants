<template>
  <section class="plant-header">
    <div class="plant-header-view">
      <div :class="{ 'is-skeleton': contentLoading, 'no-photo': !imageUrl, 'header-content': true }">
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
          v-if="!contentLoading && imageUrl"
          :src="imageUrl"
          :alt="name">

        <svgicon
          v-else-if="!imageUrl"
          icon="cactus"
          width="50"
          height="50"
          color="#000" />
      </v-touch>
    </div>
  </section>
</template>

<script>
  import FileUpload from '@/components/FileUpload'
  import '@/assets/icons/cactus'
  export default {
    name: 'PlantHeader',

    props: {
      name: { type: [String, Boolean], default: false },
      imageUrl: { type: [String, Boolean], default: false },
      contentLoading: { type: Boolean, default: true }
    },

    components: {
      'file-upload': FileUpload,
      'feather-image': () =>
        import('vue-feather-icons/icons/ImageIcon' /* webpackChunkName: "icons" */),
      'feather-aperture': () =>
        import('vue-feather-icons/icons/ApertureIcon' /* webpackChunkName: "icons" */),
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */)
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

        // If the user cancels the input selection, their will be left
        // with a showUploadInfo state. On another tap on the element, we reset it.
        if (this.showUploadInfo && this.triggerUpload) {
          return this.clearState()
        }

        this.triggerUpload = true
      },

      handleLoadingState ({ loading }) {
        this.photoLoading = loading
      },

      clearState () {
        this.showUploadInfo = false
        this.photoLoading = false
        this.triggerUpload = false
      },

      assignNewPhoto (data) {
        this.clearState()

        if (!data.blob) {
          return
        }

        this.$emit('update-photo', data.blob)
      }
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../../../styles/media-queries";

  .plant-header {
    --header-background: var(--grey);
    --header-color: var(--text-color-inverse);

    position: relative;
    color: var(--text-color-inverse);
    height: 100vw;
    background: var(--header-background);
    z-index: 1;

    @nest html[data-theme="dark"] & {
      --header-background: var(--dark-grey);
      --header-color: white;
    }

    @media (--min-desktop-viewport) {
      height: 50vh;
    }
  }

  .plant-header-view {
    height: 100%;

    & h1 {
      padding: var(--base-gap);
      font-size: var(--text-size-large);
      font-weight: 500;
      color: var(--header-color);
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

      &.is-skeleton h1 {
        color: transparent;
        overflow: hidden;

        &::after {
          content: "";
          height: 22px;
          width: 75%;
          display: block;
          border-radius: var(--border-radius);
          background: var(--background-primary);
          bottom: var(--base-gap);
          position: absolute;
        }
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
