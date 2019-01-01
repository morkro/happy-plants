<template>
  <section :class="['plant-tags', { 'edit-mode': showInput }]">
    <div
      :class="['plant-tags-module', { 'show-tooltip': showTooltip }]"
      data-tooltip="Double tap to remove">
      <v-button
        color="plain"
        class="tags-add"
        @click.native="toggleNewTagInput"
        :aria-label="ariaLabelToggle">
        <feather-plus v-if="!showInput" slot="icon" />
        <feather-x v-else slot="icon" />
      </v-button>

      <div :class="['tags-list-wrapper', { 'show-input': showInput }]">
        <form
          v-if="showInput"
          class="tags-new"
          @submit.prevent="addNewTag">
          <input
            type="text"
            autocomplete="off"
            id="tag-new-name"
            ref="tagInput"
            @change="getTagName">
          <v-button class="tags-new-button" @click.native="addNewTag">
            <feather-check slot="icon" />
          </v-button>
        </form>

        <div class="tags-list-inner" v-else>
          <ul class="tags-list" v-if="hasTags">
            <li v-for="tag in tags" :key="tag.label">
              <v-touch tag="div"
                @doubletap="toggleRemovable(tag)"
                @tap="showRemovalNote">
                <v-tag>
                  {{ tag.label }}
                </v-tag>
              </v-touch>
            </li>
          </ul>

          <div v-else class="tags-empty">
            <span @click="toggleNewTagInput">
              Add a tag to your plant!
            </span>

            <v-button
              type="small"
              color="plain"
              class="hide-module"
              @click.native.prevent="hideTagModule">
              Hide
            </v-button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showInput && allTags.length" class="tags-suggestions">
      <ul>
        <li v-for="(tag, index) in allTags" :key="index">
          <v-touch @tap="selectTag(tag)">
            <v-tag >
              <feather-plus slot="icon" />
              {{ tag.label }}
            </v-tag>
          </v-touch>
        </li>
      </ul>
    </div>

    <div v-if="showInput"
      class="tags-backdrop"
      @click.self="closeInputOutside"/>
  </section>
</template>

<script>
  export default {
    name: 'PlantTag',

    components: {
      'feather-plus': () =>
        import('vue-feather-icons/icons/PlusIcon' /* webpackChunkName: "icons" */),
      'feather-x': () =>
        import('vue-feather-icons/icons/XIcon' /* webpackChunkName: "icons" */),
      'feather-check': () =>
        import('vue-feather-icons/icons/CheckIcon' /* webpackChunkName: "icons" */)
    },

    props: {
      tags: { type: Array, default: () => [] },
      allTags: { type: Array, default: () => [] }
    },

    data: () => ({
      newTagName: '',
      showInput: false,
      showTooltip: false
    }),

    computed: {
      hasTags () {
        return this.tags.length
      },
      ariaLabelToggle () {
        return !this.showInput
          ? 'Add tag'
          : 'Close input'
      }
    },

    methods: {
      toggleNewTagInput (event) {
        if (this.showInput === false) {
          setTimeout(() => this.$refs.tagInput.focus(), 1)
        }
        this.showInput = !this.showInput
      },

      closeInputOutside () {
        if (this.showInput) {
          this.showInput = false
        }
      },

      getTagName (event) {
        if (!event.target.value) return
        this.newTagName = event.target.value
      },

      addNewTag (event, tagName) {
        const tagLabel = tagName || this.newTagName
        if (tagLabel !== '') {
          this.$emit('new-tag', { label: tagLabel.trim() })
        }
        Object.assign(this.$data, this.$options.data()) // Reset state
      },

      toggleRemovable (tag) {
        this.$emit('remove-tag', tag)
      },

      hideTagModule () {
        this.$emit('hide-module')
      },

      showRemovalNote () {
        this.showTooltip = true
        setTimeout(() => {
          this.showTooltip = false
        }, 2000)
      },

      selectTag (tag) {
        this.addNewTag(undefined, tag.label)
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .plant-tags {
    --tag-module-gap: 4px;
    --tag-module-height: 64px;
    background: transparent;
    margin-bottom: var(--tag-module-gap);

    @media screen and (min-width: 768px) {
      --tag-module-height: auto;
    }

    &.edit-mode {
      position: relative;
      z-index: 1;
    }

    & .plant-tags-module {
      display: flex;
      min-height: 58px;
      height: var(--tag-module-height);
      position: relative;
      z-index: 2;

      &.show-tooltip::after {
        display: block;
      }

      &::after {
        display: none;
        content: attr(data-tooltip) " ";
        position: absolute;
        top: 0;
        background: var(--transparency-black-medium);
        border-radius: var(--border-radius);
        transform: translateY(calc(-100% - var(--base-gap) / 2)) translateX(-50%);
        font-size: var(--text-size-xsmall);
        color: var(--text-color-button);
        padding: calc(var(--base-gap) / 2) var(--base-gap);
        left: 50%;
      }

      @media screen and (min-width: 768px) {
        margin-top: 16px;
      }
    }

    & button:not(.hide-module) {
      height: 100%;
      width: var(--tag-module-height);
      display: flex;
      justify-content: center;
      box-shadow: none;

      @media screen and (min-width: 768px) {
        height: 58px;
      }
    }
  }

  .tags-add {
    --button-background: var(--background-secondary);
    padding: calc(var(--base-gap) / 2) var(--base-gap);
    border-radius: 0;

    &:active,
    &:focus {
      --button-focus: transparent;
      --button-background: var(--grey);
    }
  }

  .tags-list-wrapper {
    width: 100%;
    position: relative;
    overflow-y: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;

    &:not(.show-input)::before,
    &:not(.show-input)::after {
      --gradient-direction: 90deg;
      content: "";
      position: absolute;
      width: calc(var(--base-gap) / 2);
      height: 100%;
      top: 0;
      background:
        linear-gradient(
          var(--gradient-direction),
          rgba(245, 245, 245, 0), /* Safari needs the same color with alpha 0% */
          var(--background-secondary)
        );
      z-index: 1;
    }

    &:not(.show-input)::before {
      --gradient-direction: 270deg;
      left: 0;
    }

    &:not(.show-input)::after {
      right: 0;
    }

    @media screen and (min-width: 768px) {
      overflow-x: hidden;
      margin-bottom: 16px;
    }
  }

  .tags-new {
    display: flex;
    width: 100%;
    height: 100%;

    & input {
      width: 100%;
      border-radius: 0;
    }

    & button {
      border-radius: 0;
    }
  }

  .tags-list-inner {
    align-items: center;
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    padding:
      var(--base-gap)
      var(--base-gap)
      var(--base-gap)
      calc(var(--base-gap) / 2);

    @media screen and (min-width: 768px) {
      overflow-x: hidden;
      padding:
        0
        var(--base-gap)
        0
        calc(var(--base-gap) / 2);
    }
  }

  .tags-list {
    list-style: none;
    display: flex;

    &::after {
      content: "";
      width: var(--base-gap);
      height: 100%;
      display: block;
      flex-shrink: 1;
    }

    & li {
      flex-shrink: 0;
      margin-right: calc(var(--base-gap) / 2);

      @media screen and (min-width: 768px) {
        margin-bottom: calc(var(--base-gap) / 2);
      }

      &:last-child {
        /* Workaround */
        padding-right: calc(var(--base-gap) / 2);
      }
    }

    @media screen and (min-width: 768px) {
      flex-wrap: wrap;
    }
  }

  .tags-empty {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & span {
      font-size: var(--text-size-small);
      color: var(--text-color-secondary);
    }
  }

  .tags-suggestions {
    position: absolute;
    z-index: 2;
    padding: var(--base-gap) var(--tag-module-height);

    & ul {
      display: flex;
      list-style: none;
      flex-wrap: wrap;
    }

    & li:not(:last-child) {
      margin-right: calc(var(--base-gap) / 2);
      margin-bottom: calc(var(--base-gap) / 2);
    }
  }

  .tags-backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background: var(--transparency-black-medium);
  }
</style>
