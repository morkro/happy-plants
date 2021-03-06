<template>
  <v-layout :class="layoutClass">
    <app-header :class="{ 'hide-logo': headerInView }">
      {{ headerInView ? ' ' : plant && plant.name }}
      <template #actions>
        <div class="plant-header-actions">
          <v-button round small @click.native="toggleDialog('settings', true)">
            <span class="visuallyhidden">Open settings</span>
            <feather-more />
          </v-button>
        </div>
      </template>
    </app-header>

    <settings-dialog
      :show="showSettingsDialog"
      :plant="plant"
      @close-dialog="toggleDialog('settings', false)"
    />

    <tags-dialog
      :show="showTagsDialog"
      :tags="allTags"
      :preselected="plantTags.data"
      @create-tag="createNewTag"
      @tags-selected="setSelectedTags"
      @close-dialog="toggleDialog('tags', false)"
    />

    <type-dialog
      :show="showTypeDialog"
      :selected="plant && plant.type"
      @type-selected="setSelectedType"
      @close-dialog="toggleDialog('type', false)"
    />

    <main>
      <plant-header
        :loading="loading"
        :name="plant && plant.name"
        :photo="plant && plant.imageURL"
        @update-name="setNewName"
        v-observe-visibility.60="observeVisibility"
      />

      <module-type :type="plant && plant.type" @open-dialog="toggleDialog('type', true)" />

      <module-tags :tags="plantTags.data" @open-dialog="toggleDialog('tags', true)" />

      <modules-container />
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue, { PropType, VueConstructor } from 'vue'
  import { mapState, mapActions } from 'vuex'
  import { RootState } from '@/store'
  import { Plant, PlantTag, PlantType } from '@/types/plant'
  import { TagsState } from '@/modules/tags/store/state'
  import SettingsDialog from '../components/SettingsDialog.vue'
  import PlantHeader from '../components/PlantHeader.vue'
  import ModuleTags from '../components/ModuleTags.vue'
  import ModuleType from '../components/ModuleType.vue'
  import ModulesContainer from '../components/ModulesContainer.vue'
  import deepMerge from '@/utils/merge'
  import logger from '@/utils/vueLogger'

  /**
   * TODO: Implement update name
   * TODO: Implement update photo
   * TODO: Add modules
   * TODO: Add gallery
   */

  interface PlantMapState {
    allTags: {
      data: PlantTag[]
      loaded: boolean
    }
  }

  export default (Vue as VueConstructor<Vue & PlantMapState>).extend({
    name: 'Plant',
    props: {
      plant: {
        type: Object as PropType<Plant>,
      },
      loading: {
        type: Boolean,
      },
    },
    components: {
      'settings-dialog': SettingsDialog,
      'plant-header': PlantHeader,
      'module-type': ModuleType,
      'module-tags': ModuleTags,
      'modules-container': ModulesContainer,
      'feather-more': () =>
        import('vue-feather-icons/icons/MoreVerticalIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        showSettingsDialog: this.$hasQuery('settings'),
        showTagsDialog: this.$hasQuery('tags'),
        showTypeDialog: this.$hasQuery('type'),
        headerInView: true,
        selectedTags: [] as PlantTag[],
      }
    },
    computed: {
      ...mapState<RootState>({
        allTags: (state: RootState) => state.tags,
      }),
      plantTags(): TagsState {
        return Object.assign({}, this.allTags, {
          data: this.allTags.data.filter((tag) => tag.plants.includes(this.plant?.guid)),
        })
      },
      layoutClass(): Record<string, boolean> {
        return {
          'screen-plant': true,
          'no-photo': this.loading || !this.plant.imageURL,
          'header-in-view': this.headerInView,
        }
      },
    },
    methods: {
      ...mapActions({
        loadTags: 'tags/loadTags',
        createTag: 'tags/createTag',
        updateTags: 'tags/updateTags',
        updatePlant: 'plants/updatePlant',
        showNotification: 'notifications/show',
      }),
      toggleDialog(type: 'tags' | 'settings' | 'type', show: boolean) {
        let query

        if (type === 'tags') {
          this.showTagsDialog = show
          query = { tags: null }
        } else if (type === 'type') {
          this.showTypeDialog = show
          query = { type: null }
        } else {
          this.showSettingsDialog = show
          query = { settings: null }
        }

        if (show) {
          this.$router.push({ path: this.$route.path, query })
        } else {
          this.$router.push(this.$route.path)
        }
      },
      observeVisibility(visible: boolean) {
        console.log('visible', visible)
        this.headerInView = visible
      },
      async setNewName(name: string) {
        try {
          await this.updatePlant(
            deepMerge(this.plant, {
              guid: this.plant.guid,
              modified: Date.now(),
              name,
            })
          )
        } catch (error) {
          logger(error.name, true)
          this.showNotification({ type: 'alert', message: 'There was a problem updating. ' })
        }
      },
      async setSelectedTags(tags: PlantTag[]) {
        const removed = this.allTags.data.filter((tag) => !tags.find((t) => t.guid === tag.guid))
        await this.updateTags(
          this.plantTags.data.map((tag: PlantTag) => {
            if (!tag.plants.includes(this.plant.guid)) {
              tag.plants.push(this.plant.guid)
            } else if (removed.find((r) => r.guid === tag.guid)) {
              tag.plants = tag.plants.filter((p) => p !== this.plant.guid)
            }
            return tag
          })
        )
      },
      async setSelectedType(type: PlantType) {
        try {
          await this.updatePlant(
            deepMerge(this.plant, {
              guid: this.plant.guid,
              modified: Date.now(),
              type,
            })
          )
          this.plant.type = type
        } catch (error) {
          logger(error.name, true)
          this.showNotification({ type: 'alert', message: 'There was a problem updating. ' })
        }
      },
      async createNewTag(label: string) {
        try {
          await this.createTag({ label })
        } catch (error) {
          logger(error.name, true)
          this.showNotification({ type: 'alert', message: 'There was a problem updating. ' })
        }
      },
    },
    async created() {
      if (!this.allTags.loaded) {
        try {
          await this.loadTags()
        } catch (error) {
          logger(error.message, true)
        }
      }
    },
  })
</script>

<style lang="postcss">
  .screen-plant {
    background: var(--brand-beige);

    &.header-in-view:not(.no-photo) #app-header .app-header-icon svg {
      stroke: var(--brand-white);
    }

    &.header-in-view #app-header {
      background: transparent;
    }

    & #app-header {
      margin-bottom: calc(-1 * var(--app-header-height));
      background: var(--brand-beige);

      & .plant-header-actions {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 var(--base-gap);

        & .btn {
          --background: transparent;
          --shadow: none;
          color: var(--brand-green-dark);
          border-color: transparent;
        }
      }
    }

    &.header-in-view #app-header .plant-header-actions .btn {
      --background: var(--brand-black-50);
      --shadow: none;
      border-color: transparent;
      color: var(--brand-white);
    }
  }

  .app-screen.screen-plant #app-header.hide-logo .app-header-icon {
    opacity: 0;
  }

  .app-screen.screen-plant main {
    padding: 0;
    justify-content: flex-start;
  }
</style>
