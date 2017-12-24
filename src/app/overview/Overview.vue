<template>
  <main class="main-wireframe">
    <app-header :settings="true">
      <h1 slot="title">Happy Plants</h1>
    </app-header>

    <!-- Alert window pops up as confirmation the user is about to delete plants. -->
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

    <!-- Backdrop shows when user starts category selection. -->
    <div v-if="showCategoryBackdrop" class="category-selection-backdrop">
      <p>Select category</p>
      <feather-arrow-down />
    </div>

    <section :class="{ 'no-plants': plants.length <= 0 }">
      <plants-intro
        v-if="plants.length <= 0"
        key="overview-intro" />

      <div v-if="plants.length" class="plant-options">
        <overview-filter
          class="plant-filter"
          :selected="filter"
          @update-selection="sortItems" />
      </div>

      <ul v-if="plants.length && !listByCategory" class="plant-list">
        <li v-for="plant in plants">
          <plant-preview
            @delete-plant="toggleElementInSelection"
            :deleteMode="isDeleteMode"
            :categoriseMode="isCategoryMode"
            :selected="hasCategory(plant)"
            :guid="plant.guid"
            :name="plant.name"
            :categories="plant.categories"
            :imageURL="plant.imageURL" />
        </li>
      </ul>

      <div v-else-if="plants.length && listByCategory">
        <div v-for="category in categories">
          <h2>{{ category.label }}</h2>
          <ul>
            <li v-for="">
              <!-- To be implemented. -->
            </li>
          </ul>
        </div>
      </div>

      <footer :class="footerClass">
        <selection-delete
          v-if="plants.length && !isCategoryMode"
          :activeSelection="isDeleteMode"
          :selected="this.selection.length"
          @cancel-selection="cancelDeleteMode"
          @delete-selection="activateDeleteMode" />

        <router-link
          v-if="!editMode"
          tag="button"
          aria-label="Add plant"
          class="add-plant circle"
          :to="{ path: 'add' }">
          <svgicon icon="leaf" width="16" height="24" color="#000"></svgicon>
        </router-link>

        <selection-categorise
          v-if="plants.length && !isDeleteMode"
          :activeSelection="isCategoryMode"
          :categories="categories"
          @category-selected="updateCategorySelection"
          @cancel-selection="cancelCategoriseMode"
          @categorise-selection="activateCategoriseMode"
          @save-selection="saveCategories" />
      </footer>
    </section>
  </main>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import AppHeader from '@/components/AppHeader'
  import OverviewAlert from '@/components/Alert'
  import SelectionDelete from './components/SelectionDelete'
  import SelectionCategorise from './components/SelectionCategorise'
  import PlantPreview from './components/PlantPreview'
  import PlantsIntro from './components/PlantsIntro'
  import OverviewFilter from './components/OverviewFilter'
  import '@/assets/leaf'

  export default {
    name: 'Overview',

    components: {
      'app-header': AppHeader,
      'overview-alert': OverviewAlert,
      'selection-delete': SelectionDelete,
      'selection-categorise': SelectionCategorise,
      'plants-intro': PlantsIntro,
      'plant-preview': PlantPreview,
      'overview-filter': OverviewFilter,
      'feather-arrow-down': () =>
        import('vue-feather-icon/components/arrow-down' /* webpackChunkName: "overview" */)
    },

    computed: {
      ...mapState({
        plants: state => state.plants,
        filter: state => state.settings.filter,
        categories: state => state.categories
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
      },
      listByCategory () {
        return this.filter === 'categories'
      }
    },

    data () {
      return {
        selection: [],
        selectedCategory: null,
        editMode: false,
        showAlert: false,
        showCategoryBackdrop: false
      }
    },

    methods: {
      ...mapActions([
        'loadPlants',
        'updatePlantCategory',
        'deletePlants',
        'showNotification',
        'updateFilter'
      ]),
      reset () {
        Object.assign(this.$data, this.$options.data()) // Reset state
      },
      toggleElementInSelection (item) {
        if (item.selected) {
          this.selection.push(item)
        } else {
          this.selection = this.selection.filter(s => s.guid !== item.guid)
        }
      },
      hasCategory (plant) {
        return plant.categories && this.selectedCategory &&
          plant.categories.some(cat => cat === this.selectedCategory.guid)
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
        this.reset()
      },
      confirmDeletePlants () {
        this.showNotification({ message: `Deleted ${this.selection.length} plants.` })
        this.deletePlants(this.selection)
        this.cancelDeleteMode()
      },
      updateCategorySelection (category) {
        this.showCategoryBackdrop = false
        this.selectedCategory = category
      },
      activateCategoriseMode () {
        this.editMode = 'category'
        this.showCategoryBackdrop = true

        if (!this.categoriseMode) {
          this.selection = []
        }
      },
      cancelCategoriseMode () {
        this.reset()
      },
      saveCategories () {
        this.selection.forEach(selection =>
          this.updatePlantCategory({
            guid: selection.guid,
            category: this.selectedCategory
          }))

        this.showNotification({
          message: `Category "${this.selectedCategory.label}" updated.`
        })

        this.cancelCategoriseMode()
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

  $content-index: list, backdrop, footer;
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

  .category-selection-backdrop {
    width: 100%;
    height: 100vh;
    position: absolute;
    background: var(--transparency-black-medium);
    z-index: z($content-index, backdrop);
    display: flex;
    justify-content: center;
    color: var(--text-color-inverse);
    align-items: center;
    flex-direction: column;

    p {
      margin-bottom: var(--base-gap);
      font-weight: 600;
    }

    svg,
    svg rect,
    svg path {
      stroke: var(--text-color-button);
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
