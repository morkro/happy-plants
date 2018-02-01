<template>
  <div
    @click="handleClick"
    :style="background"
    :class="wrapperClass"
    :aria-label="ariaLabel">
    <div v-show="deleteMode" :class="getLayerClass('delete')">
      <feather-trash
        v-if="isDeleteMode"
        class="reverse"
        key="icon-trash" />
      <feather-minus
        v-else
        class="reverse"
        key="icon-minus" />
    </div>

    <div v-show="categoriseMode" :class="getLayerClass('category')">
      <feather-check
        v-if="isCategoriseMode"
        class="reverse"
        key="icon-check" />
      <feather-plus
        v-else
        class="reverse"
        key="icon-plus" />
    </div>

    <div class="preview-content">
      <div class="preview-headline">
        <h1>{{ name }}</h1>
      </div>
      <svgicon
        v-if="!this.imageURL"
        icon="cactus"
        width="40"
        height="40"
        color="#000">
      </svgicon>
    </div>
  </div>
</template>

<script>
  import router from '@/router'
  import '@/assets/cactus'

  export default {
    name: 'PlantPreview',

    props: {
      deleteMode: { type: Boolean, default: false, required: true },
      categoriseMode: { type: Boolean, default: false, required: true },
      guid: { type: String, default: '', required: true },
      name: { type: String, default: '', required: true },
      imageURL: { type: String, default: '', required: true },
      defaultSelected: { type: Boolean, default: false, required: true }
    },

    components: {
      'feather-trash': () =>
          import('vue-feather-icon/components/trash-2' /* webpackChunkName: "overview" */),
      'feather-check': () =>
          import('vue-feather-icon/components/check' /* webpackChunkName: "overview" */),
      'feather-plus': () =>
          import('vue-feather-icon/components/plus-square' /* webpackChunkName: "overview" */),
      'feather-minus': () =>
          import('vue-feather-icon/components/minus-square' /* webpackChunkName: "overview" */)
    },

    data () {
      return {
        selected: this.defaultSelected || false
      }
    },

    computed: {
      frozen () {
        return this.deleteMode || this.categoriseMode
      },
      isDeleteMode () {
        return this.deleteMode && this.selected
      },
      isCategoriseMode () {
        return this.categoriseMode && this.selected
      },
      ariaLabel () {
        if (this.deleteMode) {
          return 'Delete'
        }
        if (this.categoriseMode) {
          return 'Add to category'
        }
        return ''
      },
      background () {
        return this.imageURL
          ? { backgroundImage: `url(${this.imageURL})` }
          : ''
      },
      wrapperClass () {
        return {
          'box': true,
          'plant-preview': true,
          'no-photo': !this.imageURL,
          'select-delete': this.deleteMode && this.selected,
          'select-category': this.categoriseMode && this.selected,
          'select': this.deleteMode || this.categoriseMode
        }
      }
    },

    updated () {
      if (this.frozen === false) {
        Object.assign(this.$data, this.$options.data())
      }
    },

    watch: {
      defaultSelected (value) {
        this.selected = value
      }
    },

    methods: {
      getLayerClass (type) {
        return {
          'select-layer': true,
          [type]: true,
          'selected': (
            (this.deleteMode && type === 'delete' && this.selected) ||
              (this.categoriseMode && type === 'category' && this.selected)
          )
        }
      },
      handleClick (event) {
        event.preventDefault()

        if (this.frozen) {
          this.selected = !this.selected
          this.emitSelection()
          return
        }

        router.push(`plant/${this.guid}`)
      },
      emitSelection () {
        let type = 'toggle-delete-selection'
        const data = {
          guid: this.guid,
          selected: this.selected
        }

        if (this.categoriseMode) {
          type = 'toggle-categorise-selection'
          data.type = this.selected ? 'add' : 'remove'
        }

        this.$emit(type, data)
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .plant-preview {
    width: 100%;
    height: 100%;
    position: relative;
    background-size: cover;
    background-position: center;
    transform-origin: center;
    transition: transform 50ms var(--ease-out-back);

    &.no-photo {
      /* TODO: Show default image instead */
      background: var(--grey);
    }
  }

  .select-layer {
    position: absolute;
    background: var(--transparency-black-medium);
    border-radius: var(--border-radius);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;

    &.selected::after {
      content: "";
      width: 50px;
      height: 50px;
      border-radius: 50%;
      position: absolute;
      z-index: 0;
      background: var(--transparency-black-medium);
    }

    &.category.selected {
      background: var(--brand-green-medium);

      &::after {
        background: var(--brand-green);
      }
    }

    &.delete.selected {
      background: var(--brand-red-medium);

      &::after {
        background: var(--brand-red);
      }
    }

    & svg {
      stroke: var(--text-color-button);
      position: relative;
      z-index: 1;

      & rect,
      & path,
      & polygon {
        stroke: var(--text-color-button);
      }
    }
  }

  .preview-content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius);
    overflow: hidden;
    z-index: 2;

    & svg {
      width: 65% !important;
      height: auto !important;
      opacity: 0.12;
    }
  }

  .preview-headline {
    position: absolute;
    color: var(--text-color-inverse);
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 10px;
    font-size: var(--text-size-small);
    background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.65));
    z-index: 1;

    @nest .select-delete & {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
    }

    @nest .no-photo & {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
    }

    &.inactive,
    &.inactive h1 {
      color: rgba(255, 255, 255, 0.75);
    }

    & h1 {
      color: var(--text-color-inverse);
      font-size: var(--text-size-base);
      font-weight: 600;
    }
  }
</style>
