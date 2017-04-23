<template>
  <main>
    <app-header :back="true">
      <h1 slot="title">Hello, I am</h1>
    </app-header>

    <section class="view-content">
      <img :src="imageURL" :alt="name" />
      <div>
        <h2>{{ name }}</h2>
        <h3>{{ scientific }}</h3>
        <span v-if="!!location">Location: {{ location }}</span>
      </div>
    </section>
  </main>
</template>

<script>
  import localforage from 'localforage'
  import blobUtil from 'blob-util'
  import AppHeader from '@/components/AppHeader'

  export default {
    name: 'PlantView',
    components: {
      'app-header': AppHeader
    },
    beforeRouteEnter (to, from, next) {
      localforage.getItem(`plant-${to.params.id}`)
        .then(plant => next(vm => {
          vm.guid = plant.guid
          vm.name = plant.name
          vm.scientific = plant.scientific
          vm.location = plant.location
          vm.blob = plant.blob
          vm.imageURL = blobUtil.createObjectURL(plant.blob)
        }))
        .catch(() => next('/'))
    },
    data () {
      return {
        guid: '',
        name: '',
        scientific: '',
        location: '',
        blob: {},
        imageURL: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

  .view-content {
    img {
      width: 100%;
      height: auto;
    }

    > div {
      padding: $base-gap;
    }
  }
</style>
