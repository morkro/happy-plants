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

    <main :class="{
      'view-content': true,
      'no-modules': plant.modules && !plant.modules.length,
      'app-content': true }">
      <plant-header
        :content-loading="plantsLoading"
        :name="plant.name"
        :image-url="plant.imageURL"
        v-observe-visibility.60="observeVisibility"
        @update-name="updatePlantName"
        @update-photo="updatePlantPhoto" />

      <plant-tags
        v-if="Array.isArray(plant.tags)"
        :tags="allPlantTags"
        :all-tags="tags"
        @new-tag="addNewPlantTag"
        @remove-tag="removePlantTag"
        @hide-module="hidePlantTags" />

      <!--
        Plant modules are dynamically rendered since they
        can be added/removed and sorted.
      -->
      <component
        v-if="plant.modules && plant.modules.length"
        v-for="module in plant.modules"
        v-bind="getPlantModuleProps(module.type)"
        :key="module.type"
        :is="`plant-${module.type}`"
        @update-plant="getModuleListener" />

      <plant-footer
        :no-modules="plant.modules && !plant.modules.length"
        :show-tag-button="plant.tags === false"
        @manage-modules="activateModuleManager"
        @show-tags="showPlantTags" />
    </main>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import { getUrlFromBlob, isBlobbable } from '@/utils/blob'

  import PlantModuleManager from './components/PlantModuleManager'
  import PlantModal from './components/PlantModal'
  import PlantHeader from './components/PlantHeader'
  import PlantTags from './components/PlantTags'
  import PlantNotes from './components/PlantNotes'
  import PlantSeasons from './components/PlantSeasons'
  import PlantWatering from './components/PlantWatering'
  import PlantSunshine from './components/PlantSunshine'
  import PlantGallery from './components/PlantGallery'
  import PlantFooter from './components/PlantFooter'
  import { getPlantModules } from './utils'

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
      plantDataLoaded: false
    }),

    computed: {
      ...mapState({
        storageType: state => state.storage.type,
        theme: state => state.settings.theme,
        plantsData: state => state.plants.data,
        plantsLoading: state => state.plants.loading,
        plant: state => state.plants.selected,
        tags: state => state.tags.data,
        galleries: state => state.gallery
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
      }
    },

    watch: {
      headerInView (show) {
        this.updateAppHeader({
          transparent: show,
          iconColor: this.headerInView ? 'white' : this.defaultIconColor,
          title: this.headerInView ? false : this.plant.name,
          showIconBackdrop: this.headerInView
        })
      },

      plantsData (data) {
        if (data.length) {
          this.loadPlantItem(this.$route.params.id)
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
      }
    },

    async created () {
      if (!(this.galleries.finished && this.galleries.loading)) {
        await this.loadGallery()
      }
    },

    mounted () {
      this.updateAppHeader({
        transparent: true,
        title: false,
        backBtn: true,
        backBtnPath: '/',
        rightBtn: 'edit',
        rightBtnOnClick: this.openPlantEditModal,
        iconColor: this.headerInView ? 'white' : this.defaultIconColor,
        showIconBackdrop: true
      })
      this.loadPlantItem(this.$route.params.id)
    },

    beforeDestroy () {
      this.updateAppHeader({
        transparent: false,
        iconColor: this.defaultIconColor,
        showIconBackdrop: false
      })

      if (this.$route.name !== 'Gallery') {
        this.updatePlantsList({
          guid: this.plant.guid,
          name: this.plant.name,
          imageURL: this.plant.imageURL,
          tags: this.plant.tags
        }).then(() => this.resetSelectedState())
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .main-wireframe {
    padding-top: 0;
  }

  .view-content {
    background-color: var(--background-secondary);
    min-height: 100vh;
    z-index: 0;

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
