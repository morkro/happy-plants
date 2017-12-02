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
            :deleteMode="isDeleteMode"
            :categoriseMode="isCategoryMode"
            :guid="plant.guid"
            :name="plant.name"
            :imageURL="plant.imageURL" />
        </li>
      </ul>

      <footer :class="footerClass">
        <selection-delete
          v-if="plants.length && !isCategoryMode"
          :activeSelection="isDeleteMode"
          :selected="this.selection.length"
          @cancel-selection="cancelDeleteMode"
          @delete-selection="activateDeleteMode">
        </selection-delete>

        <router-link
          v-if="!editMode"
          tag="button"
          aria-label="Add plant"
          class="add-plant circle"
          :to="{ path: 'add' }">
          <svgicon icon="leaf" width="16" height="24" color="#000"></svgicon>
        </router-link>

        <div
          v-if="plants.length && !isDeleteMode"
          :class="{ 'footer-sorting': true, 'active': isCategoryMode }">
          <button
            aria-label="Cancel sort"
            class="footer-cancel-mode circle inverse"
            @click="cancelCategoriseMode">
            <feather-x width="18" height="18" />
          </button>
          <button
            aria-label="Sort"
            class="organise-plants circle inverse"
            @click="activateCategoriseMode">
            <feather-layers width="18" height="18" />
          </button>
        </div>
      </footer>
    </section>
  </main>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import AppHeader from '@/components/AppHeader'
  import OverviewAlert from '@/components/Alert'
  import SelectionDelete from './SelectionDelete'
  import PlantPreview from './PlantPreview'
  import PlantsIntro from './PlantsIntro'
  import OverviewFilter from './Filter'
  import '@/assets/leaf'

  export default {
    name: 'Overview',

    components: {
      'app-header': AppHeader,
      'overview-alert': OverviewAlert,
      'selection-delete': SelectionDelete,
      'plants-intro': PlantsIntro,
      'plant-preview': PlantPreview,
      'overview-filter': OverviewFilter,
      'feather-x': () =>
        import('vue-feather-icon/components/x' /* webpackChunkName: "overview" */),
      'feather-layers': () =>
        import('vue-feather-icon/components/layers' /* webpackChunkName: "overview" */)
    },

    computed: {
      ...mapState({
        plants: state => state.plants,
        filter: state => state.settings.filter
      }),
      isCategoryMode () {
        return this.editMode === 'category'
      },
      isDeleteMode () {
        return this.editMode === 'delete'
      },
      footerClass () {
        if (!this.editMode) return ''
        return `editmode mode-${this.editMode}`
      }
    },

    data () {
      return {
        selection: [],
        editMode: false,
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
        // If the delete mode is already active, the selected elements should
        // be deleted and the mode deactivated again.
        if (this.isDeleteMode && this.selection.length) {
          this.showAlert = true
        }

        this.editMode = 'delete'
      },
      cancelDeleteMode () {
        if (this.showAlert) {
          this.showAlert = false
        }
        this.editMode = false
        this.clearSelection()
      },
      confirmDeletePlants () {
        this.showNotification({ message: `Deleted ${this.selection.length} plants.` })
        this.deletePlants(this.selection)
        this.cancelDeleteMode()
      },
      activateCategoriseMode () {
        this.editMode = 'category'

        if (!this.categoriseMode) {
          this.clearSelection()
        }
      },
      cancelCategoriseMode () {
        this.editMode = false
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

  main {
    min-height: 100vh;
    background: var(--background-secondary);
  }

  main > section {
    height: 100%;
    padding: var(--base-gap);
    padding-bottom: calc(#{$footer-btn-size} + var(--base-gap) * 2);

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

    /* TODO: Remove when desktop layout is actually in development. */
    @media (min-width: var(--app-media-max-size)) {
      width: var(--app-media-max-size);
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
