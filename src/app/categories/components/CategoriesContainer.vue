<template>
  <main class="main-wireframe">
    <app-header :back="true">
      <h1 slot="title">Manage Categories</h1>
    </app-header>

    <section>
      <form @submit.prevent="submitNewCategory">
        <label for="category-name" class="form-label-group">
          <h2>Category name</h2>
          <input
            type="text"
            id="category-name"
            placeholder="Category"
            @change="getCategoryName" />
        </label>
        <button>
          Add category
        </button>
      </form>

      <hr />

      <section>
        <h2>Categories</h2>
        <ul v-if="categories.length">
          <li v-for="category in categories">
            {{ category.label }}
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
      'app-header': AppHeader
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
        this.addCategory({ categoryName: this.categoryName })
          .then(() => {
            this.categoryName = ''
          })
      },
      getCategoryName (event) {
        if (!event.target.value) return
        this.categoryName = event.target.value.trim()
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
</style>
