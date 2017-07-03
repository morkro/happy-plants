<template>
  <main class="main-wireframe">
    <app-header :back="true" :settings="true">
      <h1 slot="title">Hello, I am</h1>
    </app-header>

    <section class="view-content">
      <header>
        <button class="edit-data circle">
          <svg-icon icon="edit" color="#fff" width="18" height="18"></svg-icon>
        </button>
        <div>
          <h1>{{ name }}</h1>
        </div>
        <div class="header-background">
          <img v-if="imageURL" :src="imageURL" :alt="name" />
          <svg-icon v-else icon="shutter" width="50" height="50" color="#fff">
          </svg-icon>
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
  import AppHeader from '@/app/shared/AppHeader'
  import PlantNotes from './PlantNotes'
  import PlantSeasons from './PlantSeasons'
  import PlantWatering from './PlantWatering'

  import '@/assets/edit'

  export default {
    name: 'PlantView',

    components: {
      'app-header': AppHeader,
      'plant-notes': PlantNotes,
      'plant-seasons': PlantSeasons,
      'plant-watering': PlantWatering
    },

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
        'updateWatering'
      ]),
      onNotesUpdate (notes) {
        this.updateNotes({ guid: this.guid, notes })
      },
      onSeasonUpdate (name) {
        this.updateSeason({ guid: this.guid, month: name })
      },
      onWateringUpdate (watering) {
        this.updateWatering({ guid: this.guid, watering })
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

  .view-content {
    h3 {
      font-weight: 600;
      font-size: $text-size-medium;
    }
  }

  .view-content header {
    box-shadow: $shadow;
    position: relative;
    color: $text-color-inverse;
    height: 305px;
    margin-bottom: 4px;
    background: $grey;

    .edit-data {
      position: absolute;
      right: 3vw;
      bottom: 4px;
      z-index: 1;
      transform: translateY(50%);
    }

    h1 {
      font-size: $text-size-large;
      font-weight: 600;
      color: $text-color-inverse;
    }

    > div:not(.header-background) {
      padding: $base-gap 70px $base-gap $base-gap;
      position: absolute;
      z-index: 0;
      bottom: 0;
      width: 100%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
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
