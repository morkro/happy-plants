<template>
  <main class="main-wireframe">
    <plant-modal
      :show="showPlantModal"
      :name="name"
      @content-update="updateFromModal"
      @close-modal="closePlantEditModal"
      @delete-plant="deletePlantFromModal" />

    <plant-module-manager
      :show="showModuleManager"
      :modules="plantModules"
      @updated-modules="updateModules"
      @close-module-manager="cancelModuleManager" />

    <app-header
      :class="{ 'app-header': true, 'transparent': headerinView }"
      :color="headerinView ? 'white' : 'black'"
      :back-button="true">
      <button
        slot="custom-action-right"
        aria-label="Edit"
        :class="{ 'edit-data': true, 'icon': true, 'inverse': !headerinView }"
        @click.prevent="openPlantEditModal">
        <feather-edit />
      </button>
    </app-header>

    <section :class="{ 'view-content': true, 'no-modules': !modules.length, 'app-content': true }">
      <plant-header
        :name="name"
        :image-url="imageURL"
        :edit-mode="false"
        v-observe-visibility.60="observeVisibility" />

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
        :modified="modified"
        :created="created"
        @manage-modules="activateModuleManager" />
    </section>
  </main>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { getUrlFromBlob, isBlobbable } from '@/utils/blob'
  import AppHeader from '@/components/AppHeader'

  import PlantModuleManager from './components/PlantModuleManager'
  import PlantModal from './components/PlantModal'
  import PlantHeader from './components/PlantHeader'
  import PlantNotes from './components/PlantNotes'
  import PlantSeasons from './components/PlantSeasons'
  import PlantWatering from './components/PlantWatering'
  import PlantSunshine from './components/PlantSunshine'
  import PlantFooter from './components/PlantFooter'
  import { getPlantModules } from './utils'

  export default {
    name: 'PlantView',

    components: {
      'app-header': AppHeader,
      'plant-header': PlantHeader,
      'plant-module-manager': PlantModuleManager,
      'plant-modal': PlantModal,
      'plant-notes': PlantNotes,
      'plant-seasons': PlantSeasons,
      'plant-watering': PlantWatering,
      'plant-sunshine': PlantSunshine,
      'plant-footer': PlantFooter,
      'feather-edit': () =>
        import('vue-feather-icon/components/edit-2' /* webpackChunkName: "plant" */)
    },

    data: () => ({
      headerinView: true,
      showPlantModal: false,
      showModuleManager: false
    }),

    computed: {
      ...mapState({
        guid: state => state.selected.guid,
        name: state => state.selected.name,
        blob: state => state.selected.blob,
        imageURL: state => state.selected.imageURL,
        modules: state => state.selected.modules || [],
        categories: state => state.selected.categories,
        modified: state => state.selected.modified,
        created: state => state.selected.created
      }),
      ...mapGetters({
        getCategories: 'getPlantCategories'
      }),
      plantModules () {
        return getPlantModules().map(module =>
          Object.assign(module, {
            selected: !!this.modules.find(m => m.type === module.type)
          }))
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
        'resetSelectedState',
        'updatePlantsList',
        'deletePlants',
        'showNotification'
      ]),
      getPlantModuleProps (type) {
        const module = this.modules.find(mod => mod.type === type).value
        switch (type) {
          case 'watering':
            return {
              amount: module && module.level
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
            return this.onWaterLevelUpdate(event.payload)
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
      onWaterLevelUpdate (watering) {
        this.updateWatering({ guid: this.guid, watering })
      },
      onSunshineUpdate (sunshine) {
        this.updateSunshine({ guid: this.guid, sunshine })
      },
      updateFromModal ({ name, blob }) {
        const imageURL = isBlobbable(blob) ? getUrlFromBlob(blob) : this.imageURL
        this.updateName({ guid: this.guid, name })
        this.updatePhoto({ guid: this.guid, blob, imageURL })
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
        this.headerinView = visible
      }
    },

    mounted () {
      this.loadPlantItem(this.$route.params.id)
    },

    beforeDestroy () {
      this.updatePlantsList({ guid: this.guid, name: this.name, imageURL: this.imageURL })
        .then(() => this.resetSelectedState())
    }
  }
</script>

<style lang="postcss" scoped>
  .main-wireframe {
    padding-top: 0;
  }

  .app-header {
    transition:
      background calc(var(--base-speed) * 2) var(--ease-out-back),
      box-shadow var(--base-speed) var(--ease-out-back);

    &.transparent {
      background: transparent;
      box-shadow: none;
      transition:
        background calc(var(--base-speed) * 2) var(--ease-out-back),
        box-shadow var(--base-speed) var(--ease-out-back);
    }

    & .edit-data {
      position: relative;
      width: var(--app-header-size);
      min-height: var(--app-header-size);
      display: flex;
      justify-content: center;
      align-items: center;

      & svg {
        margin: 0;
        width: var(--icon-size-base);
        height: var(--icon-size-base);
        stroke: var(--text-color-button);
      }

      & svg polygon {
        stroke: var(--text-color-button);
      }
    }

    &.transparent .edit-data::before {
      background: rgba(0, 0, 0, 0.22);
      border-radius: 50%;
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: calc(var(--icon-size-base) * 2.5);
      height: calc(var(--icon-size-base) * 2.5);
      transform: translate(-50%, -50%);
      z-index: -1;
    }
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
      font-weight: 600;
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
