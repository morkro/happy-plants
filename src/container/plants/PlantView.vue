<template>
  <main>
    <header>
      <h1>{{ name }}</h1>
    </header>

    <section>
      <router-link :to="{ path: '/' }">
        Back to overview
      </router-link>
    </section>
  </main>
</template>

<script>
  import localforage from 'localforage'
  export default {
    name: 'PlantView',
    beforeRouteEnter (to, from, next) {
      localforage.getItem(`plant-${to.params.id}`)
        .then(plant => next(vm => {
          vm.guid = plant.guid
          vm.name = plant.name
          vm.blob = plant.blob
        }))
        .catch(() => next('/'))
    },
    data () {
      return {
        guid: '',
        name: '',
        blob: {}
      }
    }
  }
</script>

<style lang="scss" scoped></style>
