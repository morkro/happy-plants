<template>
  <div class="main-wireframe">
    <!-- Modal for editing categories. -->
    <category-modal
      :show="showModal"
      :category="selectedCategory"
      :category-names="categories.map(c => c.label)"
      @content-update="editCategoryLabel"
      @content-error="showCategoryUpdateError"
      @close-modal="closeModal" />

    <!-- Alert as confirmation to delete category. -->
    <category-alert
      type="warning"
      class="category-alert"
      :show="showAlert"
      @close-alert="closeAlert">
      <h1 slot="headline">Delete category</h1>

      <p slot="content">
        Do you really want to delete <strong>"{{ selectedCategoryLabel }}"</strong>?
      </p>

      <button class="plain"
        slot="cancel"
        @click="closeAlert">
        Cancel
      </button>
      <button class="warning"
        slot="confirm"
        @click="confirmDeleteCategory">
        Delete category
      </button>
    </category-alert>

    <main :class="{ 'no-categories': !categories.length, 'app-content': true }">
      <form class="add-category" @submit.prevent="submitNewCategory">
        <label for="category-name" class="form-label-group">
          <input required
            type="text"
            id="category-name"
            placeholder="Category"
            v-model="categoryName">
        </label>
        <button class="circle" aria-label="Add category">
          <feather-plus />
        </button>
      </form>

      <section class="categories-list">
        <ul v-if="categories.length">
          <li v-for="(category, index) in categories" :key="`category-${index}`">
            <list-description
              :label="category.label"
              :count="getCategoryChildrenCount(category)" />

            <div class="categories-actions">
              <button
                class="icon inverse edit"
                aria-label="Edit category"
                @click="openCategoryModal(category)">
                <feather-edit />
              </button>
              <button
                class="icon inverse delete"
                aria-label="Delete category"
                @click="openCategoryDialog($event, category)">
                <feather-trash />
              </button>
            </div>
          </li>
        </ul>

        <div v-else class="category-empty">
          <p>
            You don't have any categories yet.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import CategoryAlert from '@/components/Alert'
  import CategoryModal from './components/CategoryModal'
  import ListDescription from './components/ListDescription'

  export default {
    name: 'Categories',

    meta: {
      title: 'Categories'
    },

    components: {
      'category-alert': CategoryAlert,
      'category-modal': CategoryModal,
      'list-description': ListDescription,
      'feather-plus': () =>
          import('vue-feather-icon/components/plus' /* webpackChunkName: "categories" */),
      'feather-edit': () =>
          import('vue-feather-icon/components/edit-2' /* webpackChunkName: "categories" */),
      'feather-trash': () =>
          import('vue-feather-icon/components/trash' /* webpackChunkName: "categories" */)
    },

    data: () => ({
      showModal: false,
      showAlert: false,
      categoryName: '',
      selectedCategory: null
    }),

    computed: {
      ...mapState({
        categories: state => state.categories,
        plants: state => state.plants
      }),
      hasCategoryName () {
        return this.categoryName !== ''
      },
      selectedCategoryLabel () {
        return this.selectedCategory && this.selectedCategory.label
          ? this.selectedCategory.label
          : ''
      }
    },

    created () {
      this.updateAppHeader({
        title: 'Manage Categories',
        backBtn: true,
        backBtnPath: 'settings',
        settingsBtn: false
      })
    },

    methods: {
      ...mapActions([
        'addCategory',
        'deleteCategory',
        'updateCategory',
        'updatePlantCategory',
        'showNotification',
        'updateAppHeader'
      ]),
      closeModal () {
        this.showModal = false
        this.selectedCategory = null
      },
      closeAlert () {
        this.showAlert = false
        this.selectedCategory = null
      },
      submitNewCategory () {
        if (!this.hasCategoryName) return

        if (this.categories.find(c => c.label === this.categoryName)) {
          return this.showNotification({
            message: `A category with name "${this.categoryName}" already exists.`
          })
        }

        this.addCategory({ label: this.categoryName })
        // Reset state
          .then(() => Object.assign(this.$data, this.$options.data()))
      },
      showCategoryUpdateError (category) {
        this.showNotification({
          message: `A category with name "${category.label}" already exists.`
        })
      },
      editCategoryLabel (category) {
        this.updateCategory(category)
          .then(() => this.showNotification({ message: `Updated category.` }))
      },
      openCategoryModal (category) {
        this.selectedCategory = category
        this.showModal = true
      },
      openCategoryDialog (event, category) {
        this.selectedCategory = category
        this.showAlert = true

        if (event.currentTarget) {
          event.currentTarget.blur()
        }
      },
      confirmDeleteCategory () {
        const label = this.selectedCategory.label
        // 1. Delete category
        this.deleteCategory(this.selectedCategory)
        // 2. Delete category from all plants
          .then(() => Promise.all(this.plants.map(plant => this.updatePlantCategory({
            guid: plant.guid,
            category: this.selectedCategory,
            type: 'remove'
          }))))
        // 3. Close alert
          .then(() => this.closeAlert())
        // 4. Show notification
          .then(() =>
            this.showNotification({
              message: `Category "${label}" deleted.`
            }))
      },
      getCategoryChildrenCount (category) {
        let count = 0
        for (const plant of this.plants) {
          if (plant.categories.includes(category.guid)) {
            count += 1
          }
        }
        return count
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .main-wireframe {
    min-height: 100vh;
    background: var(--background-secondary);
  }

  section.no-categories {
    display: flex;
    height: calc(100vh - var(--app-header-size));
    flex-direction: column;

    & .categories-list {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .add-category {
    padding: var(--base-gap);
    display: flex;
    justify-content: space-between;
    align-items: center;

    & label {
      flex: 1 0 auto;
    }

    & input {
      width: 100%;
    }

    & button {
      margin-left: var(--base-gap);
    }
  }

  .category-empty {
    padding: 0 var(--base-gap);
    color: var(--text-color-secondary);
    text-align: center;
    font-weight: 600;
  }

  .categories-list ul {
    list-style: none;

    & li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--base-gap) calc(var(--base-gap) + 5px);
      border-top: 2px solid var(--transparency-black-light);
      font-size: var(--text-size-medium);
    }

    & svg {
      margin: 0;
    }
  }

  .categories-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: var(--base-gap);

    & button {
      background: var(--grey);
      border-radius: 50%;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
    }

    & button:first-of-type {
      margin-right: var(--base-gap);
    }

    & button.edit svg {
      transform: translateY(-1px);
    }

    & button.delete svg {
      transform: translateX(-1px) translateY(-1px);
    }
  }

  .category-alert button.warning {
    background: var(--brand-yellow);
    color: var(--link-color);
  }
</style>
