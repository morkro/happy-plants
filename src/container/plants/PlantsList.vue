<template>
  <main>
    <app-header :settings="true">
      <h1 slot="title">Happy Plants</h1>
    </app-header>

    <section>
      <div v-if="plants.length <= 0">
        <p>Looks like you haven't added any plants yet.</p>
      </div>

      <ul v-if="plants.length" class="plant-list">
        <li v-for="plant in plants">
          <plant-preview
            @delete-plant="deleteElementFromList"
            :configMode="filter"
            :guid="plant.guid"
            :name="plant.scientific"
            :imageURL="plant.imageURL"
          />
        </li>
      </ul>

      <footer>
        <router-link :to="{ path: 'add' }" class="add-plant circle" tag="button">
          <svg-icon icon="leaf" width="20" height="30" color="#fff"></svg-icon>
        </router-link>
      </footer>
    </section>
  </main>
</template>

<script>
  import localforage from 'localforage'
  import blobUtil from 'blob-util'
  import AppHeader from '@/components/AppHeader'
  import PlantPreview from '@/components/PlantPreview'
  import '@/assets/leaf'

  export default {
    name: 'PlantsList',
    components: {
      'app-header': AppHeader,
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

  $list-gap: ($base-gap * 2) - $base-gap / 2;
  $footer-btn-size: 60px;
  $header-size: 50px;

  main {
    min-height: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: $light-grey;
    padding-top: $header-size;
  }

  section {
    height: 100%;
    padding: $base-gap $base-gap ($footer-btn-size + ($base-gap * 2));
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

  section footer {
    position: fixed;
    bottom: $base-gap;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;

    .add-plant {
      width: $footer-btn-size;
      height: $footer-btn-size;
    }
  }

  .plant-list {
    list-style: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    $list-gap: ($base-gap * 2) - $base-gap / 2;

    li {
      width: calc(50vw - #{$list-gap});
      height: calc(50vw - #{$list-gap});
      margin-bottom: $base-gap;
      box-shadow: 0px 1px 12px rgba(0, 0, 0, .1);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
