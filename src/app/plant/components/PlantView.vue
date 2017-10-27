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
          <button class="edit-data icon" @click.prevent="openPlantEditModal">
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

      <plant-component>
        <feather-droplet slot="icon" />
        <h2 slot="title">Watering</h2>
        <plant-watering
          slot="content"
          :amount="watering && watering.level"
          @toggle-water-level="onWaterLevelUpdate">
        </plant-watering>
      </plant-component>

      <plant-component>
        <feather-sun slot="icon" />
        <h2 slot="title">Sunshine</h2>
        <plant-sunshine
          slot="content"
          :amount="sunshine && sunshine.level"
          @toggle-sunshine="onSunshineUpdate">
        </plant-sunshine>
      </plant-component>

      <plant-component>
        <feather-moon slot="icon" />
        <h2 slot="title">Growing seasons</h2>
        <plant-seasons
          slot="content"
          :seasons="seasons"
          @toggle-season="onSeasonUpdate">
        </plant-seasons>
      </plant-component>

      <plant-component>
        <feather-book slot="icon" />
        <h2 slot="title">Notebook</h2>
        <plant-notes
          slot="content"
          class="notes-modal"
          :content="notes"
          @update-notes="onNotesUpdate">
        </plant-notes>
      </plant-component>

      <plant-updates
        :modified="modified">
      </plant-updates>
    </section>
  </main>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { getUrlFromBlob, isBlobbable } from '@/utils/blob'
  import AppHeader from '@/components/AppHeader'
  import PlantComponentContainer from './PlantComponentContainer'
  import PlantModal from './PlantModal'
  import PlantNotes from './PlantNotes'
  import PlantSeasons from './PlantSeasons'
  import PlantWatering from './PlantWatering'
  import PlantSunshine from './PlantSunshine'
  import PlantUpdates from './PlantUpdates'
  import '@/assets/cactus'

  export default {
    name: 'PlantView',

    components: {
      'app-header': AppHeader,
      'plant-component': PlantComponentContainer,
      'plant-modal': PlantModal,
      'plant-notes': PlantNotes,
      'plant-seasons': PlantSeasons,
      'plant-watering': PlantWatering,
      'plant-sunshine': PlantSunshine,
      'plant-updates': PlantUpdates,
      'feather-book': () => import('vue-feather-icon/components/book' /* webpackChunkName: "plant" */),
      'feather-moon': () => import('vue-feather-icon/components/moon' /* webpackChunkName: "plant" */),
      'feather-edit': () => import('vue-feather-icon/components/edit-2' /* webpackChunkName: "plant" */),
      'feather-droplet': () => import('vue-feather-icon/components/droplet' /* webpackChunkName: "plant" */),
      'feather-sun': () => import('vue-feather-icon/components/sun' /* webpackChunkName: "plant" */)
    },

    data: () => ({
      showPlantModal: false
    }),

    computed: mapState({
      guid: state => state.selected.guid,
      name: state => state.selected.name,
      blob: state => state.selected.blob,
      imageURL: state => state.selected.imageURL,
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
        'updateWatering',
        'updateName',
        'updatePhoto'
      ]),
      openPlantEditModal () {
        this.showPlantModal = true
        this.$root.$el.parentNode.classList.add('js-no-scrolling')
      },
      closePlantEditModal () {
        this.showPlantModal = false
        this.$root.$el.parentNode.classList.remove('js-no-scrolling')
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
        console.log(sunshine)
        // this.updateWatering({ guid: this.guid, watering })
      },
      updateFromModal ({ name, blob }) {
        const imageURL = isBlobbable(blob) ? getUrlFromBlob(blob) : this.imageURL
        this.updateName({ guid: this.guid, name })
        this.updatePhoto({ guid: this.guid, blob, imageURL })
      }
    },

    mounted () {
      this.loadPlants()
        .then(() => this.loadPlantItem(this.$route.params.id))
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
    height: 305px;
    margin-bottom: 4px;
    background: $grey;

    .edit-data {
      padding: $base-gap + 5;
      z-index: 2;

      svg {
        margin: 0;
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
