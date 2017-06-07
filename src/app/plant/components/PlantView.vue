<template>
  <main class="main-wireframe">
    <app-header :back="true" :settings="true">
      <h1 slot="title">Hello, I am</h1>
    </app-header>

    <section class="view-content">
      <header>
        <div>
          <h2> {{ scientific }} </h2>
        </div>
        <img :src="imageURL" :alt="name" />
      </header>

      <div v-if="seasons.length" class="content-group content-seasons">
        <plant-seasons :seasons="seasons" @toggle-season="updateSeasons" />
      </div>

      <div class="content-group content-notes">
        <div v-if="showNotes">
          <p>Seems like you haven't added any notes yet.</p>
          <button @click="toggleNotes">Add notes</button>
        </div>
        <div v-else>
          <button @click="toggleNotes">Show notes</button>
        </div>

        <plant-notes
          class="notes-modal"
          v-if="showNotes"
          @update-notes="onNotesUpdate"
          @close-notes="closeNotes"
          :content="notes" />
      </div>
    </section>
  </main>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import AppHeader from '@/app/shared/AppHeader'
  import PlantNotes from './PlantNotes'
  import PlantSeasons from './PlantSeasons'

  export default {
    name: 'PlantView',

    components: {
      'app-header': AppHeader,
      'plant-notes': PlantNotes,
      'plant-seasons': PlantSeasons
    },

    data () {
      return {
        showNotes: false
      }
    },

    computed: mapState({
      guid: state => state.active.guid,
      name: state => state.active.name,
      scientific: state => state.active.scientific,
      location: state => state.active.location,
      blob: state => state.active.blob,
      imageURL: state => state.active.imageURL,
      seasons: state => state.active.seasons,
      notes: state => state.active.notes
    }),

    methods: {
      ...mapActions([
        'loadPlantItem',
        'loadPlants',
        'updateSeason',
        'updateNotes'
      ]),
      toggleNotes () {
        this.showNotes = !this.showNotes
      },
      closeNotes () {
        this.showNotes = false
      },
      onNotesUpdate (notes) {
        this.updateNotes({ guid: this.guid, notes })
      },
      updateSeasons (name) {
        this.updateSeason({ guid: this.guid, month: name })
      }
    },

    mounted () {
      this.loadPlants()
        .then(() => this.loadPlantItem(this.$route.params.id))
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/variables";

  .view-content {
    background: $background-secondary;
  }

  .view-content header {
    box-shadow: $shadow;
    position: relative;
    color: white;
    height: 305px;
    margin-bottom: $base-gap;

    h2 {
      font-size: $text-size-large;
      font-weight: 600;
    }

    > div {
      padding: $base-gap;
      position: absolute;
      z-index: 1;
      bottom: 0;
      width: 100%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .content-group:not(:last-of-type) {
    margin-bottom: $base-gap;
  }
</style>
