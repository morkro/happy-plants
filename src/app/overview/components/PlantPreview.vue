<template>
  <div
    @click="handleClick"
    :style="background"
    :class="wrapperClass"
    :aria-label="ariaLabel">
    <div v-show="deleteMode" :class="getLayerClass('delete')">
      <feather-trash class="reverse" v-if="deleteMode && selected" key="icon-trash" />
      <feather-minus class="reverse" v-else key="icon-minus"/>
    </div>

    <div v-show="categoriseMode" :class="getLayerClass('category')">
      <feather-check class="reverse" v-if="categoriseMode && selected" key="icon-check" />
      <feather-plus class="reverse" v-else key="icon-plus" />
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
      deleteMode: { type: Boolean, default: false },
      categoriseMode: { type: Boolean, default: false },
      guid: { type: String, default: '' },
      name: { type: String, default: '' },
      imageURL: { type: String, default: '' }
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

    computed: {
      frozen () {
        return this.deleteMode || this.categoriseMode
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
          'plant-preview': true,
          'no-photo': !this.imageURL,
          'select-delete': this.deleteMode && this.selected,
          'select-category': this.categoriseMode && this.selected,
          'select': this.deleteMode || this.categoriseMode
        }
      }
    },

    data () {
      return {
        selected: false
      }
    },

    updated () {
      if (!this.frozen) {
        this.selected = false
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
          this.toggleSelection()
          this.deleteElement()
          return
        }

        router.push(`plant/${this.guid}`)
      },
      deleteElement () {
        this.$emit('delete-plant', {
          guid: this.guid,
          selected: this.selected
        })
      },
      toggleSelection () {
        this.selected = !this.selected
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/animations";

  .plant-preview {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: var(--border-radius);
    background-size: cover;
    background-position: center;
    box-shadow: var(--plain-shadow);
    transform-origin: center;
    transition: transform 50ms $ease-out-back;

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

    svg {
      stroke: var(--text-color-button);
      position: relative;
      z-index: 1;

      rect,
      path,
      polygon {
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

    svg {
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

    .select-delete & {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
    }

    .no-photo & {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
    }

    &.inactive,
    &.inactive h1 {
      color: rgba(255, 255, 255, 0.75);
    }

    h1 {
      color: var(--text-color-inverse);
      font-size: var(--text-size-base);
      font-weight: 600;
    }
  }
</style>
