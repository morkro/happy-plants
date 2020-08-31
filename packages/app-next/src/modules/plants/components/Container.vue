<template>
  <router-view :plant="plant" :loading="loading" />
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { mapState } from 'vuex'
  import { RootState } from '@/store'
  import { Plant } from '@/types/plant'
  import { getCollection, FirestoreCollections, downloadFile } from '@/services/firebase'
  import logger from '@/utils/vueLogger'

  interface PlantMapState {
    userID: string
    plants: {
      data: Plant[]
      loaded: boolean
    }
  }

  export default (Vue as VueConstructor<Vue & PlantMapState>).extend({
    data() {
      return {
        loading: true,
        individualPlant: null,
      }
    },
    computed: {
      ...mapState<RootState>({
        userID: (state: RootState) => state.account.uid,
        plants: (state: RootState) => state.plants,
      }),
      plant(): Plant {
        if (this.plants.loaded) {
          return this.plants.data.find((plant) => plant?.guid === this.$route.params.id)
        }
        return this.individualPlant
      },
    },
    async created() {
      if (!this.plants.loaded && this.individualPlant === null) {
        const snapshot = await getCollection(this.userID, FirestoreCollections.Plants)
          .doc(this.$route.params.id)
          .get()
        const plantData = snapshot.data()

        if (plantData.imageURL) {
          try {
            plantData.imageURL = await downloadFile(plantData.imageURL)
          } catch (error) {
            logger(error.message, true)
          }
        }

        this.individualPlant = plantData
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
