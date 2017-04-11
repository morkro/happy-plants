<template>
  <main>
    <header>
      <h1>Happy Plants 🌵</h1>
      <router-link :to="{ path: 'settings' }">
        Settings
      </router-link>
    </header>
    <router-link :to="{ path: 'plant/add' }" class="add-plant">
      + Add a plant
    </router-link>
    <div v-if="plants.length <= 0">
      <p>Looks like you haven't added any plants yet.</p>
    </div>
    <ul v-if="plants.length">
      <li v-for="plant in plants">
        <h1>Adenium Obesum</h1>
      </li>
      <li>
        <h1>Alocasia odora</h1>
      </li>
    </ul>
  </main>
</template>

<script>
  export default {
    name: 'PlantsList',
    data () {
      return {
        plants: []
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .add-plant {
    background: $light-grey;
    display: block;
    border-radius: $border-radius;
    color: $text-base-color;
    text-align: center;
    padding: 1.5vh;
    font-weight: 700;
  }
</style>
