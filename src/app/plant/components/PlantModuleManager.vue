<template>
  <plant-dialog
    id="plant-module-manager-dialog"
    app-root=".main-wireframe"
    :show="show"
    @close-dialog="cancel">
    <span slot="headline">Manage modules</span>

    <ul class="module-list">
      <v-touch
        tag="li"
        v-for="(module, index) in updatedModules"
        :class="{ [`type-${module.type}`]: true, active: module.selected }"
        :key="`module-${index}`"
        @tap="onToggleModule(module)">
        <div class="module-icon">
          <input type="radio"
            :id="`module-${module.type}`"
            :name="`module-${module.type}`"
            :value="module.type"
            :checked="module.selected">
          <span aria-hidden="true">
            <feather-check />
          </span>
        </div>
        <label class="module-description" :for="`module-${module.type}`">
          <h2>
            <component :is="`feather-${module.meta.icon}`" />
            {{ module.meta.title }}
          </h2>
          <span>{{ module.meta.description }}</span>
        </label>
      </v-touch>
    </ul>

    <div class="dialog-actions">
      <button
        type="button"
        @click="confirmModuleUpdates">
        Update modules
      </button>
    </div>
  </plant-dialog>
</template>

<script>
  import HappyDialog from '@/components/HappyDialog'

  export default {
    name: 'PlantModuleManager',

    components: {
      'plant-dialog': HappyDialog,
      'feather-droplet': () =>
        import('vue-feather-icons/icons/DropletIcon' /* webpackChunkName: "icons" */),
      'feather-sun': () =>
        import('vue-feather-icons/icons/SunIcon' /* webpackChunkName: "icons" */),
      'feather-moon': () =>
        import('vue-feather-icons/icons/MoonIcon' /* webpackChunkName: "icons" */),
      'feather-book': () =>
        import('vue-feather-icons/icons/BookIcon' /* webpackChunkName: "icons" */),
      'feather-check': () =>
        import('vue-feather-icons/icons/CheckIcon' /* webpackChunkName: "icons" */)
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
      },
      confirmModuleUpdates () {
        this.$emit('updated-modules',
          this.updatedModules.map(({ type, selected }) => ({ type, selected })))
        this.cancel()
      }
    }
  }
</script>

<style lang="postcss">
  #plant-module-manager-dialog .happy-dialog-element {
    & .dialog-actions {
      background: var(--grey);
      margin:
        0
        calc(-1 * var(--base-gap))
        calc(-1 * var(--base-gap));
      padding: var(--base-gap);
    }

    & button {
      margin-top: 0;
    }
  }

  .module-list {
    list-style: none;
    max-height: 80vh;
    overflow: scroll;
    margin: 0 calc(-1 * var(--base-gap));
    border-top: 2px solid var(--grey);

    & li {
      display: flex;
      align-items: center;
      padding: var(--base-gap);
    }

    & .active {
      background: var(--light-grey);

      & .module-icon svg {
        stroke: var(--text-color-button);

        & rect,
        & path,
        & polygon {
          stroke: var(--text-color-button);
        }
      }

      & .module-icon span {
        display: block;
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
      position: relative;

      & input {
        opacity: 0;
      }

      & span {
        display: none;
        position: absolute;
        transform: translateY(2px) translateX(1px);
      }
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
