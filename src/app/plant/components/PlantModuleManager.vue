<template>
  <portal-dialog
    dialog-name="plant-module-manager-dialog"
    :show="show"
    @close-dialog="cancel">
    <template v-slot:headline>
      <span>Manage modules</span>
    </template>

    <div>
      <div class="module-content">
        <div v-if="warnGalleryRemoval" class="module-warning">
          <p>
            Disabling the gallery module will also <strong>delete all photos</strong> from it!
            Are you sure about this?
          </p>
        </div>

        <ul class="module-list">
          <v-touch
            tag="li"
            v-for="(module, index) in updatedModules"
            :class="getListClass(module)"
            :key="`module-${index}`"
            @tap="onToggleModule(module)">
            <div class="module-icon">
              <input type="radio"
                :id="`module-${module.type}`"
                :name="`module-${module.type}`"
                :value="module.type"
                :checked="!cloudOnlyFeature(module) && module.selected"
                :disabled="cloudOnlyFeature(module)">
              <span aria-hidden="true">
                <feather-check />
              </span>
            </div>
            <label class="module-description" :for="`module-${module.type}`">
              <h2>
                <component :is="`feather-${module.meta.icon}`" />
                {{ module.meta.title }}
              </h2>
              <span>{{ getModuleDescription(module) }}</span>
            </label>
          </v-touch>
        </ul>
      </div>

      <div class="dialog-actions">
        <v-button
          v-if="warnGalleryRemoval"
          @click.native="continueModuleEditing">
          Continue updating
        </v-button>
        <v-button v-else @click.native="confirmModuleUpdates">
          Update modules
        </v-button>
      </div>
    </div>
  </portal-dialog>
</template>

<script>
  export default {
    name: 'PlantModuleManager',

    components: {
      'feather-droplet': () =>
        import('vue-feather-icons/icons/DropletIcon' /* webpackChunkName: "icons" */),
      'feather-sun': () =>
        import('vue-feather-icons/icons/SunIcon' /* webpackChunkName: "icons" */),
      'feather-moon': () =>
        import('vue-feather-icons/icons/MoonIcon' /* webpackChunkName: "icons" */),
      'feather-book': () =>
        import('vue-feather-icons/icons/BookIcon' /* webpackChunkName: "icons" */),
      'feather-check': () =>
        import('vue-feather-icons/icons/CheckIcon' /* webpackChunkName: "icons" */),
      'feather-image': () =>
        import('vue-feather-icons/icons/ImageIcon' /* webpackChunkName: "icons" */)
    },

    props: {
      storageType: { type: String, required: true },
      show: { type: Boolean, default: false },
      modules: { type: Array, default: () => [] }
    },

    data () {
      return {
        updatedModules: Array.from(this.modules),
        warnGalleryRemoval: false,
        forceUpdates: false
      }
    },

    watch: {
      modules () {
        this.updatedModules = Array.from(this.modules)
      }
    },

    methods: {
      getListClass (module) {
        const disabled = this.cloudOnlyFeature(module)
        return {
          [`type-${module.type}`]: true,
          active: !disabled && module.selected,
          disabled
        }
      },
      cloudOnlyFeature (module) {
        return (
          module.meta.cloudOnly &&
          this.storageType === 'local'
        )
      },
      getModuleDescription (module) {
        return this.cloudOnlyFeature(module)
          ? 'This module requires the cloud storage option.'
          : module.meta.description
      },
      cancel () {
        this.updatedModules = Array.from(this.modules)
        this.warnGalleryRemoval = false
        this.$emit('close-module-manager')
      },
      onToggleModule (module) {
        if (this.cloudOnlyFeature(module)) {
          return
        }

        const { type, selected } = module
        const updatedIndex = this.updatedModules.findIndex(mod => mod.type === type)
        const selectedModule = this.updatedModules[updatedIndex]

        const moduleContent = selected && selected.value && selected.value.list
        if (!this.forceUpdates && type === 'gallery' && moduleContent && moduleContent.length) {
          this.warnGalleryRemoval = true
          return
        }

        this.updatedModules.splice(updatedIndex, 1, {
          ...selectedModule,
          selected: !selectedModule.selected
        })
      },
      continueModuleEditing () {
        this.warnGalleryRemoval = false
        this.forceUpdates = true
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
      background: var(--border-color);
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

  .module-content {
    max-height: 80vh;
    overflow: scroll;
    margin: 0 calc(-1 * var(--base-gap));
    border-top: 2px solid var(--border-color);
    position: relative;
  }

  .module-warning {
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 100%;
    padding: var(--base-gap);
    background: var(--transparency-black-medium);
    display: flex;
    align-items: center;

    & p {
      color: var(--text-color-inverse);
      display: block;
      background: var(--transparency-black-medium);
      padding: var(--base-gap);
      border-radius: var(--border-radius);
    }
  }

  .module-list {
    list-style: none;
    height: 100%;

    @nest html[data-theme="dark"] & {
      border-top: 2px solid var(--background-secondary);
      border-bottom: 2px solid var(--background-secondary);
    }

    & li {
      display: flex;
      align-items: center;
      padding: var(--base-gap);

      @nest html[data-theme="dark"] & {
        background: var(--background-secondary);
      }
    }

    & .active {
      background: var(--background-secondary);

      @nest html[data-theme="dark"] & {
        background: var(--background-main);

        &:not(:last-child) {
          border-bottom: 2px solid var(--background-secondary);
        }
      }

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

    & .disabled {
      color: var(--text-color-secondary);

      & span {
        font-style: italic;
      }

      & .module-icon {
        background: transparent;
        border: 4px solid var(--border-color);
      }
    }

    & li:not(:last-child) {
      border-bottom: 2px solid var(--border-color);
    }

    & .module-icon {
      border-radius: 50%;
      background: var(--border-color);
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
