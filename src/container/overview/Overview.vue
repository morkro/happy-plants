<template>
  <main class="main-wireframe">
    <app-header :settings="true">
      <h1 slot="title">Happy Plants</h1>
    </app-header>

    <section>
      <div v-if="plants.length <= 0">
        <p>Looks like you haven't added any plants yet.</p>
      </div>

      <div v-if="plants.length" class="plant-options">
        <overview-filter @update-selection="sortItems" class="plant-filter" />
      </div>

      <ul v-if="plants.length" class="plant-list">
        <li v-for="plant in plants">
          <plant-preview
            @delete-plant="deleteElementFromList"
            :configMode="filter"
            :guid="plant.guid"
            :name="plant.scientific"
            :imageURL="plant.imageURL" />
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
  import blobUtil from 'blob-util'
  import AppHeader from '@/components/AppHeader'
  import PlantPreview from './PlantPreview'
  import OverviewFilter from './Filter'
  import '@/assets/leaf'

  export default {
    name: 'Overview',
    components: {
      'app-header': AppHeader,
      'plant-preview': PlantPreview,
      'overview-filter': OverviewFilter
    },
    methods: {
      toggleFilter () {
        this.filter = !this.filter
      },
      deleteElementFromList (guid) {
        this.$localforage.removeItem(`plant-${guid}`)
          .then(() => {
            this.plants = this.plants.filter(p => p.guid !== guid)
          })
      },
      sortItems (type) {
        console.log(type)
      }
    },
    beforeRouteEnter (to, from, next) {
      /**
       * 1. Grab all entries starting with 'plant-'
       * 2. Load each entry from IndexedDB
       * 3. Modify entries with an image URL from blob
       * 4. Pass callback to `then`
       */
      next(vm => {
        vm.$localforage.keys()
          .then(keys =>
            keys.filter(k => k.startsWith('plant-')))
          .then(keys =>
            Promise.all(keys.map(p => vm.$localforage.getItem(p))))
          .then(plants =>
            plants.map(p => ({
              ...p,
              imageURL: p.blob ? blobUtil.createObjectURL(p.blob) : ''
            })))
          .then(plants => { vm.plants = plants })
      })
    },
    data: () => ({
      plants: [],
      filter: false
    }),
    updated () {
      console.log(this.$data.plants)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
  @import "../../styles/z-index";

  $content-index: list, footer;
  $list-gap: ($base-gap * 2) - $base-gap / 2;
  $footer-btn-size: 60px;

  main {
    min-height: 10vh;
    background: $light-grey;
  }

  main > section {
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
    z-index: z($content-index, footer);

    .add-plant {
      width: $footer-btn-size;
      height: $footer-btn-size;
    }
  }

  .plant-options {
    margin-bottom: $base-gap;
  }

  .plant-list {
    list-style: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    position: relative;
    z-index: z($content-index, list);
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
