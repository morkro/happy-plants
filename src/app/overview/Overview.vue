<template>
  <div class="main-wireframe">
    <!-- Alert window pops up as confirmation the user is about to delete plants. -->
    <overview-dialog
      type="warning"
      class="overview-dialog"
      :show="showDialog"
      @close-dialog="cancelDeleteMode">
      <h1 slot="headline">Are you sure?</h1>
      <p slot="content">
        You are about to delete <strong>{{ selection.length }}</strong> plants.
      </p>
      <button slot="cancel"
        type="button"
        class="plain"
        @click="cancelDeleteMode">
        Cancel
      </button>
      <button slot="confirm"
        type="button"
        class="warning"
        @click="confirmDeletePlants">
        Yes, delete plants
      </button>
    </overview-dialog>

    <div v-if="showBackdrop"
      class="overview-backdrop"
      @click="hideBackdrop" />

    <main :class="{ 'no-plants': plants.length <= 0, 'app-content': true }">
      <!-- Simple onboarding instruction if user has no plants yet. -->
      <plants-intro
        v-if="plants.length <= 0"
        key="overview-intro" />

      <!-- List of plants used when filter is either "alphabetical" or "latest". -->
      <plants-list
        v-if="plants.length"
        @delete-selection="toggleDeleteSelection"
        @pressed-selection="togglePressedSelection"
        :plants="plants"
        :type="viewMode"
        :is-delete-mode="isDeleteMode"
        :is-pressed-mode="isPressedMode" />

      <div :class="footerClass">
        <viewmode-menu
          class="viewmode-menu"
          v-if="isViewMode"
          :view-mode="viewMode"
          :order-by="orderBy"
          @update="updateViewmodeFromMenu" />

        <!-- Delete button and control element. -->
        <delete-menu
          v-if="isDeleteMode"
          :selected="this.selection.length"
          @cancel-selection="cancelDeleteMode"
          @delete-selection="activateDeleteMode" />

        <overview-menu
          v-if="showMenu"
          :no-elements="!plants.length"
          :show-viewmode="!!plants.length"
          :show-delete="!!plants.length"
          :disable-menu="isViewMode"
          @clicked-item="updateEditMode" />
      </div>
    </main>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import AppHeader from '@/components/AppHeader'
  import OverviewDialog from '@/components/Dialog'
  import OverviewMenu from './components/Menu'
  import DeleteMenu from './components/DeleteMenu'
  import PlantsList from './components/PlantsList'
  import PlantsIntro from './components/PlantsIntro'
  import ViewmodeMenu from './components/ViewmodeMenu'

  export default {
    name: 'Overview',

    components: {
      'app-header': AppHeader,
      'overview-dialog': OverviewDialog,
      'plants-intro': PlantsIntro,
      'plants-list': PlantsList,
      'overview-menu': OverviewMenu,
      'delete-menu': DeleteMenu,
      'viewmode-menu': ViewmodeMenu,
      'feather-arrow-down': () =>
        import('vue-feather-icon/components/arrow-down' /* webpackChunkName: "overview" */)
    },

    computed: {
      ...mapState({
        plants: state => state.plants,
        viewMode: state => state.settings.viewMode,
        orderBy: state => state.settings.orderBy
      }),
      isViewMode () {
        return this.editMode === 'view-mode'
      },
      isDeleteMode () {
        return this.editMode === 'delete'
      },
      isPressedMode () {
        return this.editMode === 'pressed'
      },
      footerClass () {
        return {
          'overview-footer-menu': true,
          'editmode': this.editMode,
          [`mode-${this.editMode}`]: this.editMode
        }
      },
      showMenu () {
        return (
          this.editMode === false ||
          this.editMode === 'pressed' ||
          this.isViewMode
        )
      }
    },

    watch: {
      showBackdrop (show) {
        if (show) {
          this.$root.$el.parentNode.classList.add('js-no-scrolling')
        } else {
          this.$root.$el.parentNode.classList.remove('js-no-scrolling')
        }
      },
      selection () {
        if (this.editMode === 'pressed' && this.selection.length === 0) {
          this.editMode = false
        }
      }
    },

    data () {
      return {
        selection: [],
        editMode: false,
        showDialog: false,
        showBackdrop: false
      }
    },

    created () {
      this.updateAppHeader({
        title: 'Happy Plants',
        backBtn: false,
        settingsBtn: true
      })
    },

    methods: {
      ...mapActions([
        'loadPlants',
        'deletePlants',
        'showNotification',
        'updateViewmode',
        'updateAppHeader'
      ]),
      reset () {
        Object.assign(this.$data, this.$options.data()) // Reset state
      },
      toggleDeleteSelection (item) {
        if (item.selected) {
          this.selection.push(item)
        } else {
          this.selection = this.selection.filter(s => s.guid !== item.guid)
        }
      },
      togglePressedSelection (item) {
        this.editMode = 'pressed'
        if (item.pressed) {
          this.selection.push(item)
        } else {
          this.selection = this.selection.filter(s => s.guid !== item.guid)
        }
      },
      activateDeleteMode () {
        // If the delete mode is already active, the selected elements should
        // be deleted and the mode deactivated again.
        if (this.isDeleteMode && this.selection.length) {
          this.showDialog = true
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
  .main-wireframe {
    min-height: 100vh;
    background: var(--background-secondary);
  }

  .main-wireframe > .app-content {
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

  .overview-dialog {
    & button.warning {
      background: var(--brand-yellow);
      color: var(--link-color);
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

  .overview-footer-menu {
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
