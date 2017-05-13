<template>
  <main class="main-wireframe">
    <app-header :back="true" :settings="true">
      <h1 slot="title">Hello, I am</h1>
    </app-header>

    <section class="view-content">
      <header>
        <div>
          <h2> {{ scientific }} </h2>
        </div>
        <img :src="imageURL" :alt="name" />
      </header>
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

  .view-content header {
    position: relative;
    color: white;
    height: 305px;

    h2 {
      font-size: $text-size-large;
      font-weight: 600;
    }

    > div {
      padding: $base-gap;
      position: absolute;
      z-index: 1;
      bottom: 0;
      width: 100%;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
</style>
