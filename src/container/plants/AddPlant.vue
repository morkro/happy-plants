<template>
  <main>
    <h1>+🌵 Add a new plant</h1>
    <router-link :to="{ path: '/' }">
      <button>Back to overview</button>
    </router-link>
    <form>
      <label>
        <span>What's your plants name?</span>
        <input type="text"/>
      </label>
      <label>
        <span>Do you also know its scientific name?</span>
        <input type="text"/>
      </label>
      <label>
        <span>Upload photo</span>
        <input type="file"/>
      </label>
      <label>
        <span>Where is it located?</span>
        <input type="text"/>
      </label>
    </form>
  </main>
</template>

<script>
  export default {
    name: 'AddPlant'
  }
</script>
