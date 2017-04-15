<template>
  <main>
    <header class="page-header">
      <h1>🌵 Happy Plants</h1>
      <div class="header-controls">
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
  import blobUtil from 'blob-util'
  import localforage from 'localforage'
  import SettingsButton from '@/components/SettingsButton'
  import PlantPreview from '@/components/PlantPreview'
  export default {
    name: 'PlantsList',
    components: {
      'settings-button': SettingsButton,
      'plant-preview': PlantPreview
    },
    beforeRouteEnter (to, from, next) {
      localforage.keys()
        // grab all entries starting with 'plant-'
        .then(keys =>
          keys.filter(k => k.startsWith('plant-')))
        // load each entry from IndexedDB
        .then(keys =>
          Promise.all(keys.map(p => localforage.getItem(p))))
        // modify entries with an image URL from blob
        .then(plants =>
          plants.map(p => ({
            ...p,
            imageURL: blobUtil.createObjectURL(p.blob)
          })))
        // pass data to soon-to-be created view
        .then(plants =>
          next(vm => { vm.plants = plants }))
    },
    data () {
      return {
        plants: []
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: $light-grey;
  }

  section {
    height: 100%;
    padding: 0 5vw;
  }

  .add-plant {
    background: rgba(0, 0, 0, .05);
    display: block;
    border-radius: $border-radius;
    color: $text-color-base;
    text-align: center;
    padding: 1.5vh;
    margin: 2vh 0;
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
      margin-bottom: 2vh;
      box-shadow: 0px 1px 12px rgba(0, 0, 0, .1);
    }
  }
</style>
