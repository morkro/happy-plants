<template>
  <v-layout>
    <app-header return-to="/home">{{ plant.name }}</app-header>

    <main>
      <div v-if="loading">
        <v-text>loading</v-text>
      </div>
      <v-text v-else>{{ plant.name }}</v-text>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { mapState } from 'vuex'
  import { RootState } from '@/store'
  import { Plant } from '@/types/plant'

  interface PlantMapState {
    plants: Plant[]
  }

  export default (Vue as VueConstructor<Vue & PlantMapState>).extend({
    data() {
      return {
        loading: true,
      }
    },
    computed: {
      ...mapState<RootState>({
        plants: (state: RootState) => state.home.plants,
      }),
      plant(): Plant {
        return this.plants.find((plant: Plant) => plant.guid === this.$route.params.id)
      },
    },
    created() {
      if (this.plants.length === 0) {
        console.log('load plant')
      }
    },
    mounted() {
      if (this.plants.length) {
        this.loading = false
      }
    },
  })
</script>
