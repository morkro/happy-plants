<template>
  <main class="main-wireframe">
    <app-header :settings="true">
      <h1 slot="title">Happy Plants</h1>
    </app-header>

    <overview-alert
      type="warning"
      class="overview-alert"
      :show="showAlert"
      @close-alert="cancelDeleteMode">
      <h1 slot="headline">Are you sure?</h1>
      <p slot="content">
        You are about to delete <strong>{{ selection.length }}</strong> plants.
      </p>
      <button class="default" slot="cancel" @click="cancelDeleteMode">
        Cancel
      </button>
      <button class="warning" slot="confirm" @click="confirmDeletePlants">
        Yes, delete plants
      </button>
    </overview-alert>

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
            :categoriseMode="categoriseMode"
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
          <div v-if="plants.length" :class="{ 'footer-sorting': true, 'active': categoriseMode }">
            <button
              aria-label="Cancel sort"
              class="footer-cancel-mode circle inverse"
              @click="cancelcategoriseMode">
              <feather-x width="18" height="18" />
            </button>
            <button
              aria-label="Sort"
              class="organise-plants circle inverse"
              @click="togglecategoriseMode">
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
  import OverviewAlert from '@/components/Alert'
  import PlantPreview from './PlantPreview'
  import PlantsIntro from './PlantsIntro'
  import OverviewFilter from './Filter'
  import '@/assets/leaf'

  export default {
    name: 'Overview',

    components: {
      'app-header': AppHeader,
      'overview-alert': OverviewAlert,
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

    data () {
      return {
        selection: [],
        categoriseMode: false,
        deleteMode: false,
        showAlert: false
      }
    },

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
        if (this.categoriseMode) return

        // If the delete mode is already active, the selected elements should
        // be deleted and the mode deactivated again.
        if (this.deleteMode && this.selection.length) {
          this.showAlert = true
        }

        this.deleteMode = true
      },
      cancelDeleteMode () {
        if (this.showAlert) {
          this.showAlert = false
        }
        this.deleteMode = false
        this.clearSelection()
      },
      confirmDeletePlants () {
        this.showNotification({ message: `Deleted ${this.selection.length} plants.` })
        this.deletePlants(this.selection)
        this.cancelDeleteMode()
      },
      togglecategoriseMode () {
        if (this.deleteMode) return
        this.categoriseMode = !this.categoriseMode

        if (!this.categoriseMode) {
          this.clearSelection()
        }
      },
      cancelcategoriseMode () {
        this.categoriseMode = false
      },
      sortItems (type) {
        this.updateFilter({ filter: type })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/animations";
  @import "~styles/z-index";

  $content-index: list, footer;
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
    background: var(--background-secondary);
  }

  main > section {
    height: 100%;
    padding: var(--base-gap);
    padding-bottom: calc(60px + var(--base-gap) * 2);

    &.no-plants {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - var(--app-header-size));
    }
  }

  .overview-alert {
    button.warning {
      background: var(--brand-yellow);
      color: var(--link-color);
      box-shadow: var(--plain-shadow);
    }
  }

  .header-controls {
    display: flex;

    button {
      margin-right: var(--base-gap);
    }

    .active svg {
      fill: black;
    }
  }

  section footer {
    position: fixed;
    bottom: var(--base-gap);
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: z($content-index, footer);
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: calc(100% - var(--base-gap) * 2);

    @supports (justify-content: space-evenly) {
      justify-content: space-evenly;
    }

    .add-plant {
      width: $footer-btn-size;
      height: $footer-btn-size;
    }

    button:not(.add-plant) {
      padding: 0;
      background: var(--background-primary);
      box-shadow: var(--plain-shadow);
      width: $footer-btn-size-secondary;
      height: $footer-btn-size-secondary;
    }

    .footer-cancel-mode {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--link-color);
      position: absolute;
      top: 0;
      transform: scale(0);
      transition: transform $base-speed $ease-out-back;
    }

    /* TODO: Remove when desktop layout is actually in development. */
    @media (min-width: var(--app-media-max-size)) {
      width: var(--app-media-max-size);
    }
  }

  .footer-deletion {
    position: relative;

    &.active .delete-plants {
      background: var(--brand-red);

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
      box-shadow: 0 0 14px 2px var(--brand-red);
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
    margin-bottom: var(--base-gap);
  }

  .plant-list {
    list-style: none;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    z-index: z($content-index, list);
    --list-gap: calc(var(--base-gap) * 2 - var(--base-gap) / 2);

    li {
      width: calc(50vw - var(--list-gap));
      height: calc(50vw - var(--list-gap));
      margin-bottom: var(--base-gap);

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
