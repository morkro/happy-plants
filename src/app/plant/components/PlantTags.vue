<template>
  <section :class="{ 'plant-tags': true, 'edit-mode': showInput }">
    <div class="plant-tags-module">
      <button class="tags-add icon inverse" @click="toggleNewTagInput">
        <div v-if="!showInput">
          <span hidden>Add tag</span>
          <feather-plus />
        </div>
        <div v-else>
          <span hidden>Close input</span>
          <feather-x />
        </div>
      </button>

      <div :class="{ 'tags-list-wrapper': true, 'show-input': showInput }">
        <form v-if="showInput"
          class="tags-new"
          @submit.prevent="addNewTag">
          <input
            type="text"
            id="tag-new-name"
            ref="tagInput"
            @change="getTagName">
          <button>
            <feather-check />
          </button>
        </form>

        <div class="tags-list-inner" v-else>
          <ul class="tags-list" v-if="hasTags">
            <li v-for="tag in tags" :key="tag.label">
              <v-touch tag="span"
                class="tag"
                @tap="toggleRemovable(tag)"
                :tap-options="{ taps: 2 }">
                {{ tag.label }}
              </v-touch>
            </li>
          </ul>

          <div v-else class="tags-empty">
            <span @click="toggleNewTagInput">
              Add a tag to your plant!
            </span>

            <button class="plain small hide-module" @click.prevent="hideTagModule">
              Hide
            </button>
          </div>
        </div>
      </div>
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
        import('vue-feather-icon/components/plus' /* webpackChunkName: "plant" */),
      'feather-x': () =>
        import('vue-feather-icon/components/x' /* webpackChunkName: "plant" */),
      'feather-check': () =>
        import('vue-feather-icon/components/check' /* webpackChunkName: "plant" */)
    },

    props: {
      tags: { type: Array, default: () => [] }
    },

    data: () => ({
      newTagName: '',
      showInput: false
    }),

    computed: {
      hasTags () {
        return this.tags.length
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

      addNewTag () {
        this.$emit('new-tag', { label: this.newTagName.trim() })
        Object.assign(this.$data, this.$options.data()) // Reset state
      },

      toggleRemovable (tag) {
        this.$emit('remove-tag', tag)
      },

      hideTagModule () {
        this.$emit('hide-module')
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
    }

    & button:not(.hide-module) {
      height: 100%;
      width: var(--tag-module-height);
      display: flex;
      justify-content: center;
    }
  }

  .tag {
    --label-background: var(--grey);
    font-weight: 600;
    background: var(--label-background);
    padding: calc(var(--base-gap) / 2) var(--base-gap);
    display: block;
    border-radius: var(--border-radius);
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
      background: linear-gradient(var(--gradient-direction), transparent, var(--background-secondary));
      z-index: 1;
    }

    &:not(.show-input)::before {
      --gradient-direction: 270deg;
      left: 0;
    }

    &:not(.show-input)::after {
      right: 0;
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
    }

    & span {
      background: var(--label-background);
      padding: calc(var(--base-gap) / 2) var(--base-gap);
      display: block;
      border-radius: var(--border-radius);
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

  .tags-backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
</style>
