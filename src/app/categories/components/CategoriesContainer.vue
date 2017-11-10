<template>
  <main class="main-wireframe">
    <app-header :back="true">
      <h1 slot="title">Manage Categories</h1>
    </app-header>

    <section>
      <form @submit.prevent="submitNewCategory">
        <label for="category-name" class="form-label-group">
          <h2>Category name</h2>
          <input required
            type="text"
            id="category-name"
            placeholder="Category"
            v-model="categoryName" />
        </label>
        <button>
          Add category
        </button>
      </form>

      <hr />

      <section>
        <h2>Categories</h2>
        <ul v-if="categories.length" class="categories-list">
          <li v-for="category in categories">
            <span>
              {{ category.label }}
            </span>

            <div class="categories-actions">
              <button
                class="icon"
                aria-label="Edit category"
                @click="editCategoryName(category)">
                <feather-edit />
              </button>
              <button
                class="icon"
                aria-label="Delete category"
                @click="requestDeleteCategory(category)">
                <feather-trash />
              </button>
            </div>
          </li>
        </ul>
      </section>
    </section>
  </main>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import AppHeader from '@/components/AppHeader'

  export default {
    name: 'Categories',

    components: {
      'app-header': AppHeader,
      'feather-edit': () =>
        import('vue-feather-icon/components/edit-2' /* webpackChunkName: "categories" */),
      'feather-trash': () =>
        import('vue-feather-icon/components/trash' /* webpackChunkName: "categories" */)
    },

    data: () => ({
      categoryName: ''
    }),

    computed: {
      ...mapState({
        categories: state => state.categories
      }),
      hasCategoryName () {
        return this.categoryName !== ''
      }
    },

    methods: {
      ...mapActions([
        'addCategory',
        'deleteCategory',
        'updateCategory'
      ]),
      submitNewCategory () {
        if (!this.hasCategoryName) return
        this.addCategory({ label: this.categoryName })
          .then(() => {
            this.categoryName = ''
          })
      },
      editCategoryName (category) {
        console.log('edit', category)
      },
      requestDeleteCategory (category) {
        this.deleteCategory(category)
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

  .categories-list {
    list-style: none;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .categories-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
