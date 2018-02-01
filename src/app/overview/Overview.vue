<template>
  <main class="main-wireframe">
    <app-header :settings="true" :scrollUp="true">
      <h1 slot="title">
        Happy Plants
      </h1>
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

    <div v-if="showBackdrop" class="overview-backdrop" @click="hideBackdrop">
      <div v-if="isCategoryMode">
        <p>Select category</p>
        <feather-arrow-down />
      </div>
    </div>

    <section :class="{ 'no-plants': plants.length <= 0, 'app-content': true }">
      <!-- Simple onboarding instruction if user has no plants yet. -->
      <plants-intro
        v-if="plants.length <= 0"
        key="overview-intro" />

      <!-- List of plants used when filter is either "alphabetical" or "latest". -->
      <plants-list
        v-if="plants.length && (!listByCategory || isCategoryMode)"
        @delete-selection="toggleDeleteSelection"
        @categorise-selection="toggleCategorySelection"
        :plants="plants"
        :selectedCategory="selectedCategory"
        :isDeleteMode="isDeleteMode"
        :isCategoryMode="isCategoryMode" />

      <!-- List of plants if filter is set to "category". -->
      <div v-else-if="plants.length && (listByCategory || !isCategoryMode)" class="plant-list-category">
        <div
          v-for="(category, index) in sortedCategoryList"
          v-if="category.plants.length"
          :key="index">
          <h2 @click="toggleCollapseCategory(index)">
            {{ category.label }}
            <feather-maximize v-if="isCollapsed(index)" width="18" height="18" />
            <feather-minimize v-else width="18" height="18" />
          </h2>

          <div v-show="isCollapsed(index)" class="list-collapsed-indicator"></div>

          <plants-list
            v-show="!isCollapsed(index)"
            @delete-selection="toggleDeleteSelection"
            @categorise-selection="toggleCategorySelection"
            :plants="category.plants"
            :selectedCategory="selectedCategory"
            :isDeleteMode="isDeleteMode"
            :isCategoryMode="isCategoryMode" />
        </div>
      </div>

      <footer :class="footerClass">
        <viewmode-menu
          class="viewmode-menu"
          v-if="isViewMode"
          :viewMode="viewMode"
          :orderBy="orderBy"
          @update="updateViewmodeFromMenu" />

        <!-- Delete button and control element. -->
        <delete-menu
          v-if="isDeleteMode"
          :selected="this.selection.length"
          @cancel-selection="cancelDeleteMode"
          @delete-selection="activateDeleteMode" />

        <!-- Categorisation button and control element. -->
        <categorise-menu
          v-if="isCategoryMode"
          :categories="categories"
          @category-selected="updateCategorySelection"
          @cancel-selection="cancelCategoriseMode"
          @save-selection="saveCategories" />

        <overview-menu
          v-if="editMode === false || isViewMode"
          :noElements="!plants.length"
          :showViewmode="!!plants.length"
          :showCategories="viewMode === 'categories'"
          :showDelete="!!plants.length"
          :disableMenu="isViewMode"
          @clicked-item="updateEditMode" />
      </footer>
    </section>
  </main>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { sortByDate, sortByAlphabet } from '@/utils/sort'

  import AppHeader from '@/components/AppHeader'
  import OverviewAlert from '@/components/Alert'

  import OverviewMenu from './components/Menu'
  import DeleteMenu from './components/DeleteMenu'
  import CategoriseMenu from './components/CategoriseMenu'
  import PlantsList from './components/PlantsList'
  import PlantsIntro from './components/PlantsIntro'
  import ViewmodeMenu from './components/ViewmodeMenu'

  export default {
    name: 'Overview',

    components: {
      'app-header': AppHeader,
      'overview-alert': OverviewAlert,
      'plants-intro': PlantsIntro,
      'plants-list': PlantsList,
      'overview-menu': OverviewMenu,
      'delete-menu': DeleteMenu,
      'categorise-menu': CategoriseMenu,
      'viewmode-menu': ViewmodeMenu,
      'feather-arrow-down': () =>
          import('vue-feather-icon/components/arrow-down' /* webpackChunkName: "overview" */),
      'feather-minimize': () =>
          import('vue-feather-icon/components/minimize-2' /* webpackChunkName: "overview" */),
      'feather-maximize': () =>
          import('vue-feather-icon/components/maximize-2' /* webpackChunkName: "overview" */)
    },

    computed: {
      ...mapState({
        plants: state => state.plants,
        viewMode: state => state.settings.viewMode,
        orderBy: state => state.settings.orderBy,
        categories: state => state.categories
      }),
      isViewMode () {
        return this.editMode === 'view-mode'
      },
      isCategoryMode () {
        return this.editMode === 'category'
      },
      isDeleteMode () {
        return this.editMode === 'delete'
      },
      footerClass () {
        return {
          'editmode': this.editMode,
          [`mode-${this.editMode}`]: this.editMode
        }
      },
      listByCategory () {
        return this.viewMode === 'categories'
      },
      sortedCategoryList () {
        if (this.selectedCategory) {
          return this.categories
        }

        const list = this.categories.map(cat => ({
          guid: cat.guid,
          label: cat.label,
          plants: this.sortPlants(this.plants.filter(plant =>
            plant.categories && plant.categories.includes(cat.guid)))
        }))

        list.push({
          label: 'Uncategorised',
          plants: this.sortPlants(this.plants.filter(plant =>
            plant.categories && !plant.categories.length))
        })

        return list
      }
    },

    watch: {
      showBackdrop (show) {
        if (show) {
          this.$root.$el.parentNode.classList.add('js-no-scrolling')
        } else {
          this.$root.$el.parentNode.classList.remove('js-no-scrolling')
        }
      }
    },

    data () {
      return {
        selection: [],
        selectedCategory: false,
        editMode: false,
        showAlert: false,
        showBackdrop: false,
        collapsedCategories: []
      }
    },

    methods: {
      ...mapActions([
        'loadPlants',
        'updatePlantCategory',
        'deletePlants',
        'showNotification',
        'updateViewmode'
      ]),
      reset () {
        Object.assign(this.$data, this.$options.data()) // Reset state
      },
      sortPlants (list) {
        switch (this.orderBy) {
          case 'latest':
            return list.sort(sortByDate).reverse()
          case 'alphabetical':
            return list.sort(sortByAlphabet)
        }
      },
      toggleDeleteSelection (item) {
        if (item.selected) {
          this.selection.push(item)
        } else {
          this.selection = this.selection.filter(s => s.guid !== item.guid)
        }
      },
      toggleCategorySelection (item) {
        this.selection.push(item)
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
        const message = this.selection.length > 1
          ? `Deleted ${this.selection.length} plants.`
          : `Deleted ${this.selection.length} plant.`

        this.showNotification({ message })
        this.deletePlants(this.selection)
        this.cancelDeleteMode()
      },
      updateCategorySelection (category) {
        this.showBackdrop = false
        this.selectedCategory = category
      },
      cancelCategoriseMode () {
        this.reset()
      },
      saveCategories () {
        this.selection.forEach(selection =>
          this.updatePlantCategory({
            guid: selection.guid,
            category: this.selectedCategory,
            type: selection.type
          }))

        this.showNotification({
          message: `Category "${this.selectedCategory.label}" updated.`
        })

        this.cancelCategoriseMode()
      },
      toggleCollapseCategory (index) {
        if (this.collapsedCategories.includes(index)) {
          this.collapsedCategories.splice(this.collapsedCategories.indexOf(index), 1)
        } else {
          this.collapsedCategories.push(index)
        }
      },
      isCollapsed (index) {
        return this.collapsedCategories.includes(index)
      },
      updateEditMode (type) {
        this.editMode = type

        if (type === 'category' || type === 'view-mode') {
          this.showBackdrop = true

          if (!this.categoriseMode) {
            this.selection = []
          }
        }
      },
      hideBackdrop () {
        if (this.isViewMode) {
          this.showBackdrop = false
          this.editMode = false
        }
      },
      updateViewmodeFromMenu (data) {
        this.updateViewmode({
          [data.section]: data.type
        })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  main {
    min-height: 100vh;
    background: var(--background-secondary);
  }

  main > section {
    height: 100%;
    padding: var(--base-gap);
    padding-bottom: calc(var(--app-footer-size) * 1.2);

    &.no-plants {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - var(--app-header-size));
    }
  }

  .overview-alert {
    & button.warning {
      background: var(--brand-yellow);
      color: var(--link-color);
      box-shadow: var(--plain-shadow);
    }
  }

  .header-controls {
    display: flex;

    & button {
      margin-right: var(--base-gap);
    }

    & .active svg {
      fill: black;
    }
  }

  .overview-backdrop {
    width: 100%;
    height: 100vh;
    position: fixed;
    background: var(--transparency-black-medium);
    z-index: 2;
    color: var(--text-color-inverse);
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    & p {
      margin-bottom: var(--base-gap);
      font-weight: 600;
    }

    & svg,
    & svg rect,
    & svg path {
      stroke: var(--text-color-button);
    }
  }

  .plant-list {
    z-index: 1;
  }

  .plant-list-category {
    & h2 {
      display: flex;
      align-items: center;
      margin-bottom: var(--base-gap);
    }

    & h2 svg {
      stroke: var(--dark-grey);
      margin-left: calc(var(--base-gap) / 2);
    }

    & .plant-list {
      justify-content: flex-start;
      margin-bottom: calc(var(--base-gap) * 0.5);
    }

    & .list-collapsed-indicator {
      width: 100%;
      height: 10px;
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--base-gap);
      --list-gap: calc(var(--base-gap) * 2 - var(--base-gap) / 2);

      &::after,
      &::before {
        content: "";
        border-radius: var(--border-radius);
        border: 2px dashed var(--grey);
        width: calc(50vw - var(--list-gap));
      }
    }
  }

  section footer {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 3;
    width: 100%;
    height: var(--app-footer-size);

    & .viewmode-menu {
      width: calc(100% - var(--base-gap) * 2);
      position: absolute;
      top: 0;
      transform:
        translateY(calc(-100% - var(--base-gap)))
        translateX(var(--base-gap));
    }
  }
</style>
