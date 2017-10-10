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
        <button class="edit-data circle" @click.prevent="openPlantEditModal">
          <feather-edit width="18" height="18" />
        </button>
        <div :class="{ 'is-skeleton': !name, 'no-photo': !imageURL }">
          <h1>{{ name }}</h1>
        </div>
        <div class="header-background">
          <img v-if="imageURL" :src="imageURL" :alt="name" />
          <svgicon v-else icon="cactus" width="50" height="50" color="#000">
          </svgicon>
        </div>
      </header>

      <!-- <div class="content-group content-watering">
        <plant-watering
          :level="watering && watering.level"
          :notes="watering && watering.notes"
          @toggle-watering="onWateringUpdate" />
      </div> -->

      <div v-if="seasons.length" class="content-group content-seasons">
        <plant-seasons
          :seasons="seasons"
          @toggle-season="onSeasonUpdate" />
      </div>

      <div class="content-group content-notes">
        <plant-notes
          class="notes-modal"
          :content="notes"
          @update-notes="onNotesUpdate" />
      </div>
    </section>
  </main>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { getUrlFromBlob, isBlobbable } from '@/utils/blob'
  import AppHeader from '@/components/AppHeader'
  import PlantModal from './PlantModal'
  import PlantNotes from './PlantNotes'
  import PlantSeasons from './PlantSeasons'
  import PlantWatering from './PlantWatering'
  import '@/assets/cactus'

  export default {
    name: 'PlantView',

    components: {
      'app-header': AppHeader,
      'plant-modal': PlantModal,
      'plant-notes': PlantNotes,
      'plant-seasons': PlantSeasons,
      'plant-watering': PlantWatering,
      'feather-edit': () => import('vue-feather-icon/components/edit-2')
    },

    data: () => ({
      showPlantModal: false
    }),

    computed: mapState({
      guid: state => state.active.guid,
      name: state => state.active.name,
      blob: state => state.active.blob,
      imageURL: state => state.active.imageURL,
      seasons: state => state.active.seasons,
      notes: state => state.active.notes,
      watering: state => state.active.watering
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
    h3 {
      font-weight: 600;
      font-size: $text-size-medium;
    }
  }

  .view-content header {
    box-shadow: 0 4px 0 $dark-transparency;
    position: relative;
    color: $text-color-inverse;
    height: 305px;
    margin-bottom: 4px;
    background: $grey;

    .edit-data {
      position: absolute;
      right: 3vw;
      bottom: 4px;
      transform: translateY(50%);
      z-index: 2;
    }

    h1 {
      font-size: $text-size-large;
      font-weight: 600;
      color: $text-color-inverse;
      line-height: 115%;
    }

    > div:not(.header-background) {
      padding: $base-gap 70px $base-gap $base-gap;
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

  .content-group:not(:last-of-type) {
    border-bottom: 4px solid $background-secondary;
  }

  .content-notes {
    padding: $base-gap;

    h2,
    p {
      margin-bottom: $base-gap;
    }
  }
</style>
