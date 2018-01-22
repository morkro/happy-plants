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
      :modules="modules"
      @toggle-module="toggleModule"
      @close-module-manager="cancelModuleManager" />

    <app-header class="app-header" color="white" :back="true">
      <button
        slot="custom-action-right"
        aria-label="Edit"
        class="edit-data icon"
        @click.prevent="openPlantEditModal">
        <feather-edit />
      </button>
    </app-header>

    <section class="view-content">
      <header>
        <div :class="{ 'is-skeleton': !name, 'no-photo': !imageURL, 'header-content': true }">
          <h1>{{ name }}</h1>
        </div>
        <div class="header-background">
          <img v-if="imageURL" :src="imageURL" :alt="name" />
          <svgicon
            v-else
            icon="cactus"
            width="50"
            height="50"
            color="#000">
          </svgicon>
        </div>
      </header>

      <!--
        Components are dynamically rendered since they
        can be added/removed and sorted.
      -->
      <component
        v-for="component in componentOrder"
        v-bind="getComponentProps(component)"
        :key="component"
        :is="`plant-${component}`"
        @update-plant="getComponentListener">
      </component>

      <plant-footer
        :modified="modified"
        :created="created"
        @manage-modules="activateModuleManager">
      </plant-footer>
    </section>
  </main>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { getUrlFromBlob, isBlobbable } from '@/utils/blob'
  import getDefaultStructure from '@/utils/get-default-structure'
  import AppHeader from '@/components/AppHeader'

  import PlantModuleManager from './components/PlantModuleManager'
  import PlantModal from './components/PlantModal'
  import PlantNotes from './components/PlantNotes'
  import PlantSeasons from './components/PlantSeasons'
  import PlantWatering from './components/PlantWatering'
  import PlantSunshine from './components/PlantSunshine'
  import PlantFooter from './components/PlantFooter'
  import getPlantModules from './get-modules'
  import '@/assets/cactus'

  const defaultState = getDefaultStructure()

  export default {
    name: 'PlantView',

    components: {
      'app-header': AppHeader,
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
      showPlantModal: false,
      showModuleManager: false,
      modules: getPlantModules()
    }),

    computed: mapState({
      guid: state => state.selected.guid,
      name: state => state.selected.name,
      blob: state => state.selected.blob,
      imageURL: state => state.selected.imageURL,
      componentOrder: state => (
        state.selected.componentOrder ||
        defaultState.componentOrder
      ),
      seasons: state => state.selected.seasons,
      notes: state => state.selected.notes,
      watering: state => state.selected.watering,
      sunshine: state => state.selected.sunshine,
      modified: state => state.selected.modified,
      created: state => state.selected.created
    }),

    methods: {
      ...mapActions([
        'loadPlantItem',
        'loadPlants',
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
      getComponentProps (componentName) {
        switch (componentName) {
          case 'watering':
            return {
              amount: this.watering && this.watering.level
            }
          case 'sunshine':
            return {
              intensity: this.sunshine && this.sunshine.intensity
            }
          case 'seasons':
            return {
              seasons: this.seasons
            }
          case 'notes':
            return {
              content: this.notes
            }
        }
      },
      getComponentListener (event) {
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
      toggleModule (module) {
        console.log(module)
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

<style lang="scss" scoped>
  @import "~styles/animations";

  .main-wireframe {
    padding-top: 0;
  }

  .app-header {
    background: transparent;
    box-shadow: none;

    .edit-data {
      position: relative;
      width: var(--app-header-size);
      min-height: var(--app-header-size);
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        margin: 0;
        stroke: var(--text-color-button);
        width: var(--icon-size-base);
        height: var(--icon-size-base);
      }

      svg polygon {
        stroke: var(--text-color-button);
      }
    }

    .edit-data::before {
      background: rgba(0, 0, 0, 0.22);
      border-radius: 50%;
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: calc(var(--icon-size-base) + var(--base-gap));
      height: calc(var(--icon-size-base) + var(--base-gap));
      transform: translate(-50%, -50%);
      z-index: -1;
    }
  }

  .view-content {
    background-color: var(--background-secondary);
    min-height: 100vh;

    h3 {
      font-weight: 600;
      font-size: var(--text-size-medium);
    }
  }

  .view-content header {
    position: relative;
    color: var(--text-color-inverse);
    height: 100vw;
    background: var(--grey);

    h1 {
      padding: var(--base-gap);
      font-size: var(--text-size-large);
      font-weight: 600;
      color: var(--text-color-inverse);
      line-height: 115%;
    }

    .header-content {
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

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .header-background {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 65% !important;
        height: auto !important;
        opacity: 0.12;
      }
    }
  }

  .content-notes {
    padding: var(--base-gap);

    h2,
    p {
      margin-bottom: var(--base-gap);
    }
  }
</style>
