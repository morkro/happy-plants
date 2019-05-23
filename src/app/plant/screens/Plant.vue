<template>
  <div class="main-wireframe">
    <plant-modal
      :show="showPlantModal"
      :name="plant.name"
      :modified="plant.modified"
      :created="plant.created"
      :loading="deletePlantProgress"
      @close-modal="closePlantEditModal"
      @delete-plant="deletePlantFromModal" />

    <plant-module-manager
      :show="showModuleManager"
      :modules="plantModules"
      :storage-type="storageType"
      @updated-modules="updateModules"
      @close-module-manager="cancelModuleManager" />

    <main :class="['view-content', 'app-content', { 'no-modules': plant.modules && !plant.modules.length }]">
      <div class="plant-content-upper">
        <plant-header
          :content-loading="plantLoading"
          :name="plant.name"
          :image-url="plant.imageURL"
          v-observe-visibility.60="observeVisibility"
          @update-name="updatePlantName"
          @update-photo="updatePlantPhoto" />

        <plant-tags
          v-if="Array.isArray(plant.tags)"
          :tags="allPlantTags"
          :all-tags="tags"
          @toggle-suggestions="onTogglePlantTags"
          @new-tag="addNewPlantTag"
          @remove-tag="removePlantTag"
          @hide-module="hidePlantTags" />
      </div>

      <div :class="['app-content-lower', { 'no-events': plantTagVisible }]">
        <!--
          Plant modules are dynamically rendered since they
          can be added/removed and sorted.
        -->
        <div v-if="plant.modules && plant.modules.length">
          <component
            v-for="module in plant.modules"
            v-bind="getPlantModuleProps(module.type)"
            :key="module.type"
            :is="`plant-${module.type}`"
            @update-plant="getModuleListener" />
        </div>

        <plant-footer
          :no-modules="plant.modules && !plant.modules.length"
          :show-tag-button="plant.tags === false"
          @manage-modules="activateModuleManager"
          @show-tags="showPlantTags" />
      </div>
    </main>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import { getUrlFromBlob, isBlobbable } from '@/utils/blob'

  import PlantModuleManager from '@/app/plant/components/PlantModuleManager'
  import PlantModal from '@/app/plant/components/PlantModal'
  import PlantHeader from '@/app/plant/components/PlantHeader'
  import PlantTags from '@/app/plant/components/PlantTags'
  import PlantNotes from '@/app/plant/components/PlantNotes'
  import PlantSeasons from '@/app/plant/components/PlantSeasons'
  import PlantWatering from '@/app/plant/components/PlantWatering'
  import PlantSunshine from '@/app/plant/components/PlantSunshine'
  import PlantGallery from '@/app/plant/components/PlantGallery'
  import PlantFooter from '@/app/plant/components/PlantFooter'
  import { getPlantModules } from '@/app/plant/utils'

  export default {
    name: 'PlantView',

    meta () {
      return {
        title: this.plant.name
      }
    },

    components: {
      'plant-header': PlantHeader,
      'plant-module-manager': PlantModuleManager,
      'plant-modal': PlantModal,
      'plant-tags': PlantTags,
      'plant-notes': PlantNotes,
      'plant-seasons': PlantSeasons,
      'plant-watering': PlantWatering,
      'plant-sunshine': PlantSunshine,
      'plant-gallery': PlantGallery,
      'plant-footer': PlantFooter
    },

    data: () => ({
      headerInView: true,
      showPlantModal: false,
      showModuleManager: false,
      deletePlantProgress: false,
      plantDataLoaded: false,
      plantTagVisible: false
    }),

    computed: {
      ...mapState({
        storageType: state => state.storage.type,
        theme: state => state.settings.theme,
        plantsData: state => state.plants.data,
        plantLoading: state => !state.plants.selected.guid,
        plantsFinished: state => state.plants.finished,
        plant: state => state.plants.selected,
        tags: state => state.tags.data,
        galleries: state => state.gallery,
        navigatingFromView: state => state.route.from.name
      }),
      ...mapGetters({
        plantTags: 'getPlantTags',
        plantGallery: 'getPlantGallery'
      }),
      defaultIconColor () {
        return this.theme === 'light' ? 'black' : 'white'
      },
      allPlantTags () {
        return this.plantTags(this.plant.guid)
      },
      plantModules () {
        return getPlantModules().map(module =>
          Object.assign(module, {
            selected: !!this.plant.modules && this.plant.modules.find(m => m.type === module.type)
          }))
      },
      isPhone () {
        return this.$mq === 'phone'
      }
    },

    watch: {
      headerInView (show) {
        if (!this.isPhone) return
        this.updateAppHeader({
          transparent: show,
          iconColor: this.headerInView ? 'white' : this.defaultIconColor,
          title: this.headerInView ? false : this.plant.name,
          showIconBackdrop: this.headerInView
        })
      },

      async plantsData (data) {
        if (data.length) {
          await this.loadPlantItem(this.$route.params.id)
        }
      },

      async plantsFinished (value, prevValue) {
        if (value && prevValue === false) {
          if (!this.galleries.finished && !this.galleries.loading) {
            await this.loadGallery(this.plant.guid)
          }
        }
      }
    },

    methods: {
      ...mapActions([
        'loadGallery',
        'loadPlantItem',
        'loadPlants',
        'updatePlantModules',
        'updateSeasonsModule',
        'updateNotesModule',
        'updateSunshineModule',
        'updateWateringModule',
        'updateName',
        'updatePhoto',
        'toggleTags',
        'addTag',
        'deleteTag',
        'updatePlantsList',
        'deletePlants',
        'showNotification',
        'updateAppHeader',
        'resetSelectedState'
      ]),
      getPlantModuleProps (type) {
        const module = this.plant.modules.find(mod => mod.type === type).value
        switch (type) {
          case 'watering':
            return {
              amount: module && (module.level || module.amount),
              frequency: module && module.frequency
            }
          case 'sunshine':
            return {
              intensity: module && module.level
            }
          case 'seasons':
            return {
              seasons: module.seasons
            }
          case 'gallery':
            return {
              gallery: this.plantGallery(this.plant.guid).list,
              list: module.list
            }
          case 'notes':
            return {
              content: module.notes
            }
        }
      },
      getModuleListener (event) {
        switch (event.type) {
          case 'watering':
            return this.onWateringUpdate(event.payload)
          case 'sunshine':
            return this.onSunshineUpdate(event.payload)
          case 'seasons':
            return this.onSeasonUpdate(event.payload)
          case 'notes':
            return this.onNotesUpdate(event.payload)
        }
      },
      openPlantEditModal () {
        this.showPlantModal = true
      },
      closePlantEditModal () {
        this.showPlantModal = false
      },
      onNotesUpdate (notes) {
        this.updateNotesModule({ guid: this.plant.guid, notes })
      },
      onSeasonUpdate (month) {
        this.updateSeasonsModule({ guid: this.plant.guid, month })
      },
      onWateringUpdate (watering) {
        this.updateWateringModule({ guid: this.plant.guid, watering })
      },
      onSunshineUpdate (sunshine) {
        this.updateSunshineModule({ guid: this.plant.guid, sunshine })
      },
      async deletePlantFromModal () {
        this.deletePlantProgress = true
        await this.deletePlants([{ guid: this.plant.guid }])
        this.deletePlantProgress = false

        this.showNotification({ message: 'Plant deleted.' })
        this.$router.push('/')
      },
      activateModuleManager () {
        this.showModuleManager = true
      },
      cancelModuleManager () {
        this.showModuleManager = false
      },
      updateModules (updatedModules) {
        this.updatePlantModules(updatedModules.map(m => {
          const activateModule = this.plant.modules.find(mod => mod.type === m.type)
          const defaultModule = this.plantModules.find(mod => mod.type === m.type)
          return {
            ...m,
            value: activateModule ? activateModule.value : defaultModule.value
          }
        }))
      },
      observeVisibility (visible) {
        this.headerInView = visible
      },
      addNewPlantTag (tag) {
        this.addTag({
          label: tag.label,
          name: tag.label.toLowerCase().replace(/\s/g, '-'),
          plants: [this.plant.guid]
        })
      },
      removePlantTag (tag) {
        this.deleteTag({
          tag: tag.guid,
          plant: this.plant.guid
        })
      },
      hidePlantTags () {
        this.toggleTags({ show: false })
      },
      showPlantTags () {
        this.toggleTags({ show: true })
      },
      updatePlantName (name) {
        this.updateName({ guid: this.plant.guid, name })
      },
      updatePlantPhoto (blob) {
        const imageURL = isBlobbable(blob) ? getUrlFromBlob(blob) : this.plant.imageURL
        this.updatePhoto({ guid: this.plant.guid, blob, imageURL })
      },
      onTogglePlantTags (visible) {
        this.plantTagVisible = visible
      }
    },

    async created () {
      if (!this.plant.guid) {
        await this.loadPlantItem(this.$route.params.id)
      }
    },

    async mounted () {
      this.updateAppHeader({
        transparent: this.isPhone,
        title: false,
        backBtn: true,
        backBtnPath: '/',
        rightBtn: 'edit',
        rightBtnOnClick: this.openPlantEditModal,
        iconColor: this.headerInView && this.isPhone ? 'white' : this.defaultIconColor,
        showIconBackdrop: this.isPhone
      })

      const galleryExists = this.galleries.data.some(g => g.guid === this.$route.params.id)
      if (
        (this.navigatingFromView && !this.galleries.finished && !this.galleries.loading) ||
        (!galleryExists && this.galleries.finished)
      ) {
        await this.loadGallery(this.plant.guid)
      }
    },

    beforeDestroy () {
      this.updateAppHeader({
        transparent: false,
        iconColor: this.defaultIconColor,
        showIconBackdrop: false
      })

      this.updatePlantsList({
        guid: this.plant.guid,
        name: this.plant.name,
        imageURL: this.plant.imageURL,
        tags: this.plant.tags
      }).then(() => {
        if (this.$route.name !== 'Gallery') {
          this.resetSelectedState()
        }
      })
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../../../styles/media-queries";

  .main-wireframe {
    padding-top: 0;

    @media (--min-desktop-viewport) {
      padding-top: var(--app-header-size);
    }
  }

  .app-content-upper,
  .app-content-lower {
    position: relative;

    &.no-events {
      pointer-events: none;
    }
  }

  .view-content {
    background-color: var(--background-secondary);
    min-height: 100vh;
    z-index: 0;

    @media (--min-desktop-viewport) {
      display: grid;
      grid-template-columns: 40% calc(60% - var(--base-gap));
      grid-template-areas: "left right";
      grid-column-gap: var(--base-gap);

      & > div:first-of-type {
        grid-area: left;
      }

      & > div:nth-of-type(2) {
        grid-area: right;
      }
    }

    &.no-modules {
      display: flex;
      flex-direction: column;
    }

    & h3 {
      font-weight: 500;
      font-size: var(--text-size-medium);
    }
  }

  .content-notes {
    padding: var(--base-gap);

    & h2,
    & p {
      margin-bottom: var(--base-gap);
    }
  }
</style>
