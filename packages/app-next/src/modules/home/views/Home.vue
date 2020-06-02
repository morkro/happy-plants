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
      <div v-if="viewOptionsVisible" class="home-view-options">
        <section>
          <v-text type="subtitle">Viewmode</v-text>
          <ul>
            <li>
              <v-input type="radio" />
              <v-text>Grid</v-text>
            </li>
            <li>
              <v-input type="radio" />
              <v-text>List</v-text>
            </li>
          </ul>
          <v-text type="subtitle">Order by</v-text>
          <ul>
            <li>
              <v-input type="radio" />
              <v-text>Latest</v-text>
            </li>
            <li>
              <v-input type="radio" />
              <v-text>Alphabetically</v-text>
            </li>
          </ul>
        </section>
        <section>
          <v-text type="subtitle">Filter by tags</v-text>
        </section>

        <svg
          class="home-view-options-bg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 360 32"
          aria-hidden="true"
        >
          <path
            fill="#FFF"
            fill-rule="evenodd"
            d="M202.13 18.156c.386 3.896.201 1.481.035 6.35-.034 1.002-.48 1.648-1.32 1.98-7.018 2.764-32.58 5.9-39.062 4.755-.876-2.465-1.016-5.159-.422-7.188 1.09-.84 0 .117 21.717-2.63 10.732-1.358 14.256-2.554 16.625-3.093.701-.16 1.395-.545 2.426-.174zM360 0v10.245c-3.864 3.4-10.353 1.537-26.979.121-102.7-8.747-132.682 15.276-244.46 8.368-75.47-4.665-51.996-2.844-76.452-6.022l.09-.354C7.145 11.283 2.97 10.646 0 9.73L.002 0h360z"
          />
        </svg>
      </div>
    </transition>

    <main :class="{ overlay: viewOptionsVisible }">
      <div v-if="plantData.length" class="home-plants-list">
        <plant-preview
          v-for="plant of plantData"
          :loading="loading"
          :key="plant.guid"
          :label="plant.name"
          :link="`plant/${plant.guid}`"
        />
      </div>
      <empty-illustration v-else />
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions, mapState } from 'vuex'
  import { RootState } from '@/store'
  import Preview from '../components/Preview.vue'
  import EmptyIllustration from '../components/EmptyIllustration.vue'
  import { Plant } from '@/types/plant'
  import fuzzySearch from '@/utils/fuzzySearch'

  export default Vue.extend({
    name: 'Home',

    components: {
      'plant-preview': Preview,
      'empty-illustration': EmptyIllustration,
      'feather-search': () =>
        import('vue-feather-icons/icons/SearchIcon' /* webpackChunkName: "icons" */),
      'feather-cross': () => import('vue-feather-icons/icons/XIcon' /* webpackChunkName: "icons" */),
      'feather-sliders': () =>
        import('vue-feather-icons/icons/SlidersIcon' /* webpackChunkName: "icons" */),
    },

    data() {
      const query = this.$route.query.search
      return {
        loading: true,
        searchVisible: !!query,
        viewOptionsVisible: false,
        searchQuery: query ? String(query).toLowerCase() : '',
      }
    },

    computed: {
      ...mapState<RootState>({
        plants: (state: RootState) => state.home.plants,
      }),
      plantData(): Array<Plant | {}> {
        if (this.loading) {
          return new Array(5).fill({})
        } else if (this.searchQuery) {
          return this.plants.filter((plant: Plant) =>
            fuzzySearch(this.searchQuery.toLowerCase(), plant.name.toLowerCase())
          )
        }
        return this.plants
      },
      actionsActive(): boolean {
        return this.searchVisible || this.viewOptionsVisible
      },
    },

    watch: {
      searchQuery(newQuery): void {
        let query
        if (newQuery) {
          query = { search: newQuery }
        }

        this.$router.push({ path: '/home', query })
      },
    },

    methods: {
      ...mapActions({ loadPlants: 'home/loadPlants' }),
      showSearch(): void {
        this.searchVisible = true
      },
      showViewOptions(): void {
        this.viewOptionsVisible = true
      },
      closeActions(): void {
        this.searchQuery = ''
        this.searchVisible = false
        this.viewOptionsVisible = false
      },
    },

    async created() {
      if (this.plants.length === 0) {
        await this.loadPlants()
        this.loading = false
      }
    },

    beforeMount() {
      if (this.plants.length) {
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

      & svg {
        stroke: var(--brand-green-dark);
      }
    }
  }

  .home-view-options {
    position: fixed;
    z-index: 1;
    top: 0;
    background: var(--brand-white);
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    padding-top: var(--app-header-height);

    & section {
      padding: var(--base-gap);
      position: relative;

      &:first-of-type {
        border-right: 4px solid var(--brand-beige);
      }

      &::after {
        content: '';
        position: absolute;
        z-index: 10;
        right: 0;
        bottom: 0;
        background: var(--brand-beige);
        border-radius: var(--base-radius);
        height: 4px;
        width: 4px;
        transform: translate(4px, 11px);
      }
    }

    & .home-view-options-bg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      transform: translateY(100%);
    }
  }

  .home-plants-list {
    --screen-width-half: 50vw;
    --grid-item-height: calc(var(--screen-width-half) - 2 * var(--base-gap));
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: var(--grid-item-height);
    grid-gap: var(--base-gap);

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
