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
        <overview-filter
          class="plant-filter"
          :selected="filter"
          @update-selection="sortItems" />
      </div>

      <ul v-if="plants.length" class="plant-list">
        <li v-for="plant in plants">
          <plant-preview
            @delete-plant="toggleElementInSelection"
            :deleteMode="deleteMode"
            :guid="plant.guid"
            :name="plant.name"
            :imageURL="plant.imageURL" />
        </li>
      </ul>

      <footer>
        <div v-if="plants.length" :class="{ 'footer-deletion': true, 'active': deleteMode }">
          <button @click="activateDeleteMode" class="delete-plants circle">
            <svg-icon icon="trash" width="15" height="15" :color="deleteMode ? '#fff' : '#000'">
            </svg-icon>
          </button>
          <button @click="cancelDeleteMode" class="footer-cancel-mode circle">
            ✕
          </button>
        </div>

        <router-link :to="{ path: 'add' }" class="add-plant circle" tag="button">
          <svg-icon icon="leaf" width="20" height="30" color="#fff"></svg-icon>
        </router-link>

        <div v-if="plants.length" :class="{ 'footer-sorting': true, 'active': sortingMode }">
          <button @click="cancelSortingMode" class="footer-cancel-mode circle">
            ✕
          </button>
          <button @click="toggleSortingMode" class="organise-plants circle">
            <svg-icon icon="categories" width="15" height="15" color="#000"></svg-icon>
          </button>
        </div>
      </footer>
    </section>
  </main>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import AppHeader from '@/app/shared/AppHeader'
  import PlantPreview from './PlantPreview'
  import OverviewFilter from './Filter'
  import '@/assets/leaf'
  import '@/assets/trash'
  import '@/assets/categories'

  export default {
    name: 'Overview',

    components: {
      'app-header': AppHeader,
      'plant-preview': PlantPreview,
      'overview-filter': OverviewFilter
    },

    computed: mapState({
      plants: state => state.plants,
      filter: state => state.settings.filter
    }),

    methods: {
      ...mapActions([
        'deletePlants',
        'showNotification',
        'updateFilter'
      ]),
      toggleFilter () {
        this.filter = !this.filter
      },
      toggleElementInSelection (item) {
        if (item.selected) {
          this.selection.push(item)
        } else {
          this.selection = this.selection.filter(s => s.guid !== item.guid)
        }
      },
      clearSelection () {
        this.selection = []
      },
      activateDeleteMode () {
        if (this.sortingMode) return

        // If the delete mode is already active, the selected elements should
        // be deleted and the mode deactivated again.
        if (this.deleteMode) {
          if (this.selection.length) {
            this.showNotification({ message: `Deleted ${this.selection.length} plants.` })
            this.deletePlants(this.selection)
          }
          this.cancelDeleteMode()
          return
        }

        this.deleteMode = true
      },
      cancelDeleteMode () {
        this.deleteMode = false
        this.clearSelection()
      },
      toggleSortingMode () {
        if (this.deleteMode) return
        this.sortingMode = !this.sortingMode

        if (!this.sortingMode) {
          this.clearSelection()
        }
      },
      cancelSortingMode () {
        this.sortingMode = false
      },
      sortItems (type) {
        this.updateFilter({ filter: type })
      }
    },

    data () {
      return {
        selection: [],
        sortingMode: false,
        deleteMode: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/variables";
  @import "~styles/z-index";

  $content-index: list, footer;
  $list-gap: ($base-gap * 2) - $base-gap / 2;
  $footer-btn-size: 60px;

  main {
    min-height: 100vh;
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
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;

    .add-plant {
      width: $footer-btn-size;
      height: $footer-btn-size;
    }

    button:not(.add-plant) {
      width: $footer-btn-size - 20px;
      height: $footer-btn-size - 20px;
      padding: 0;
      background: $background-primary;
    }

    .footer-cancel-mode {
      display: block;
      color: $link-color;
      position: absolute;
      top: 0;
      transform: scale(0);
      transition: transform $base-speed $ease-out-back;
    }
  }

  .footer-deletion {
    position: relative;

    &.active .delete-plants {
      background: $red;

      &:after {
        opacity: 1;
      }
    }

    .delete-plants:after {
      opacity: 0;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0px 0px 14px 2px $red;
      transition: opacity $base-speed $ease-out-back;
    }

    .footer-cancel-mode {
      transform: translateX(120%) scale(0);
    }

    &.active .footer-cancel-mode {
      transform: translateX(120%) scale(1);
    }
  }

  .footer-sorting {
    position: relative;

    .footer-cancel-mode {
      transform: translateX(-120%) scale(0);
    }

    &.active .footer-cancel-mode {
      transform: translateX(-120%) scale(1);
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

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
