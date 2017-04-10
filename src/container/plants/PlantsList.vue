<template>
  <main>
    <h1>Happy Plants 🌵</h1>
    <router-link :to="{ path: 'settings' }">
      <button>Settings</button>
    </router-link>
    <router-link :to="{ path: 'plant/add' }">
      <button>Add a plant</button>
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
