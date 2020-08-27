<template>
  <div class="modules-container">
    <div class="modules-container-header">
      <v-text color="inactive">
        <strong>Modules</strong>
      </v-text>
      <v-button round small color="white" @click.native="$emit('open-dialog')">
        <feather-plus />
        <span class="visuallyhidden">Open dialog</span>
      </v-button>
    </div>

    <div class="modules-container-content">
      <v-text color="inactive">Add modules for interactive care taking</v-text>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'ModulesContainer',
    components: {
      'feather-plus': () =>
        import('vue-feather-icons/icons/PlusIcon' /* webpackChunkName: "icons" */),
    },
  })
</script>

<style lang="postcss" scoped>
  .modules-container {
    width: 100%;
    padding-top: calc(0.5 * var(--base-gap));
  }

  .modules-container-header {
    display: flex;
    justify-content: space-between;
    padding: 0 var(--base-gap);
  }

  .modules-container-content {
    padding: 0 var(--base-gap);
  }
</style>
