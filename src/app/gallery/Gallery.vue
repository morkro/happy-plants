<template>
  <div :class="['main-wireframe', { fullscreen }]">
    <happy-dialog
      id="gallery-dialog"
      app-root=".main-wireframe"
      :show="showDialog"
      @close-dialog="closeDialog">
      <span slot="headline">{{ uploadedPhotoName }}</span>

      <div class="happy-dialog-content">
        <div class="gallery-preview-photo">
          <img
            :alt="uploadedPhotoName"
            :title="uploadedPhotoName"
            :src="uploadedPhoto">
        </div>

        <v-button :loading="addGalleryItemProgress" @click.native="addPhotoToGallery">
          Add photo
        </v-button>
      </div>
    </happy-dialog>

    <main class="app-content">
      <gallery-options
        v-if="fullscreen"
        :current="listIndex + 1"
        :total="galleryData.length"
        @delete-photo="deletePhoto" />

      <gallery-upload
        v-if="!fullscreen"
        ref="galleryUpload"
        :edit-mode="listEditMode"
        :loading="deleteGalleryItemProgress"
        @photo-selected="getPhoto"
        @trigger-selection="openAddPhoto"
        @trigger-delete="deleteSelectedPhotos" />

      <div v-if="galleryData.length" class="gallery-list-wrapper">
        <v-button
          v-if="fullscreen"
          :disabled="listIndex === 0"
          :type="['circle', 'small']"
          class="gallery-control-prev icon inverse"
          aria-label="Previous photo"
          @click.native="moveGallery('right')">
          <feather-left slot="icon" />
        </v-button>

        <v-button
          v-if="fullscreen"
          :disabled="listIndex === (galleryData.length - 1)"
          :type="['circle', 'small']"
          class="gallery-control-next icon inverse"
          aria-label="Next photo"
          @click.native="moveGallery('left')">
          <feather-right slot="icon" />
        </v-button>

        <selectable-list
          class="gallery-list"
          ref="galleryList"
          :items="galleryData"
          :style="listStyle"
          :pan-options="{ direction: 'horizontal' }"
          @tap="showGallery"
          @selected="getSelectedItems"
          @panend="moveGallery"
          @edit-mode="toggleListEditMode">
            <gallery-image
              slot-scope="{ data, selected }"
              v-if="data.imageURL"
              :source="data.imageURL"
              :name="data.fileName"
              :selectable="listEditMode"
              :selected="selected" />
        </selectable-list>
      </div>
    </main>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { getUrlFromBlob, isBlobbable } from '@/utils/blob'

  import GalleryOptions from './components/GalleryOptions'
  import GalleryUpload from './components/GalleryUpload'
  import GalleryImage from './components/GalleryImage'

  import { getGalleryItemStructure } from './utils/get-gallery-structure'

  export default {
    name: 'Gallery',

    meta () {
      return {
        title: this.plant.name
      }
    },

    components: {
      'gallery-options': GalleryOptions,
      'gallery-upload': GalleryUpload,
      'gallery-image': GalleryImage,
      'feather-left': () =>
        import('vue-feather-icons/icons/ArrowLeftIcon' /* webpackChunkName: "icons" */),
      'feather-right': () =>
        import('vue-feather-icons/icons/ArrowRightIcon' /* webpackChunkName: "icons" */)
    },

    data: () => ({
      addGalleryItemProgress: false,
      deleteGalleryItemProgress: false,
      fullscreen: false,
      showDialog: false,
      listDelta: 0,
      uploadedBlob: null,
      uploadedPhoto: null,
      uploadedPhotoName: null,
      listEditMode: false,
      selectedItemsList: []
    }),

    computed: {
      ...mapState({
        plantsLoaded: ({ plants }) => plants.finished && !plants.loading,
        plantsData: state => state.plants.data,
        plant: state => state.plants.selected,
        gallery: state => state.gallery
      }),
      galleryData () {
        const gallery = this.gallery.data.find(g => g.guid === this.$route.params.id)
        return gallery ? gallery.list : []
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
      },

      async plantsLoaded (value, prevValue) {
        if (value && prevValue === false) {
          if (!this.gallery.finished && !this.gallery.loading) {
            await this.loadGallery(this.$route.params.id)
          }
        }
      }
    },

    methods: {
      ...mapActions([
        'updateAppHeader',
        'loadPlantItem',
        'loadPlants',
        'loadGallery',
        'addGalleryItem',
        'deleteGalleryItem',
        'showNotification'
      ]),
      defaultAppHeader () {
        this.updateAppHeader({
          transparent: false,
          title: 'Gallery',
          backBtn: true,
          rightBtn: false
        })
      },
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

        const eventLeft = event === 'left' || event.additionalEvent === 'panleft'
        const eventRight = event === 'right' || event.additionalEvent === 'panright'
        const isLastItem = this.listIndex === (this.galleryData.length - 1)

        if (eventLeft && !isLastItem) {
          this.listDelta -= 100
        } else if (eventRight && this.listDelta !== 0) {
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
        this.defaultAppHeader()
      },
      setGalleryAnimation () {
        const $galleryEl = this.$refs.galleryList.$el
        if (!$galleryEl.classList.contains('animated')) {
          $galleryEl.classList.add('animated')
        }
      },
      async deletePhoto () {
        this.deleteGalleryItemProgress = true
        await this.deleteGalleryItem({
          guid: this.$route.params.id,
          item: this.galleryData[this.listIndex]
        })
        this.deleteGalleryItemProgress = false
        this.showNotification({ message: 'Photo deleted.' })
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
        await this.addGalleryItem({
          guid: this.$route.params.id,
          item: {
            ...getGalleryItemStructure(),
            fileName: this.uploadedPhotoName,
            imageURL: this.uploadedPhoto,
            blob: this.uploadedBlob
          }
        })
        this.addGalleryItemProgress = false

        this.closeDialog()
        this.clearPhoto()
      },
      toggleListEditMode (value) {
        this.listEditMode = value
        if (this.listEditMode) {
          this.updateAppHeader({
            title: `0 selected`,
            backBtn: false,
            rightBtn: 'close',
            rightBtnOnClick: () => this.$refs.galleryList.clearSelection()
          })
        } else {
          this.defaultAppHeader()
        }
      },
      getSelectedItems (list) {
        this.selectedItemsList = list
        this.updateAppHeader({
          title: `${this.selectedItemsList.length} selected`
        })
      },
      async deleteSelectedPhotos () {
        this.deleteGalleryItemProgress = true
        for (const item of this.selectedItemsList) {
          await this.deleteGalleryItem({
            guid: this.$route.params.id,
            item
          })
        }
        this.deleteGalleryItemProgress = false

        const selectedCount = this.selectedItemsList.length
        this.showNotification({
          message: selectedCount > 1
            ? `${selectedCount} photos deleted.`
            : `${selectedCount} photo deleted.`
        })

        if (this.$refs.galleryList) {
          this.$refs.galleryList.clearSelection()
        } else {
          this.toggleListEditMode(false)
        }
      }
    },

    async created () {
      this.updateAppHeader({
        title: 'Gallery',
        backBtn: true,
        backBtnPath: `/plant/${this.$route.params.id}`,
        rightBtn: false
      })

      if (!this.plant.guid) {
        await this.loadPlantItem(this.$route.params.id)
      }
    },

    mounted () {
      if (this.$route.query.openUpload) {
        this.$refs.galleryUpload.triggerUpload()
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

  .happy-dialog-content {
    & button {
      width: 100%;
    }

    & img {
      width: 100%;
      vertical-align: middle;
    }

    & .gallery-preview-photo {
      width: 100%;
      height: auto;
      overflow: hidden;
      border-radius: var(--border-radius);
    }
  }

  .gallery-list-wrapper {
    width: 100%;

    & [class^="gallery-control"] {
      position: fixed;
      z-index: 2;
      top: 50%;
      transform: translateY(-50%);
      --button-background: var(--transparency-black-medium);
      --button-shadow: var(--transparency-black-medium);
      --button-focus: var(--transparency-black-medium);

      &[disabled] {
        opacity: 0.5;
      }
    }

    & .gallery-control-prev {
      left: var(--base-gap);
    }

    & .gallery-control-next {
      right: var(--base-gap);
    }
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
