<template>
  <main>
    <header>
      <h1>Happy Plants 🌵</h1>
      <router-link :to="{ path: 'settings' }">
        Settings
      </router-link>
    </header>
    <router-link :to="{ path: 'plant/add' }" class="add-plant">
      + Add a plant
    </router-link>

    <div v-if="plants.length <= 0">
      <p>Looks like you haven't added any plants yet.</p>
    </div>

    <ul v-if="plants.length" class="plant-list">
      <li v-for="plant in plants">
        <h1>{{ plant.name }}</h1>
        <img :src="plant.imageUrl" />
      </li>
    </ul>
  </main>
</template>

<script>
  import blobUtil from 'blob-util'
  import localforage from 'localforage'
  export default {
    name: 'PlantsList',
    methods: {
      getPlants () {
        localforage.keys()
          .then(keys => keys.filter(k => k.startsWith('plant-')))
          .then(keys => Promise.all(keys.map(p => localforage.getItem(p))))
          .then(plants => plants.map(this.addImageUrl))
          .then(plants => {
            this.plants = plants
          })
      },
      addImageUrl (obj) {
        return Object.assign({}, obj, {
          imageUrl: blobUtil.createObjectURL(obj.blob)
        })
      }
    },
    filters: {
      toUrl (blob) {
        return blobUtil.createObjectURL(blob)
      }
    },
    data () {
      return {
        plants: []
      }
    },
    created () {
      this.getPlants()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .add-plant {
    background: $light-grey;
    display: block;
    border-radius: $border-radius;
    color: $text-base-color;
    text-align: center;
    padding: 1.5vh;
    margin: 2vh 0;
    font-weight: 700;
  }

  .plant-list {
    list-style: none;
    width: 100%;
    display: flex;

    li {
      width: 45vw;
    }

    img {
      display: block;
      width: 100%;
      height: 45vw;
    }
  }
</style>
