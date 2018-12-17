<template>
  <v-touch
    tag="a"
    @tap.prevent="handleInteraction"
    @press="handleInteraction"
    :class="wrapperClass"
    :aria-label="ariaLabel">
    <div v-show="pressedMode" :class="getLayerClass('pressed')">
      <feather-check v-if="isPressedMode" />
      <feather-circle v-else />
    </div>

    <div v-show="deleteMode" :class="getLayerClass('delete')">
      <feather-trash
        v-if="isDeleteMode"
        class="reverse"
        key="icon-trash" />
      <feather-circle
        v-else
        class="reverse"
        key="icon-minus" />
    </div>

    <div class="preview-content">
      <div :class="['preview-image', { 'box': isListView }]">
        <feather-loader v-if="contentLoading && !imageUrl" />
        <lazy-image
          v-if="imageUrl"
          :key="name"
          :alt="name"
          :title="name"
          :source="imageUrl" />
        <svgicon
          v-if="!contentLoading && !imageUrl"
          icon="cactus"
          width="40"
          height="40"
          color="#000" />
      </div>

      <div class="preview-content-inner">
        <div class="preview-headline">
          <h1 :class="{ 'ellipsis': name.length > oneLineHeadlineCount }">
            {{ name }}
          </h1>
        </div>

        <ul v-if="isListView && tags.length" class="preview-tags">
          <li v-for="tag of tags" :key="tag.label">
            <v-tag size="small">
              <feather-tag height="16" width="16" />
              {{ tag.label }}
            </v-tag>
          </li>
        </ul>
      </div>
    </div>
  </v-touch>
</template>

<script>
  import router from '@/router'
  import '@/assets/icons/cactus'

  export default {
    name: 'PlantPreview',

    props: {
      contentLoading: { type: Boolean, default: true },
      type: { type: String, default: 'grid' },
      tags: { type: Array, default: () => [] },
      deleteMode: { type: Boolean, default: false, required: true },
      pressedMode: { type: Boolean, default: false, required: true },
      guid: { type: String, default: '', required: true },
      name: { type: String, default: '', required: true },
      imageUrl: { type: [String, Boolean], default: '' }
    },

    components: {
      'feather-trash': () =>
        import('vue-feather-icons/icons/Trash2Icon' /* webpackChunkName: "icons" */),
      'feather-plus': () =>
        import('vue-feather-icons/icons/PlusSquareIcon' /* webpackChunkName: "icons" */),
      'feather-circle': () =>
        import('vue-feather-icons/icons/CircleIcon' /* webpackChunkName: "icons" */),
      'feather-check': () =>
        import('vue-feather-icons/icons/CheckCircleIcon' /* webpackChunkName: "icons" */),
      'feather-tag': () =>
        import('vue-feather-icons/icons/TagIcon' /* webpackChunkName: "icons" */),
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */)
    },

    data () {
      return {
        selected: this.defaultSelected || false,
        pressed: false,
        oneLineHeadlineCount: 22
      }
    },

    computed: {
      frozen () {
        return this.deleteMode || this.categoriseMode || this.pressedMode
      },
      isDeleteMode () {
        return this.deleteMode && this.selected
      },
      isPressedMode () {
        return this.pressedMode && (this.pressed || this.selected)
      },
      isListView () {
        return this.type === 'list'
      },
      ariaLabel () {
        if (this.deleteMode) {
          return 'Delete'
        }
        return ''
      },
      wrapperClass () {
        return [`type-${this.type}`, 'box', 'plant-preview', {
          'is-skeleton': this.contentLoading,
          'no-photo': !this.imageUrl,
          'select-delete': this.deleteMode && this.selected,
          'select-pressed': this.pressedMode && this.pressed && this.selected,
          'select': (this.pressedMode || this.deleteMode)
        }]
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
        return ['select-layer', type, {
          'selected': (
            (this.pressed && type === 'pressed') ||
            (this.deleteMode && type === 'delete' && this.selected) ||
            (this.categoriseMode && type === 'category' && this.selected)
          )
        }]
      },
      handleInteraction (event) {
        if (this.contentLoading) return
        event.preventDefault()

        if (event.type === 'press') {
          this.pressed = !this.pressed
          this.selected = !this.selected
          this.emitPressedSelection()
          return
        }

        if (this.frozen) {
          this.selected = !this.selected

          if (this.isPressedMode) {
            this.pressed = !this.pressed
            this.emitPressedSelection()
          } else {
            this.emitSelection()
          }

          return
        }

        router.push(`plant/${this.guid}`)
      },
      emitPressedSelection () {
        this.$emit('toggle-pressed-selection', {
          guid: this.guid,
          pressed: this.pressed
        })
      },
      emitSelection () {
        let type = 'toggle-delete-selection'
        const data = {
          guid: this.guid,
          selected: this.selected
        }

        this.$emit(type, data)
      }
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../../../styles/animations";

  .plant-preview {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    transform-origin: center;
    transition: transform 50ms var(--ease-out-back);
    --preview-background: var(--grey);
    --preview-color: var(--text-color-inverse);

    @nest html[data-theme="dark"] & {
      --preview-background: var(--dark-grey);
      --preview-color: var(--link-color);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--brand-green);
    }

    &.no-photo {
      /* TODO: Show default image instead */
      background: var(--preview-background);
    }

    &.type-list {
      background-color: transparent;
      display: flex;
      box-shadow: none;
      overflow: visible;
      --preview-color: var(--text-color-base);
    }

    &.is-skeleton {
      box-shadow: none;
    }
  }

  .preview-image {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @nest .type-list & {
      margin-right: var(--base-gap);
      width: var(--item-size-height);
      height: var(--item-size-height);
    }

    @nest .is-skeleton & {
      box-shadow: none;

      &::after {
        visibility: hidden;
      }
    }

    @nest .no-photo & {
      /* TODO: Show default image instead */
      background: var(--preview-background);
    }

    &::after {
      content: "";
      width: 100%;
      height: 50%;
      display: block;
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
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

    @nest .type-list & {
      width: var(--item-size-height);
    }

    &.selected::after {
      content: "";
      width: 50px;
      height: 50px;
      border-radius: 50%;
      position: absolute;
      z-index: 0;
      background: var(--transparency-black-medium);
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

    @nest .type-list & {
      overflow: visible;
      align-items: flex-start;
    }

    @nest .is-skeleton & svg {
      width: 30% !important;
      transform-origin: center center;
      animation: rotate360 4s linear infinite;
    }

    & svg {
      width: 65% !important;
      height: auto !important;
      opacity: 0.12;
    }
  }

  .preview-content-inner {
    position: absolute;
    color: var(--preview-color);
    width: 100%;
    bottom: 0;
    left: 0;
    padding: calc(var(--base-gap) / 1.5);
    font-size: var(--text-size-small);
    background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.65));
    z-index: 1;
    overflow: hidden;
    flex: 1;

    @nest .type-list & {
      position: static;
      background: var(--background-primary);
      border-radius: var(--border-radius);
      padding: calc(var(--base-gap) / 1.5);
      height: 100%;
      color: var(--text-color-base);
      overflow-y: hidden;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;

      & h1 {
        color: var(--preview-color);
        font-size: var(--text-size-medium);
        display: inline-block;
        position: relative;
        width: 100%;
        max-height: 2.28em;
        overflow: hidden;
        text-overflow: ellipsis;

        &.ellipsis::after {
          content: "";
          height: 1em;
          width: 20%;
          position: absolute;
          bottom: 0;
          right: 0;
          background:
            linear-gradient(
              to right,
              rgba(0, 0, 0, 0),
              var(--background-primary) 60%
            );
        }
      }
    }

    @nest .select-delete & {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
    }

    @nest .no-photo:not(.type-list) & {
      background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
    }

    @nest .is-skeleton:not(.type-list) & {
      background: none !important;

      & h1 {
        width: 75%;
        height: 18px;
        display: block;
        background: var(--background-primary);
        background-position: 0 50%;
        background-size: 200% 200%;
        border-radius: var(--border-radius);
      }
    }

    &.inactive,
    &.inactive h1 {
      color: rgba(255, 255, 255, 0.75);
    }

    & h1 {
      color: var(--preview-color);
      font-size: var(--text-size-base);
      font-weight: 500;
    }
  }

  .preview-tags {
    list-style: none;
    display: flex;
    width: 100%;

    & li {
      flex-shrink: 0;
      margin-bottom: calc(var(--base-gap) / 2);

      &:last-child {
        /* Workaround */
        padding-right: calc(var(--base-gap) / 2);
      }
    }

    & li:not(:last-child) {
      margin-right: calc(var(--base-gap) / 2);
    }

    & .tag {
      padding: calc(var(--base-gap) / 4) calc(var(--base-gap) / 2);
      display: flex;
      align-items: center;
      white-space: nowrap;
    }

    & .tag svg {
      margin-right: calc(var(--base-gap) / 4);
      opacity: 1;
    }
  }
</style>
