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
      :selected="plant.type"
      @type-selected="setSelectedType"
      @close-dialog="toggleDialog('type', false)"
    />

    <main>
      <plant-header
        :loading="loading"
        :name="plant.name"
        :photo="plant.imageURL"
        v-observe-visibility.60="observeVisibility"
      />

      <module-type :type="plant.type" @open-dialog="toggleDialog('type', true)" />

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
  import { HomeState } from '@/modules/home/store/state'
  import SettingsDialog from '../components/SettingsDialog.vue'
  import PlantHeader from '../components/PlantHeader.vue'
  import ModuleTags from '../components/ModuleTags.vue'
  import ModuleType from '../components/ModuleType.vue'
  import ModulesContainer from '../components/ModulesContainer.vue'

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
        allTags: (state: RootState) => state.home.tags,
      }),
      plantTags(): HomeState['tags'] {
        return Object.assign({}, this.allTags, {
          data: this.allTags.data.filter(tag => tag.plants.includes(this.plant.guid)),
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
        loadTags: 'home/loadTags',
        createTag: 'home/createTag',
        updateTags: 'home/updateTags',
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
        this.headerInView = visible
      },
      async setSelectedTags(tags: PlantTag[]) {
        const removed = this.allTags.data.filter(tag => !tags.find(t => t.guid === tag.guid))
        await this.updateTags(
          this.plantTags.data.map((tag: PlantTag) => {
            if (!tag.plants.includes(this.plant.guid)) {
              tag.plants.push(this.plant.guid)
            } else if (removed.find(r => r.guid === tag.guid)) {
              tag.plants = tag.plants.filter(p => p !== this.plant.guid)
            }
            return tag
          })
        )
      },
      async setSelectedType(type: PlantType) {
        console.log(type)
      },
      async createNewTag(label: string) {
        await this.createTag({ label })
      },
    },
    async created() {
      if (!this.allTags.loaded) {
        await this.loadTags()
      }
    },
  })
</script>

<style lang="postcss">
  .screen-plant {
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
