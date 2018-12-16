<template>
  <div :class="['main-wireframe', { fullscreen }]">
    <gallery-dialog
      id="gallery-dialog"
      app-root=".main-wireframe"
      :show="showDialog"
      @close-dialog="closeDialog">
      <span slot="headline">{{ uploadedPhotoName }}</span>

      <div class="gallery-dialog-content">
        <img
          :alt="uploadedPhotoName"
          :title="uploadedPhotoName"
          :src="uploadedPhoto">

        <v-button :loading="addGalleryItemProgress" @click.native="addPhotoToGallery">
          Add photo
        </v-button>
      </div>
    </gallery-dialog>

    <main class="app-content">
      <div v-if="fullscreen" class="gallery-options">
        <div class="gallery-steps">
          <span>{{ listIndex + 1 }}</span>
          <span>/</span>
          <span>{{ galleryData.length }}</span>
        </div>
        <v-button
          type="circle"
          class="gallery-delete icon inverse"
          @click.native="deletePhoto">
          <feather-trash slot="icon" />
        </v-button>
      </div>

      <div v-if="!fullscreen" class="gallery-add">
        <file-upload
          ref="galleryUpload"
          name="add-gallery-file"
          :disable-preview="true"
          @file-selected="getPhoto" />

        <v-button
          aria-label="Add photo"
          type="circle"
          @click.native="openAddPhoto">
          <div slot="icon" class="add-photo-icon">
            <feather-plus />
            <feather-image />
          </div>
        </v-button>
      </div>

      <div v-if="galleryData.length" class="gallery-list-wrapper">
        <selectable-list
          class="gallery-list"
          ref="galleryList"
          :items="galleryData"
          :style="listStyle"
          :pan-options="{ direction: 'horizontal' }"
          @selected="getSelectedItems"
          @tap="showGallery"
          @panend="moveGallery">
          <lazy-image
            slot-scope="{ data }"
            v-if="data.imageURL"
            :source="data.imageURL"
            :alt="data.fileName" />
        </selectable-list>
      </div>
    </main>
  </div>
</template>

<script>
  import uuid from 'uuid/v4'
  import { mapState, mapActions } from 'vuex'
  import { getUrlFromBlob, isBlobbable } from '@/utils/blob'

  import LazyImage from '@/components/LazyImage'
  import Button from '@/components/Button'
  import HappyDialog from '@/components/HappyDialog'
  import FileUpload from '@/components/FileUpload'
  import SelectableList from '@/components/SelectableList'

  import getGalleryItemStructure from './utils/get-gallery-item-structure'

  export default {
    name: 'Gallery',

    meta () {
      return {
        title: this.plant.name
      }
    },

    components: {
      'lazy-image': LazyImage,
      'v-button': Button,
      'gallery-dialog': HappyDialog,
      'file-upload': FileUpload,
      'selectable-list': SelectableList,
      'feather-plus': () =>
        import('vue-feather-icons/icons/PlusIcon' /* webpackChunkName: "icons" */),
      'feather-trash': () =>
        import('vue-feather-icons/icons/TrashIcon' /* webpackChunkName: "icons" */),
      'feather-image': () =>
        import('vue-feather-icons/icons/ImageIcon' /* webpackChunkName: "icons" */)
    },

    data: () => ({
      addGalleryItemProgress: false,
      fullscreen: false,
      showDialog: false,
      listDelta: 0,
      uploadedBlob: null,
      uploadedPhoto: null,
      uploadedPhotoName: null
    }),

    computed: {
      ...mapState({
        plantsData: state => state.plants.data,
        plant: state => state.selected
      }),
      galleryData () {
        return this.plant.modules.find(module => module.type === 'gallery').value.list
      },
      listStyle () {
        return {
          transform: `translateX(${this.listDelta}vw)`
        }
      },
      listIndex () {
        return (this.listDelta / 100 * -1)
      }
    },

    watch: {
      plantsData (data) {
        if (data.length) {
          this.loadPlantItem(this.$route.params.id)
        }
      },
      listDelta (delta) {
        const $galleryEl = this.$refs.galleryList.$el
        const $prevActiveEl = $galleryEl.querySelector('li.active')
        const $nextActiveEl = $galleryEl.children[-(delta / 100)]

        if ($prevActiveEl) {
          $prevActiveEl.classList.remove('active')
        }

        if ($nextActiveEl) {
          $nextActiveEl.classList.add('active')
        }
      }
    },

    methods: {
      ...mapActions([
        'updateAppHeader',
        'loadPlantItem',
        'updateGallery'
      ]),
      showGallery (event) {
        const $selectedEl = event.target.closest('li')
        if ($selectedEl) {
          const index = Array
            .from(this.$refs.galleryList.$el.children)
            .findIndex($el => $el === $selectedEl)

          $selectedEl.classList.add('active')
          this.listDelta = -1 * (index * 100)
        }
        this.activateFullscreen()
      },
      closeGallery () {
        const $activeEl = this.$refs.galleryList.$el.querySelector('li.active')
        if ($activeEl) {
          $activeEl.classList.remove('active')
        }
        this.deactivateFullscreen()
      },
      moveGallery (event) {
        if (!this.fullscreen) return

        this.setGalleryAnimation()

        const isLastItem = this.listIndex === (this.galleryData.length - 1)
        if (event.additionalEvent === 'panleft' && !isLastItem) {
          this.listDelta -= 100
        } else if (event.additionalEvent === 'panright' && this.listDelta !== 0) {
          this.listDelta += 100
        }
      },
      activateFullscreen () {
        this.fullscreen = true
        this.updateAppHeader({
          transparent: true,
          title: false,
          backBtn: false,
          rightBtn: 'close',
          rightBtnOnClick: this.closeGallery
        })
      },
      deactivateFullscreen () {
        this.$refs.galleryList.$el.classList.remove('animated')
        this.fullscreen = false
        this.listDelta = 0
        this.updateAppHeader({
          transparent: false,
          title: 'Gallery',
          backBtn: true,
          rightBtn: false
        })
      },
      setGalleryAnimation () {
        const $galleryEl = this.$refs.galleryList.$el
        if (!$galleryEl.classList.contains('animated')) {
          $galleryEl.classList.add('animated')
        }
      },
      deletePhoto () {
        console.log('delete this photo pls')
        console.log(this.galleryData[this.listIndex])
      },
      openAddPhoto () {
        this.$refs.galleryUpload.triggerUpload()
      },
      closeDialog () {
        this.showDialog = false
      },
      getPhoto (data) {
        if (!data.blob) return

        this.uploadedBlob = data.blob
        this.uploadedPhoto = isBlobbable(data.blob) && getUrlFromBlob(data.blob)
        this.uploadedPhotoName = data.fileName
        this.showDialog = true
      },
      clearPhoto () {
        this.uploadedBlob = null
        this.uploadedPhoto = null
        this.uploadedPhotoName = null
      },
      async addPhotoToGallery () {
        this.addGalleryItemProgress = true
        const data = Object.assign({}, getGalleryItemStructure(), {
          guid: uuid(),
          created: Date.now(),
          fileName: this.uploadedPhotoName,
          imageURL: this.uploadedPhoto,
          blob: this.uploadedBlob
        })
        await this.updateGallery(data)
        this.addGalleryItemProgress = false

        this.closeDialog()
        this.clearPhoto()
      },
      async getSelectedItems (list) {
        for (const item of list) {
          await this.updateGallery(item)
        }
        this.$refs.galleryList.clearSelection()
      }
    },

    created () {
      this.updateAppHeader({
        title: 'Gallery',
        backBtn: true,
        backBtnPath: `/plant/${this.$route.params.id}`,
        rightBtn: false
      })
    },

    mounted () {
      if (this.$route.query.openUpload) {
        this.$refs.galleryUpload.triggerUpload()
      }

      if (!this.plant.guid) {
        this.loadPlantItem(this.$route.params.id)
      }
    },

    beforeDestroy () {
      if (this.fullscreen) this.fullscreen = false
    }
  }
</script>

<style lang="postcss" scoped>
  .main-wireframe {
    min-height: 100vh;
    justify-content: flex-flex-start;
    background: var(--background-secondary);

    &.fullscreen {
      background: var(--custom-black);
    }
  }

  .app-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
  }

  .gallery-add {
    position: fixed;
    bottom: var(--base-gap);
    z-index: 1;

    & .file-upload {
      position: absolute;
      left: 0;
      transform: translateX(-100%);
      height: 0;
      opacity: 0;
    }

    & .add-photo-icon {
      transform: translate(1px, 2px);

      & svg:nth-of-type(1) {
        position: absolute;
        background: var(--button-background);
        border-radius: 50%;
        transform: scale(0.8) translateY(-9px) translateX(-9px);
      }
    }
  }

  .gallery-dialog-content {
    & img,
    & button {
      width: 100%;
    }
  }

  .gallery-options {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: var(--app-footer-size);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--base-gap);

    & .gallery-steps {
      align-self: center;
      color: var(--text-color-inverse);
      background: var(--custom-black);
      padding:
        calc(var(--base-gap) / 4)
        calc(var(--base-gap) / 2);
      border-radius: var(--border-radius);
      font-size: var(--text-size-xsmall);
    }

    & .gallery-delete {
      background: transparent;
      box-shadow: none;
    }
  }

  .gallery-list-wrapper {
    width: 100%;
  }

  .gallery-list {
    list-style: none;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    width: 100%;
    --preview-size: calc(50vw - 0.125 * var(--base-gap));

    @nest .fullscreen & {
      align-self: flex-start;
      flex-flow: nowrap;
    }

    @nest .fullscreen &.animated {
      transition: transform 100ms ease-in-out;
    }

    & >>> li {
      width: var(--preview-size);
      height: var(--preview-size);

      &:not(:last-child) {
        margin-bottom: calc(0.25 * var(--base-gap));
      }
    }

    @nest .fullscreen & >>> li {
      width: 100vw;
      height: calc(100vh - var(--double-gap) - var(--app-header-size));
      flex: 0 0 auto;
      padding: 0 var(--base-gap);
      border-radius: none;
      margin-bottom: 0;

      &:last-child:not(:nth-child(even))::after {
        display: none;
      }
    }

    & >>> li > div {
      width: 100%;
      height: 100%;
    }

    @nest .fullscreen & >>> .lazy-image {
      --preview-background: transparent !important;
    }

    @nest .fullscreen & >>> .lazy-image img {
      object-fit: contain !important;
    }
  }
</style>
