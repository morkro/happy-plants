<template>
  <div class="screen-home">
    <app-header>
      <template #actions>
        <transition name="circle">
          <div v-if="searchVisible" class="home-header-search">
            <v-input
              type="text"
              v-model="searchQuery"
              aria-placeholder="Search"
              placeholder="Search"
            />
            <button @click.prevent="closeActions">
              <span class="visuallyhidden">Search</span>
              <feather-cross />
            </button>
          </div>
        </transition>

        <div v-if="!searchVisible" class="home-header-actions">
          <button v-if="viewOptionsVisible" @click.prevent="closeActions">
            <span class="visuallyhidden">Search</span>
            <feather-cross />
          </button>
          <button v-if="!loading && !actionsActive" @click.prevent="showSearch">
            <span class="visuallyhidden">Search</span>
            <feather-search />
          </button>
          <button v-if="!actionsActive" @click.prevent="showViewOptions">
            <span class="visuallyhidden">Configure view</span>
            <feather-sliders />
          </button>
        </div>
      </template>
    </app-header>

    <transition name="slide">
      <view-options
        v-if="viewOptionsVisible"
        :viewmode="viewmode"
        :types="types"
        :order-by="orderBy"
        :filter-by="filterBy && filterBy.guid"
        :tags="tags"
        :loading="loading"
        @update-viewmode="updateViewmode"
        @toggle-types="toggleShowTypes"
        @update-orderby="updateOrderBy"
        @update-tag="updateTags"
        @update-type="updateTypes"
      />
    </transition>

    <main :class="mainContentClasses">
      <div v-if="!loading && plantData.length && filterBy" class="home-plants-filterby">
        <v-text color="inactive">
          <strong>Filtered by</strong>
        </v-text>
        <v-tag>{{ filterBy.label }}</v-tag>
      </div>

      <div v-if="loading" class="home-plants-list">
        <plant-preview
          v-for="(plant, index) of loadingPlantData"
          :key="`loading-plant-${index}`"
          :loading="loading"
        />
      </div>

      <div v-else-if="!loading && plantData.length" class="home-plants-list">
        <plant-preview
          v-for="plant of plantData"
          :loading="loading"
          :key="plant.guid"
          :label="plant.name"
          :link="`plant/${plant.guid}`"
          :photo="plant.imageURL"
          :listview="viewmode === 'list'"
        />
      </div>
      <empty-illustration v-else />
    </main>
  </div>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { mapActions, mapState } from 'vuex'
  import { Plant, PlantTag, PlantType } from '@/types/plant'
  import fuzzySearch from '@/utils/fuzzySearch'
  import { sortByAlphabet, sortByDate } from '@/utils/sort'
  import { getLocalEntry, setLocalEntry } from '@/services/localStorage'
  import config from '@/config'
  import Preview from '../components/Preview.vue'
  import EmptyIllustration from '../components/EmptyIllustration.vue'
  import ViewOptions from '../components/Options.vue'
  import { HomeState } from '../store/state'
  import { HomeViewmode, HomeOrderBy } from '..'

  interface HomeMapState extends HomeState {
    plants: {
      data: Plant[]
      loaded: boolean
    }
    tags: {
      data: PlantTag[]
      loaded: boolean
    }
  }

  const noop = () => {} // eslint-disable-line

  export default (Vue as VueConstructor<Vue & HomeMapState>).extend({
    name: 'Home',

    components: {
      'plant-preview': Preview,
      'empty-illustration': EmptyIllustration,
      'view-options': ViewOptions,
      'feather-search': () =>
        import('vue-feather-icons/icons/SearchIcon' /* webpackChunkName: "icons" */),
      'feather-cross': () => import('vue-feather-icons/icons/XIcon' /* webpackChunkName: "icons" */),
      'feather-sliders': () =>
        import('vue-feather-icons/icons/SlidersIcon' /* webpackChunkName: "icons" */),
    },

    data() {
      const query = this.$route.query
      return {
        loading: true,
        loadingPlantData: new Array(5).fill({}),
        searchVisible: this.$hasQuery('search'),
        viewOptionsVisible: this.$hasQuery('options'),
        searchQuery: query.search ? String(query.search).toLowerCase() : '',
        viewmode: getLocalEntry(config.localStorage.homeViewmode) ?? 'grid',
        types: getLocalEntry(config.localStorage.homeShowPlantTypes) === 'true',
        orderBy: getLocalEntry(config.localStorage.homeOrderBy) ?? 'latest',
        filterById: null,
        filterBy: null,
      }
    },

    computed: {
      ...mapState<HomeState>('home', {
        plants: (state: HomeState) => state.plants,
        tags: (state: HomeState) => state.tags,
      }),
      plantData(): Plant[] {
        if (this.searchQuery) {
          return this.plants.data.filter((plant: Plant) =>
            fuzzySearch(this.searchQuery.toLowerCase(), plant.name.toLowerCase())
          )
        }

        if (this.filterBy) {
          if (this.filterById === 'tags') {
            return this.plants.data.filter(plant => this.filterBy.plants.includes(plant.guid))
          } else if (this.filterById === 'type') {
            return this.plants.data.filter(plant => plant.type.guid === this.filterBy.guid)
          }
        }

        const copy = this.plants.data
        if (this.orderBy === 'latest') {
          return copy.sort(sortByDate).reverse()
        } else if (this.orderBy === 'alphabetically') {
          return copy.sort(sortByAlphabet)
        }

        return copy
      },
      actionsActive(): boolean {
        return this.searchVisible || this.viewOptionsVisible
      },
      mainContentClasses(): Record<string, boolean> {
        return {
          overlay: this.viewOptionsVisible,
          empty: this.plantData.length === 0,
          [this.viewmode]: true,
        }
      },
    },

    watch: {
      plants(newValue) {
        if (this.loading && newValue.length) {
          this.loading = false
        }
      },
      searchQuery(newQuery): void {
        if (newQuery && this.$route.path !== `/home?search=${newQuery}`) {
          this.$router.push({ path: '/home', query: { search: newQuery } }).catch(noop)
        }
      },
    },

    methods: {
      ...mapActions({
        loadPlants: 'home/loadPlants',
        loadTags: 'home/loadTags',
      }),
      showSearch(): void {
        this.searchVisible = true
      },
      showViewOptions(): void {
        this.viewOptionsVisible = true
        this.$router.push({ path: '/home', query: { options: null } })
      },
      closeActions(): void {
        this.searchQuery = ''
        this.searchVisible = false
        this.viewOptionsVisible = false

        if (this.$hasQuery('search') || this.$hasQuery('options')) {
          this.$router.push({ path: '/home' })
        }
      },
      updateViewmode(type: HomeViewmode): void {
        this.viewmode = type
        setLocalEntry(config.localStorage.homeViewmode, type)
      },
      toggleShowTypes(): void {
        this.types = !this.types
        setLocalEntry(config.localStorage.homeShowPlantTypes, String(this.types))
      },
      updateOrderBy(type: HomeOrderBy): void {
        this.orderBy = type
        setLocalEntry(config.localStorage.homeOrderBy, type)
      },
      updateTags(tag: PlantTag): void {
        this.filterById = 'tag'
        this.filterBy = tag
      },
      updateTypes(type: PlantType): void {
        this.filterById = 'type'
        this.filterBy = type
      },
    },

    async created() {
      if (!this.plants.loaded) {
        await this.loadPlants({ orderBy: this.orderBy })
        this.loading = false
      }

      if (!this.tags.loaded) {
        await this.loadTags()
      }
    },

    beforeMount() {
      if (this.plants.loaded) {
        this.loading = false
      }
    },
  })
</script>

<style lang="postcss" scoped>
  @import '../../../styles/animations.css';
  @import '../../../styles/media-queries.css';

  .screen-home {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    & main {
      padding: 0 var(--base-gap);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      z-index: 0;

      &::before {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background: var(--brand-black-50);
        content: '';
        display: block;
        transform: translateY(-100%);
        animation: appear-reverse 150ms;
      }

      &.overlay::before {
        overflow: none;
        animation: appear 150ms both;
      }

      &.empty {
        justify-content: center;
      }
    }
  }

  .screen-home #app-header {
    background: var(--brand-beige);
    z-index: 2;

    & .home-header-actions {
      display: flex;
      height: 100%;
    }

    & .home-header-search {
      width: 100%;
      height: var(--app-header-height);
      background: var(--brand-white);
      position: absolute;
      top: 0;
      left: 0;
      display: flex;

      & input {
        width: 100%;

        &:active,
        &:focus {
          box-shadow: inset 0 2px 9px var(--brand-black-50);
          border-color: var(--brand-white);
        }
      }
    }

    & .home-header-search button,
    & .home-header-actions button {
      height: 100%;
      padding: 0 var(--base-gap);
      background: transparent;
      border: none;
      color: var(--brand-green-dark);

      &:focus,
      &:active {
        color: var(--brand-white);
        background: var(--brand-green-dark);
        outline: none;
      }
    }
  }

  .home-plants-filterby {
    width: 100%;
    text-align: left;
    padding-bottom: calc(0.5 * var(--base-gap));
    display: grid;
    grid-template-columns: max-content min-content;
    grid-gap: calc(0.5 * var(--base-gap));
    align-items: center;
  }

  .home-plants-list {
    --screen-width-half: 50vw;
    --grid-item-height: calc(var(--screen-width-half) - 1.5 * var(--base-gap));
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: var(--grid-item-height);
    grid-gap: var(--base-gap);

    @nest main.list & {
      grid-template-columns: 1fr;
      grid-auto-rows: 70px;
    }

    @media (--max-mobile-viewport) {
      --screen-width-half: calc(0.5 * var(--app-max-width));
    }
  }

  /* Animations */
  .circle-enter-active {
    animation: circle-clip 333ms both;
  }

  .circle-leave-active {
    animation: circle-clip 200ms reverse;
  }

  @keyframes circle-clip {
    0% {
      clip-path: circle(0% at 93.5%);
    }
    100% {
      clip-path: circle(150% at 93.5%);
    }
  }

  .slide-enter-active {
    animation: slide-in 500ms linear both;
  }

  .slide-leave-active {
    animation: slide-up 150ms linear;
  }

  @keyframes slide-up {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  @keyframes slide-in {
    0% {
      transform: translateY(-100%);
    }
    4.5% {
      transform: translateY(-51.473%);
    }
    9.01% {
      transform: translateY(-12.002%);
    }
    13.51% {
      transform: translateY(8.742%);
    }
    17.92% {
      transform: translateY(13.922%);
    }
    29.03% {
      transform: translateY(3.229%);
    }
    34.63% {
      transform: translateY(-0.593%);
    }
    40.14% {
      transform: translateY(-1.543%);
    }
    62.36% {
      transform: translateY(0.171%);
    }
    84.68% {
      transform: translateY(-0.019%);
    }
    100% {
      transform: translateY(0%);
    }
  }
</style>
