<template>
  <div class="main-wireframe">
    <plant-modal
      :show="showPlantModal"
      :name="name"
      :modified="modified"
      :created="created"
      @close-modal="closePlantEditModal"
      @delete-plant="deletePlantFromModal" />

    <plant-module-manager
      :show="showModuleManager"
      :modules="plantModules"
      @updated-modules="updateModules"
      @close-module-manager="cancelModuleManager" />

    <main :class="{ 'view-content': true, 'no-modules': !modules.length, 'app-content': true }">
      <plant-header
        :name="name"
        :image-url="imageURL"
        v-observe-visibility.60="observeVisibility"
        @update-name="updatePlantName"
        @update-photo="updatePlantPhoto" />

      <plant-tags
        v-if="Array.isArray(allTags)"
        :tags="allTags"
        @new-tag="addNewPlantTag"
        @remove-tag="removePlantTag"
        @hide-module="hidePlantTags" />

      <!--
        Plant modules are dynamically rendered since they
        can be added/removed and sorted.
      -->
      <component
        v-if="modules.length"
        v-for="module in modules"
        v-bind="getPlantModuleProps(module.type)"
        :key="module.type"
        :is="`plant-${module.type}`"
        @update-plant="getModuleListener" />

      <plant-footer
        :no-modules="!modules.length"
        :show-tag-button="allTags === false"
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
  import PlantFooter from './components/PlantFooter'
  import { getPlantModules } from './utils'

  export default {
    name: 'PlantView',

    meta () {
      return {
        title: this.name
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
      'plant-footer': PlantFooter
    },

    data: () => ({
      headerInView: true,
      showPlantModal: false,
      showModuleManager: false
    }),

    computed: {
      ...mapState({
        theme: state => state.settings.theme,
        guid: state => state.selected.guid,
        name: state => state.selected.name,
        blob: state => state.selected.blob,
        imageURL: state => state.selected.imageURL,
        modules: state => state.selected.modules || [],
        modified: state => state.selected.modified,
        created: state => state.selected.created,
        tags: state => state.selected.tags
      }),
      ...mapGetters({
        plantTags: 'getPlantTags'
      }),
      defaultIconColor () {
        return this.theme === 'light' ? 'black' : 'white'
      },
      allTags () {
        return this.tags && this.plantTags(this.guid)
      },
      plantModules () {
        return getPlantModules().map(module =>
          Object.assign(module, {
            selected: !!this.modules.find(m => m.type === module.type)
          }))
      }
    },

    watch: {
      headerInView (show) {
        this.updateAppHeader({
          transparent: show,
          iconColor: this.headerInView ? 'white' : this.defaultIconColor,
          showIconBackdrop: this.headerInView
        })
      }
    },

    methods: {
      ...mapActions([
        'loadPlantItem',
        'loadPlants',
        'updatePlantModules',
        'updateSeason',
        'updateNotes',
        'updateSunshine',
        'updateWatering',
        'updateName',
        'updatePhoto',
        'toggleTags',
        'addTag',
        'deleteTag',
        'resetSelectedState',
        'updatePlantsList',
        'deletePlants',
        'showNotification',
        'updateAppHeader'
      ]),
      getPlantModuleProps (type) {
        const module = this.modules.find(mod => mod.type === type).value
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
        this.updateNotes({ guid: this.guid, notes })
      },
      onSeasonUpdate (month) {
        this.updateSeason({ guid: this.guid, month })
      },
      onWateringUpdate (watering) {
        this.updateWatering({ guid: this.guid, watering })
      },
      onSunshineUpdate (sunshine) {
        this.updateSunshine({ guid: this.guid, sunshine })
      },
      deletePlantFromModal () {
        this.deletePlants([{ guid: this.guid }])
          .then(() => this.showNotification({
            message: 'Plant deleted.'
          }))
          .then(() => this.$router.push('/'))
      },
      activateModuleManager () {
        this.showModuleManager = true
      },
      cancelModuleManager () {
        this.showModuleManager = false
      },
      updateModules (updatedModules) {
        this.updatePlantModules(updatedModules.map(m => {
          const activateModule = this.modules.find(mod => mod.type === m.type)
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
          plants: [this.guid]
        })
      },
      removePlantTag (tag) {
        this.deleteTag({
          tag: tag.guid,
          plant: this.guid
        })
      },
      hidePlantTags () {
        this.toggleTags({ show: false })
      },
      showPlantTags () {
        this.toggleTags({ show: true })
      },
      updatePlantName (name) {
        this.updateName({ guid: this.guid, name })
      },
      updatePlantPhoto (blob) {
        const imageURL = isBlobbable(blob) ? getUrlFromBlob(blob) : this.imageURL
        this.updatePhoto({ guid: this.guid, blob, imageURL })
      }
    },

    created () {
      this.updateAppHeader({
        transparent: true,
        title: false,
        backBtn: true,
        settingsBtn: 'edit',
        settingsBtnOnClick: this.openPlantEditModal,
        iconColor: this.headerInView ? 'white' : this.defaultIconColor,
        showIconBackdrop: true
      })
    },

    mounted () {
      this.loadPlantItem(this.$route.params.id)
    },

    updated () {
      this.updateAppHeader({
        iconColor: this.headerInView ? 'white' : this.defaultIconColor,
        showIconBackdrop: this.headerInView
      })
    },

    beforeDestroy () {
      this.updateAppHeader({
        transparent: false,
        iconColor: this.defaultIconColor,
        showIconBackdrop: false
      })

      this.updatePlantsList({
        guid: this.guid,
        name: this.name,
        imageURL: this.imageURL,
        tags: this.tags
      }).then(() => this.resetSelectedState())
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
