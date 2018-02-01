<template>
  <plant-alert
    class="module-manager"
    :show="show"
    @close-alert="cancel">
    <h1 slot="headline">Manage modules</h1>

    <ul slot="content" class="module-list">
      <v-touch
        tag="li"
        v-for="(module, index) in updatedModules"
        :class="{ [`type-${module.type}`]: true, active: module.selected }"
        :key="`module-${index}`"
        @tap="onToggleModule(module)">
        <div class="module-icon">
          <feather-check v-if="module.selected" />
        </div>
        <div class="module-description">
          <h2>
            <component :is="`feather-${module.meta.icon}`" />
            {{ module.meta.title }}
          </h2>
          <span>{{ module.meta.description }}</span>
        </div>
      </v-touch>
    </ul>

    <button class="default" slot="cancel" @click="cancel">
      Cancel
    </button>
    <button slot="confirm" @click="confirmModuleUpdates">
      Update modules
    </button>
  </plant-alert>
</template>

<script>
  import AppAlert from '@/components/Alert'

  export default {
    name: 'PlantModuleManager',

    components: {
      'plant-alert': AppAlert,
      'feather-droplet': () =>
          import('vue-feather-icon/components/droplet' /* webpackChunkName: "plant" */),
      'feather-sun': () =>
          import('vue-feather-icon/components/sun' /* webpackChunkName: "plant" */),
      'feather-moon': () =>
          import('vue-feather-icon/components/moon' /* webpackChunkName: "plant" */),
      'feather-book': () =>
          import('vue-feather-icon/components/book' /* webpackChunkName: "plant" */),
      'feather-check': () =>
          import('vue-feather-icon/components/check' /* webpackChunkName: "plant" */)
    },

    props: {
      show: { type: Boolean, default: false },
      modules: { type: Array, default: () => [] }
    },

    data () {
      return {
        updatedModules: Array.from(this.modules)
      }
    },

    watch: {
      modules () {
        this.updatedModules = Array.from(this.modules)
      }
    },

    methods: {
      cancel () {
        this.updatedModules = Array.from(this.modules)
        this.$emit('close-module-manager')
      },
      onToggleModule ({ type, selected }) {
        const updatedIndex = this.updatedModules.findIndex(mod => mod.type === type)
        const module = this.updatedModules[updatedIndex]

        this.updatedModules.splice(updatedIndex, 1, { ...module, selected: !module.selected })
        // this.$emit('toggle-module', { type, selected: !selected })
      },
      confirmModuleUpdates () {
        this.$emit('updated-modules', this.updatedModules)
        this.cancel()
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .module-manager {
    & .box {
      padding: 0;
      width: 100%;
    }

    &.alert-header {
      justify-content: space-between;
      align-items: center !important;
      border-bottom: 2px solid var(--grey);
      margin-bottom: 0 !important;
      padding: var(--base-gap);
    }

    & .alert-actions {
      background: var(--grey);
      margin-top: 0 !important;
      padding: calc(var(--base-gap) / 2) var(--base-gap);
      justify-content: space-between;
    }
  }

  .module-list {
    list-style: none;
    max-height: 80vh;
    overflow: scroll;

    & li {
      display: flex;
      align-items: center;
      padding: var(--base-gap);
    }

    & .active {
      background: var(--light-grey);
      box-shadow: inset 0 0 7px 0 var(--grey);

      & .module-icon svg {
        stroke: var(--text-color-button);

        & rect,
        & path,
        & polygon {
          stroke: var(--text-color-button);
        }
      }
    }

    & li:not(:last-child) {
      border-bottom: 2px solid var(--grey);
    }

    & .module-icon {
      border-radius: 50%;
      background: var(--grey);
      margin-right: var(--base-gap);
      width: calc(var(--icon-size-base) * 2);
      height: calc(var(--icon-size-base) * 2);
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 auto;
    }

    & .active .module-icon {
      background: var(--brand-green);
    }
  }

  .module-description {
    & h2 {
      margin-bottom: calc(var(--base-gap) / 4);
      display: flex;
      align-items: center;
    }

    & svg {
      width: var(--icon-size-small);
      height: var(--icon-size-small);
      margin-right: calc(var(--base-gap) / 2);
    }
  }
</style>
