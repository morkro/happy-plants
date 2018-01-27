<template>
  <plant-alert
    class="module-manager"
    :show="show"
    :close="true"
    :actions="false"
    @close-alert="cancel">
    <h1 slot="headline">Manage modules</h1>

    <ul slot="content" class="module-list">
      <v-touch
        tag="li"
        v-for="(module, index) in modules"
        :class="{ [`type-${module.type}`]: true, active: module.selected }"
        :key="`module-${index}`"
        @tap="onToggleModule(module)">
        <div class="module-icon">
          <feather-check v-if="module.selected" />
          <component v-else :is="`feather-${module.meta.icon}`" />
        </div>
        <div class="module-description">
          <h2>{{ module.meta.title }}</h2>
          <span>{{ module.meta.description }}</span>
        </div>
      </v-touch>
    </ul>
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

    methods: {
      cancel () {
        this.$emit('close-module-manager')
      },
      onToggleModule ({ type, selected }) {
        this.$emit('toggle-module', { type, selected: !selected })
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
      border-bottom: 2px solid var(--grey);
      margin-bottom: 0 !important;
      padding: calc(var(--base-gap) / 2) var(--base-gap);
    }
  }

  .module-list {
    list-style: none;

    li {
      display: flex;
      align-items: center;
      padding: var(--base-gap);
    }

    .active {
      background: var(--light-grey);
      box-shadow: inset 0 0 7px 0 var(--grey);

      svg {
        stroke: var(--text-color-button);

        rect,
        path,
        polygon {
          stroke: var(--text-color-button);
        }
      }
    }

    li:not(:last-child) {
      border-bottom: 2px solid var(--grey);
    }

    h2 {
      margin-bottom: calc(var(--base-gap) / 4);
    }

    .module-icon {
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
  }

  .type-watering.active .module-icon {
    background: var(--brand-blue);
  }

  .type-sunshine.active .module-icon {
    background: var(--brand-yellow);
  }

  .type-seasons.active .module-icon {
    background: var(--brand-green);
  }

  .type-notes.active .module-icon {
    background: var(--custom-black);
  }
</style>
