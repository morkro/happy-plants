<template>
  <main class="main-wireframe">
    <plant-modal
      :show="showPlantModal"
      :name="name"
      @content-update="updateFromModal"
      @close-modal="closePlantEditModal">
    </plant-modal>

    <app-header class="app-header" color="white" :back="true"></app-header>

    <section class="view-content">
      <header>
        <div :class="{ 'is-skeleton': !name, 'no-photo': !imageURL, 'header-content': true }">
          <h1>{{ name }}</h1>
          <button
            aria-label="Edit"
            class="edit-data icon inverse"
            @click.prevent="openPlantEditModal">
            <feather-edit />
          </button>
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

      <plant-updates
        :modified="modified">
      </plant-updates>
    </section>
  </main>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { getUrlFromBlob, isBlobbable } from '@/utils/blob'
  import getDefaultStructure from '@/utils/getDefaultStructure'
  import AppHeader from '@/components/AppHeader'
  import PlantModal from './PlantModal'
  import PlantNotes from './PlantNotes'
  import PlantSeasons from './PlantSeasons'
  import PlantWatering from './PlantWatering'
  import PlantSunshine from './PlantSunshine'
  import PlantUpdates from './PlantUpdates'
  import '@/assets/cactus'

  const defaultState = getDefaultStructure()

  export default {
    name: 'PlantView',

    components: {
      'app-header': AppHeader,
      'plant-modal': PlantModal,
      'plant-notes': PlantNotes,
      'plant-seasons': PlantSeasons,
      'plant-watering': PlantWatering,
      'plant-sunshine': PlantSunshine,
      'plant-updates': PlantUpdates,
      'feather-edit': () =>
        import('vue-feather-icon/components/edit-2' /* webpackChunkName: "plant" */)
    },

    data: () => ({
      showPlantModal: false
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
      modified: state => state.selected.modified
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
        'updatePlantsList'
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
  @import "~styles/colors";
  @import "~styles/fonts";
  @import "~styles/layout";
  @import "~styles/animations";

  .main-wireframe {
    padding-top: 0;
  }

  .app-header {
    background: transparent;
    box-shadow: none;
  }

  .view-content {
    background-color: $background-secondary;
    min-height: 100vh;

    h3 {
      font-weight: 600;
      font-size: $text-size-medium;
    }
  }

  .view-content header {
    position: relative;
    color: $text-color-inverse;
    height: 100vw;
    background: $grey;

    .edit-data {
      padding: $base-gap + 5;
      z-index: 2;

      svg {
        margin: 0;
        filter: invert(1); /* FIXME: Not a good solution, should use color instead. */
      }
    }

    h1 {
      padding: $base-gap;
      font-size: $text-size-large;
      font-weight: 600;
      color: $text-color-inverse;
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
    padding: $base-gap;

    h2,
    p {
      margin-bottom: $base-gap;
    }
  }
</style>
