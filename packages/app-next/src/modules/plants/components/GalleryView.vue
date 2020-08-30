<template>
  <v-layout>
    <app-header :return-to="`/plant/${$route.params.id}`">{{ !loading && plant.name }}</app-header>

    <main>gallery</main>
  </v-layout>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { Plant } from '@/types/plant'

  export default Vue.extend({
    name: 'Gallery',
    props: {
      plant: {
        type: Object as PropType<Plant>,
      },
      loading: {
        type: Boolean,
      },
    },
  })
</script>
