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
        <div v-if="!notes.content">
          <p>Seems like you haven't added any notes yet.</p>
          <button @click="toggleNotes">Add notes</button>
        </div>
        <div v-else>
          <button @click="toggleNotes">Show notes</button>
        </div>

        <plant-notes
          class="notes-modal"
          v-if="notes.show"
          @update-notes="updateNotes"
          @close-notes="closeNotes"
          :content="{ notes: notes.content }" />
      </div>
    </section>
  </main>
</template>

<script>
  import blobUtil from 'blob-util'
  import AppHeader from '@/components/AppHeader'
  import PlantNotes from './PlantNotes'
  import PlantSeasons from './PlantSeasons'

  export default {
    name: 'PlantView',
    components: {
      'app-header': AppHeader,
      'plant-notes': PlantNotes,
      'plant-seasons': PlantSeasons
    },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.$localforage.getItem(`plant-${to.params.id}`)
        .then(plant =>
          Object.assign(vm, plant, {
            imageURL: blobUtil.createObjectURL(plant.blob),
            notes: {
              ...vm.notes,
              content: plant.notes
            }
          })
        )
        .catch(() => next('/'))
      )
    },
    data: () => ({
      guid: '',
      name: '',
      scientific: '',
      location: '',
      blob: {},
      imageURL: '',
      seasons: [],
      notes: {
        show: false,
        content: false
      }
    }),
    methods: {
      toggleNotes () {
        this.notes.show = !this.notes.show
      },
      closeNotes () {
        this.notes.show = false
      },
      updateNotes (notes) {
        const guid = `plant-${this.guid}`
        this.notes.content = notes
        this.$localforage.getItem(guid)
          .then(plant =>
            this.$localforage.setItem(guid, Object.assign({}, plant, { notes })))
      },
      updateSeasons (name) {
        const guid = `plant-${this.guid}`
        const month = this.seasons.find(season => season.month === name)
        month.growth = !month.growth
        this.$localforage.getItem(guid)
          .then(plant =>
            this.$localforage.setItem(guid, Object.assign({}, plant, { seasons: this.seasons })))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .view-content {
    background: $background-secondary;
  }

  .view-content header {
    position: relative;
    color: white;
    height: 305px;

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
    margin-bottom: 30px;
  }
</style>
