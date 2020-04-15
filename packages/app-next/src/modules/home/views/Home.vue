<template>
  <main class="screen-home">
    <app-header />
    <main>
      <div v-for="plant of plants" :key="plant.guid">
        <v-text type="title">
          {{ plant.name }}
        </v-text>
      </div>
    </main>
    <app-menu />
  </main>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions, mapState } from 'vuex'
  import { Plant } from '@/shared/types/plant'
  import { RootState } from '@/store'

  interface HomeViewData {
    plants: Plant[]
  }

  export default Vue.extend({
    name: 'Home',

    data(): HomeViewData {
      return {
        plants: [],
      }
    },

    computed: mapState<RootState>({
      idToken: (state: RootState) => state.user.idToken,
    }),

    // methods: {
    //   ...mapActions({ loadPlants: 'home/loadPlants' }),
    // },

    async created() {
      if (this.plants.length === 0) {
        const response = await fetch('/api/plants', {
          headers: new Headers({ Authorization: this.idToken }),
        })
        this.plants = await response.json()
        // await this.loadPlants()
      }
    },
  })
</script>

<style lang="postcss" scoped>
  .screen-home {
    padding-top: var(--app-header-height);
    width: 100%;
    display: flex;
    flex-direction: column;

    & main {
      padding: 0 var(--base-gap);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
</style>
