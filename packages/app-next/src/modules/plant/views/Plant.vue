<template>
  <v-layout class="screen-plant">
    <app-header return-to="/home">
      {{ ' ' }}
      <template #actions>
        <div class="plant-header-actions">
          <v-button round small @click.native="openSettings">
            <span class="visuallyhidden">Open settings</span>
            <feather-more />
          </v-button>
        </div>
      </template>
    </app-header>

    <main>
      <div v-if="loading">
        <v-text>loading</v-text>
      </div>
      <v-text v-else>{{ plant.name }}</v-text>
      <div style="height: 110vh;background:var(--brand-white);">really long content</div>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { mapState } from 'vuex'
  import { RootState } from '@/store'
  import { Plant } from '@/types/plant'
  import { getCollection, FirestoreCollections } from '../../../services/firebase'

  interface PlantMapState {
    userID: string
    plants: {
      data: Plant[]
      loaded: boolean
    }
  }

  export default (Vue as VueConstructor<Vue & PlantMapState>).extend({
    name: 'Plant',
    components: {
      'feather-more': () =>
        import('vue-feather-icons/icons/MoreVerticalIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        loading: true,
        individualPlant: null,
      }
    },
    computed: {
      ...mapState<RootState>({
        userID: (state: RootState) => state.user.uid,
        plants: (state: RootState) => state.home.plants,
      }),
      plant(): Plant {
        if (this.plants.loaded) {
          return this.plants.data.find((plant: Plant) => plant.guid === this.$route.params.id)
        }
        return this.individualPlant
      },
    },
    methods: {
      openSettings() {
        console.log('open settings')
      },
    },
    async created() {
      if (!this.plants.loaded && this.individualPlant === null) {
        const snapshot = await getCollection(this.userID, FirestoreCollections.Plants)
          .doc(this.$route.params.id)
          .get()
        this.individualPlant = snapshot.data()
        this.loading = false
      }
    },
    mounted() {
      if (this.plants.data.length) {
        this.loading = false
      }
    },
  })
</script>

<style lang="postcss">
  .screen-plant #app-header {
    & .plant-header-actions {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 var(--base-gap);
    }
  }
</style>
