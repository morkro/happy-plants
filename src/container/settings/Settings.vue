<template>
  <main>
    <h1>Settings</h1>
    <router-link :to="{ path: '/' }">
      <button>Back to overview</button>
    </router-link>
    Customise your experience
  </main>
</template>

<script>
  export default {
    name: 'Settings'
  }
</script>
