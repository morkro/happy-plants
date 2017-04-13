<template>
  <main>
    <header>
      <h1>Happy Plants 🌵</h1>
      <router-link :to="{ path: 'settings' }">
        Settings
      </router-link>
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
          <router-link :to="{ path: `plant/${plant.guid}` }">
            <div class="list-content">
              <h1>{{ plant.name }}</h1>
              <span>Scientific name</span>
            </div>
            <img :src="plant.imageUrl" :alt="plant.name" />
          </router-link>
        </li>
      </ul>
    </section>
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

  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  header {
    padding: 2vh 5vw;
    border-bottom: 1px solid $light-grey200;
  }

  section {
    height: 100%;
    padding: 0 5vw;
    background: $light-grey;
  }

  .add-plant {
    background: $light-grey;
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

      a {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: $border-radius;
        overflow: hidden;
      }
    }

    img {
      flex-shrink: 0;
      min-width: 100%;
      min-height: 100%;
    }

    .list-content {
      position: absolute;
      color: white;
      width: 100%;
      bottom: 0;
      left: 0;
      padding: 10px;
      font-size: $text-size-small;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .5));

      h1 {
        color: white;
        font-size: $text-size-base;
      }
    }
  }
</style>
