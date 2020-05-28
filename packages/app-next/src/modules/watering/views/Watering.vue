<template>
  <div class="screen-watering">
    <app-header />

    <main>
      <v-text type="title">Waterrrrrr</v-text>
    </main>

    <app-menu />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Watering',
  })
</script>

<style lang="postcss" scoped>
  .screen-watering {
    width: 100%;
    display: flex;
    flex-direction: column;

    & main {
      padding: 0 var(--base-gap);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
</style>
