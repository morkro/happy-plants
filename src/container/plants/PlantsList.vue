<template>
  <main>
    <header class="page-header">
      <h1>🌵 Happy Plants</h1>
      <div class="header-controls">
        <button @click="toggleFilter" :class="{ icon: true, active: this.filter }">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="black">
            <path d="M19.479 2l-7.479 12.543v5.924l-1-.6v-5.324l-7.479-12.543h15.958zm3.521-2h-23l9 15.094v5.906l5 3v-8.906l9-15.094z" />
          </svg>
        </button>
        <settings-button />
      </div>
    </header>

    <section>
      <router-link :to="{ path: 'plant/add' }" class="add-plant">
        + Add a plant
      </router-link>

      <div v-if="plants.length <= 0">
        <p>Looks like you haven't added any plants yet.</p>
      </div>

      <ul v-if="plants.length" class="plant-list">
        <li v-for="plant in plants">
          <plant-preview
            @delete-plant="deleteElementFromList"
            :configMode="filter"
            :guid="plant.guid"
            :name="plant.name"
            :imageURL="plant.imageURL"
            :scientific="plant.scientific"
          />
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
  import localforage from 'localforage'
  import blobUtil from 'blob-util'
  import SettingsButton from '@/components/SettingsButton'
  import PlantPreview from '@/components/PlantPreview'

  export default {
    name: 'PlantsList',
    components: {
      'settings-button': SettingsButton,
      'plant-preview': PlantPreview
    },
    methods: {
      toggleFilter () {
        this.filter = !this.filter
      },
      deleteElementFromList (guid) {
        localforage.removeItem(`plant-${guid}`)
          .then(() => {
            this.plants = this.plants.filter(p => p.guid !== guid)
          })
      }
    },
    beforeRouteEnter (to, from, next) {
      /**
       * 1. Grab all entries starting with 'plant-'
       * 2. Load each entry from IndexedDB
       * 3. Modify entries with an image URL from blob
       * 4. Pass callback to `then`
       */
      localforage.keys()
        .then(keys =>
          keys.filter(k => k.startsWith('plant-')))
        .then(keys =>
          Promise.all(keys.map(p => localforage.getItem(p))))
        .then(plants =>
          plants.map(p => ({
            ...p,
            imageURL: blobUtil.createObjectURL(p.blob)
          })))
        .then(plants => next(vm => { vm.plants = plants }))
    },
    data () {
      return {
        plants: [],
        filter: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  main {
    min-height: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: $light-grey;
  }

  section {
    height: 100%;
    padding: 0 $base-gap;
  }

  .header-controls {
    display: flex;

    button {
      margin-right: $base-gap;
    }

    .active svg {
      fill: black;
    }
  }

  .add-plant {
    background: rgba(0, 0, 0, .05);
    display: block;
    border-radius: $border-radius;
    color: $text-color-base;
    text-align: center;
    padding: 1.5vh;
    margin: $base-gap 0;
    font-weight: 700;
  }

  .plant-list {
    list-style: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      width: 42.5vw;
      height: 42.5vw;
      margin-bottom: $base-gap;
      box-shadow: 0px 1px 12px rgba(0, 0, 0, .1);
    }
  }
</style>
