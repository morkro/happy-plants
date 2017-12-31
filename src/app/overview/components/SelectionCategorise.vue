<template>
  <div :class="{ 'categorise-container': true, 'active': activeSelection }">
    <button
      aria-label="Categorise"
      :class="buttonCategoriseClass"
      @click="activate($event)">
      <feather-layers width="18" height="18" />
    </button>

    <div class="categories-active">
      <label for="categorise-select">
        <button
          aria-label="Select category"
          class="select icon"
          @click="addToCategory">
          <feather-menu v-if="isCategorySelection" width="18" height="18" />
          <feather-check v-else width="18" height="18" />
        </button>

        <div class="categorise-content">
          <select
            @change="updateCategorySelection"
            ref="select"
            name="categorise-select"
            id="categorise-select">
            <option selected disabled hidden>
              Select category
            </option>
            <option
              v-for="category in categories"
              :selected="category.guid === selectedCategory.guid"
              :value="category.guid">
              {{ category.label }}
            </option>
          </select>
        </div>
      </label>

      <button
        aria-label="Cancel categorisation"
        class="cancel icon"
        @click="cancel($event)">
        <feather-x width="24" height="24" />
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SelectionCategorise',

    props: {
      activeSelection: { type: Boolean, default: false },
      categories: { type: Array, default: () => [] }
    },

    components: {
      'feather-layers': () =>
        import('vue-feather-icon/components/layers' /* webpackChunkName: "overview" */),
      'feather-menu': () =>
        import('vue-feather-icon/components/menu' /* webpackChunkName: "overview" */),
      'feather-check': () =>
        import('vue-feather-icon/components/check' /* webpackChunkName: "overview" */),
      'feather-x': () =>
        import('vue-feather-icon/components/x' /* webpackChunkName: "overview" */)
    },

    computed: {
      buttonCategoriseClass () {
        if (this.activeSelection) {
          return 'categorise icon'
        }
        return 'categorise circle icon inverse'
      },
      categoryName () {
        return this.selectedCategory && this.selectedCategory.label
      }
    },

    data () {
      return {
        isCategorySelection: true,
        selectedCategory: false
      }
    },

    methods: {
      reset () {
        Object.assign(this.$data, this.$options.data()) // Reset state
        this.$refs.select.selectedIndex = 0
      },
      activate (event) {
        if (event.currentTarget) event.currentTarget.blur()
        this.$emit('categorise-selection')
      },
      cancel (event) {
        if (event.currentTarget) event.currentTarget.blur()

        this.reset()
        this.$emit('cancel-selection')
      },
      addToCategory () {
        if (this.isCategorySelection) return
        this.$emit('save-selection')
        this.reset()
      },
      updateCategorySelection (event) {
        const $option = event.target.options[event.target.options.selectedIndex]

        this.selectedCategory = this.categories.find(cat => cat.guid === $option.value)
        this.isCategorySelection = false

        this.$emit('category-selected', this.selectedCategory)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $btn-size: 50px;

  button.categorise {
    padding: 0;
    background: var(--background-primary);
    box-shadow: var(--plain-shadow);
  }

  .categorise-container {
    &.active {
      width: 100%;
    }

    button {
      width: $btn-size;
      height: $btn-size;
      flex: 1 0 auto;
    }

    .categories-active,
    &.active button.categorise {
      display: none;
    }

    &.active .categories-active {
      display: flex;
    }
  }

  .categories-active {
    background: var(--brand-green);
    border-radius: var(--border-radius);
    box-shadow: var(--plain-shadow);
    width: 100%;

    label {
      width: 100%;
      display: flex;
    }

    button {
      display: flex;
      justify-content: center;

      svg {
        margin-right: 0;
      }
    }

    button.select {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .categorise-content {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    color: var(--text-color-inverse);
    padding: 0 var(--base-gap);

    p {
      font-weight: 600;
    }

    select {
      color: var(--text-color-inverse);
      background: transparent;

      &:active,
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
  }
</style>
