<template>
  <div class="screen-settings">
    <app-header />

    <main>
      <v-text type="title">
        Settings boi
      </v-text>
    </main>

    <app-menu />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Settings',
  })
</script>

<style lang="postcss" scoped>
  .screen-settings {
    padding-top: var(--app-header-height);
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
