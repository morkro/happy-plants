<template>
  <main>
    <header class="page-header">
      <back-button />
      <h1>{{ name }}</h1>
    </header>

    <section class="view-content">
      <img :src="imageURL" :alt="name" />
    </section>
  </main>
</template>

<script>
  import localforage from 'localforage'
  import blobUtil from 'blob-util'
  import BackButton from '@/components/BackButton'

  export default {
    name: 'PlantView',
    components: {
      'back-button': BackButton
    },
    beforeRouteEnter (to, from, next) {
      localforage.getItem(`plant-${to.params.id}`)
        .then(plant => next(vm => {
          vm.guid = plant.guid
          vm.name = plant.name
          vm.blob = plant.blob
          vm.imageURL = blobUtil.createObjectURL(plant.blob)
        }))
        .catch(() => next('/'))
    },
    data () {
      return {
        guid: '',
        name: '',
        blob: {},
        imageURL: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .view-content img {
    width: 100%;
    height: auto;
  }
</style>
