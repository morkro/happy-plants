<template>
  <div>
    <router-link to="/home">
      Home
    </router-link>
    <router-link to="/settings">
      Settings
    </router-link>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'AppMenu',
  })
</script>
