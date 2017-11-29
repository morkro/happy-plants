<template>
  <main class="main-wireframe">
    <category-modal
      :show="showModal"
      :category="selectedCategory"
      :categoryNames="categories.map(c => c.label)"
      @content-update="editCategoryLabel"
      @content-error="showCategoryUpdateError"
      @close-modal="closeModal">
    </category-modal>

    <category-dialog
      type="warning"
      class="category-dialog"
      :show="showDialog"
      @close-dialog="closeDialog">
      <h1 slot="headline">Delete category</h1>
      <p slot="content">
        Do you really want to delete <strong>"{{ selectedCategoryLabel }}"</strong>?
      </p>
      <button class="default" slot="cancel" @click="closeDialog">
        Cancel
      </button>
      <button class="warning" slot="confirm" @click="confirmDeleteCategory">
        Delete category
      </button>
    </category-dialog>

    <app-header :back="true" backPath="settings">
      <h1 slot="title">Manage Categories</h1>
    </app-header>

    <section :class="{ 'no-categories': !categories.length }">
      <form class="add-category" @submit.prevent="submitNewCategory">
        <label for="category-name" class="form-label-group">
          <input required
            type="text"
            id="category-name"
            placeholder="Category"
            v-model="categoryName" />
        </label>
        <button class="circle" aria-label="Add category">
          <feather-plus />
        </button>
      </form>

      <section class="categories-list">
        <ul v-if="categories.length">
          <li v-for="(category, index) in categories" :key="`category-${index}`">
            <strong>
              {{ category.label }}
            </strong>

            <div class="categories-actions">
              <button
                class="icon inverse"
                aria-label="Edit category"
                @click="openCategoryModal(category)">
                <feather-edit />
              </button>
              <button
                class="icon inverse"
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
    </section>
  </main>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import AppHeader from '@/components/AppHeader'
  import CategoryDialog from '@/components/Dialog'
  import CategoryModal from './CategoryModal'

  export default {
    name: 'Categories',

    components: {
      'app-header': AppHeader,
      'category-dialog': CategoryDialog,
      'category-modal': CategoryModal,
      'feather-plus': () =>
        import('vue-feather-icon/components/plus' /* webpackChunkName: "categories" */),
      'feather-edit': () =>
        import('vue-feather-icon/components/edit-2' /* webpackChunkName: "categories" */),
      'feather-trash': () =>
        import('vue-feather-icon/components/trash' /* webpackChunkName: "categories" */)
    },

    data: () => ({
      showModal: false,
      showDialog: false,
      categoryName: '',
      selectedCategory: null
    }),

    computed: {
      ...mapState({
        categories: state => state.categories
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

    methods: {
      ...mapActions([
        'addCategory',
        'deleteCategory',
        'updateCategory',
        'showNotification'
      ]),
      closeModal () {
        this.showModal = false
        this.selectedCategory = null
      },
      closeDialog () {
        this.showDialog = false
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
        this.showDialog = true

        if (event.currentTarget) {
          event.currentTarget.blur()
        }
      },
      confirmDeleteCategory () {
        this.deleteCategory(this.selectedCategory)
          .then(() =>
            this.showNotification({
              message: `Category "${this.selectedCategory.label}" deleted.`
            }))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";
  @import "~styles/fonts";

  main {
    min-height: 100vh;
    background: $light-grey;
  }

  section.no-categories {
    display: flex;
    height: calc(100vh - #{$app-header-size});
    flex-direction: column;

    .categories-list {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .add-category {
    padding: $base-gap;
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      flex: 1 0 auto;
    }

    input {
      width: 100%;
    }

    button {
      margin-left: $base-gap;
    }
  }

  .category-empty {
    padding: 0 $base-gap;
    color: $text-color-secondary;
    text-align: center;
    font-weight: 600;
  }

  .categories-list ul {
    list-style: none;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $base-gap $base-gap+5;
      border-top: 2px solid $transparency-black-light;
      font-size: $text-size-medium;
    }

    svg {
      margin: 0;
    }
  }

  .categories-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: $base-gap;

    button:first-of-type {
      margin-right: $base-gap;
    }
  }

  .category-dialog {
    button.warning {
      background: $yellow;
      color: $link-color;
      box-shadow: $plain-shadow;
    }
  }
</style>
