<template>
  <main class="main-wireframe">
    <app-header :settings="true">
      <h1 slot="title">Happy Plants</h1>
    </app-header>

    <section :class="{ 'no-plants': plants.length <= 0 }">
      <plants-intro
        v-if="plants.length <= 0" />

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
        <transition appear name="footer-appear">
          <div v-if="plants.length" :class="{ 'footer-deletion': true, 'active': deleteMode }">
            <button
              aria-label="Trash"
              class="delete-plants circle inverse"
              @click="activateDeleteMode">
              <feather-trash width="18" height="18" :stroke="deleteMode ? '#fff' : '#000'" />
            </button>
            <button
              aria-label="Cancel trash"
              class="footer-cancel-mode circle inverse"
              @click="cancelDeleteMode">
              <feather-x width="18" height="18" />
            </button>
          </div>
        </transition>

        <transition appear name="footer-appear">
          <router-link
            tag="button"
            aria-label="Add plant"
            class="add-plant circle"
            :to="{ path: 'add' }">
            <svgicon icon="leaf" width="16" height="24" color="#000"></svgicon>
          </router-link>
        </transition>

        <transition appear name="footer-appear">
          <div v-if="plants.length" :class="{ 'footer-sorting': true, 'active': sortingMode }">
            <button
              aria-label="Cancel sort"
              class="footer-cancel-mode circle inverse"
              @click="cancelSortingMode">
              <feather-x width="18" height="18" />
            </button>
            <button
              aria-label="Sort"
              class="organise-plants circle inverse"
              @click="toggleSortingMode">
              <feather-layers width="18" height="18" />
            </button>
          </div>
        </transition>
      </footer>
    </section>
  </main>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import AppHeader from '@/components/AppHeader'
  import PlantPreview from './PlantPreview'
  import PlantsIntro from './PlantsIntro'
  import OverviewFilter from './Filter'
  import '@/assets/leaf'

  export default {
    name: 'Overview',

    components: {
      'app-header': AppHeader,
      'plants-intro': PlantsIntro,
      'plant-preview': PlantPreview,
      'overview-filter': OverviewFilter,
      'feather-trash': () =>
        import('vue-feather-icon/components/trash-2' /* webpackChunkName: "overview" */),
      'feather-x': () =>
        import('vue-feather-icon/components/x' /* webpackChunkName: "overview" */),
      'feather-layers': () =>
        import('vue-feather-icon/components/layers' /* webpackChunkName: "overview" */)
    },

    computed: mapState({
      plants: state => state.plants,
      filter: state => state.settings.filter
    }),

    methods: {
      ...mapActions([
        'loadPlants',
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
  @import "~styles/colors";
  @import "~styles/layout";
  @import "~styles/animations";
  @import "~styles/z-index";

  $content-index: list, footer;
  $list-gap: ($base-gap * 2) - $base-gap / 2;
  $footer-btn-size: 60px;
  $footer-btn-size-secondary: 50px;

  .footer-appear-enter-active {
    transition: transform $base-speed * 2 $ease-out-back;
  }

  .footer-appear-enter {
    transform: scale(0);
  }

  .footer-appear-enter-to {
    transform: scale(1);
  }

  main {
    min-height: 100vh;
    background: $light-grey;
  }

  main > section {
    height: 100%;
    padding: $base-gap $base-gap ($footer-btn-size + ($base-gap * 2));

    &.no-plants {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - #{$app-header-size});
    }
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
    width: calc(100% - #{$base-gap*2});

    @supports (justify-content: space-evenly) {
      justify-content: space-evenly;
    }

    .add-plant {
      width: $footer-btn-size;
      height: $footer-btn-size;
    }

    button:not(.add-plant) {
      padding: 0;
      background: $background-primary;
      box-shadow: $plain-shadow;
      width: $footer-btn-size-secondary;
      height: $footer-btn-size-secondary;
    }

    .footer-cancel-mode {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $link-color;
      position: absolute;
      top: 0;
      transform: scale(0);
      transition: transform $base-speed $ease-out-back;
    }

    /* TODO: Remove when desktop layout is actually in development. */
    @media (min-width: $app-media-max-size) {
      width: $app-media-max-size;
    }
  }

  .footer-deletion {
    position: relative;

    &.active .delete-plants {
      background: $red;

      &::after {
        opacity: 1;
      }
    }

    .delete-plants::after {
      opacity: 0;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0 0 14px 2px $red;
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
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    z-index: z($content-index, list);
    $list-gap: ($base-gap * 2) - $base-gap / 2;

    li {
      width: calc(50vw - #{$list-gap});
      height: calc(50vw - #{$list-gap});
      margin-bottom: $base-gap;

      &:nth-child(even):not(:last-child) {
        margin-left: auto;
      }

      &:nth-child(odd):not(:last-child) {
        margin-right: auto;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
