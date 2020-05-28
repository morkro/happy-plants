<template>
  <main class="screen-home">
    <app-header />
    <main>
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
    <app-menu />
  </main>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions, mapState } from 'vuex'
  import { RootState } from '@/store'
  import Preview from '../components/Preview.vue'
  import EmptyIllustration from '../components/EmptyIllustration.vue'
  import { Plant } from '@/shared/types/plant'
  import delay from '../../../utils/promiseDelay'

  export default Vue.extend({
    name: 'Home',

    components: {
      'plant-preview': Preview,
      'empty-illustration': EmptyIllustration,
    },

    data: () => ({
      loading: true,
    }),

    computed: {
      ...mapState<RootState>({
        plants: (state: RootState) => state.home.plants,
      }),
      plantData(): Array<Plant | {}> {
        if (this.loading) {
          return new Array(5).fill({})
        }
        return this.plants
      },
    },

    methods: {
      ...mapActions({ loadPlants: 'home/loadPlants' }),
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
  .screen-home {
    width: 100%;
    display: flex;
    flex-direction: column;

    & #app-header {
      background: var(--brand-beige);
    }

    & main {
      padding: 0 var(--base-gap);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }

  .home-plants-list {
    --grid-item-height: calc(50vw - 2 * var(--base-gap));
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: var(--grid-item-height);
    grid-gap: var(--base-gap);
  }
</style>
