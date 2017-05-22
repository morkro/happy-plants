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

      <div class="content-notes">
        <div v-if="!notes">
          <p>Seems like you haven't added any notes yet.</p>
          <button @click="openNotes">Add notes.</button>
        </div>
        <div v-else>
          <button @click="openNotes">Show notes.</button>
        </div>

        <plant-notes
          class="notes-modal"
          v-if="notes.show"
          @update-notes="updateNotes"
          :content="{ notes: notes.content }" />
      </div>
    </section>
  </main>
</template>

<script>
  import blobUtil from 'blob-util'
  import AppHeader from '@/components/AppHeader'
  import PlantNotes from './PlantNotes'

  export default {
    name: 'PlantView',
    components: {
      'app-header': AppHeader,
      'plant-notes': PlantNotes
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
      notes: {
        show: false,
        content: false
      }
    }),
    methods: {
      openNotes () {
        this.notes.show = !this.notes.show
      },
      updateNotes (notes) {
        const guid = `plant-${this.guid}`
        this.$localforage.getItem(guid)
          .then(plant =>
            this.$localforage.setItem(guid, Object.assign({}, plant, { notes })))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

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
</style>
