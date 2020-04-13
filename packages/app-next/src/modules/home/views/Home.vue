<template>
  <div class="screen-home">
    <app-header />
    <main>
      <v-text type="title">
        Yasss home
      </v-text>
    </main>
    <app-menu />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  export default Vue.extend({
    name: 'Home',

    methods: {
      ...mapActions({ loadPlants: 'home/loadPlants' }),
    },

    async created() {
      await this.loadPlants()
    },
  })
</script>

<style lang="postcss" scoped>
  .screen-home {
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
