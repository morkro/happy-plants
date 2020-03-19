<template>
  <header id="app-header">
    <div class="app-header-icon">
      <router-link v-if="returnTo" :to="returnTo">
        <feather-left />
      </router-link>
      <div v-else>icon</div>
    </div>

    <v-text type="subtitle" class="app-header-title">
      <slot>
        HappyPlants
      </slot>
    </v-text>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'AppHeader',

    components: {
      'feather-left': () =>
        import('vue-feather-icons/icons/ArrowLeftIcon' /* webpackChunkName: "icons" */),
    },

    props: {
      returnTo: {
        type: [String, Boolean],
        default: false,
      },
    },
  })
</script>

<style lang="postcss" scoped>
  #app-header {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
  }

  .app-header-icon {
    height: 100%;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .app-header-title {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
</style>
