<template>
  <div class="screen-new">
    <app-header color="white">Add a new friend</app-header>

    <main>
      <v-text type="title">Newwwwwwww</v-text>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'New',
  })
</script>

<style lang="postcss" scoped>
  .screen-new {
    width: 100%;
    display: flex;
    flex-direction: column;

    & #app-header {
      background: var(--brand-green);
    }

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
