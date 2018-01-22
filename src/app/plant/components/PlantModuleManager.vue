<template>
  <plant-alert
    class="module-manager"
    :show="show"
    :close="true"
    @close-alert="cancel">
    <h1 slot="headline">Manage modules</h1>
    <ul slot="content" class="module-list">
      <v-touch
        tag="li"
        v-for="(module, index) in modules"
        :key="`module-${index}`"
        @tap="onToggleModule($event, module)">
        {{ module.type }}
      </v-touch>
    </ul>
  </plant-alert>
</template>

<script>
  import AppAlert from '@/components/Alert'

  export default {
    name: 'PlantModuleManager',

    components: {
      'plant-alert': AppAlert
    },

    props: {
      show: { type: Boolean, default: false },
      modules: { type: Array, default: () => [] }
    },

    methods: {
      cancel () {
        this.$emit('close-module-manager')
      },
      onToggleModule (event, module) {
        this.$emit('toggle-module', module)
      }
    }
  }
</script>

<style lang="scss">
  .module-manager {
    .box {
      padding: 0;
      width: 100%;
    }

    header {
      justify-content: space-between;
      align-items: center !important;
      border-bottom: 4px solid var(--grey);
      margin-bottom: 0 !important;
      padding: calc(var(--base-gap) / 2) var(--base-gap);
    }
  }

  .module-list {
    li:not(:last-child) {
      border-bottom: 2px solid var(--grey);
    }
  }
</style>
