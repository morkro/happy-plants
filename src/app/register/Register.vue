<template>
  <div class="main-wireframe">
    <app-header :back-button="true">
      <h1 slot="title">Add a new friend</h1>
    </app-header>

    <register-alert
      class="register-alert"
      :show="showAlert"
      @close-alert="closeCreateCategoryDialog">
      <h1 slot="headline">Create category</h1>

      <div slot="content">
        <input
          type="text"
          id="category-name"
          v-model="categoryName">
      </div>

      <button class="plain"
        slot="cancel"
        @click="closeCreateCategoryDialog">
        Cancel
      </button>
      <button slot="confirm" @click="confirmCreateCategory">
        Create category
      </button>
    </register-alert>

    <main class="app-content">
      <form @submit.prevent>
        <label for="register-name" class="form-label-group">
          <h2 class="required">What's your friends name?</h2>
          <span />
          <input required
            type="text"
            id="register-name"
            placeholder="Name"
            @change="getName">
        </label>

        <label for="add-category" class="form-label-group">
          <h2>Which category does it belong to?</h2>
          <span v-if="!categories.length" key="category-create">
            You don't have any categories created yet, but can just do that now.
          </span>

          <button v-if="!categories.length"
            class="plain"
            @click="openCreateCategoryDialog">
            Create category
          </button>

          <select
            v-if="categories.length"
            id="add-category"
            name="add-category"
            @change="getCategory">
            <option
              selected
              disabled
              hidden>
              Select category
            </option>
            <option
              v-for="category in categories"
              :value="category.guid"
              :key="category.guid">
              {{ category.label }}
            </option>
          </select>
        </label>

        <label for="register-file" class="form-label-group">
          <h2>Upload photo</h2>
          <span>You can either select a photo from your gallery or take one now.</span>
          <file-upload
            name="register-file"
            @file-selected="getFile"
            @loading-file="handleLoadingState" />
        </label>

        <button
          @click="validateForm"
          :disabled="!canRegisterPlant"
          type="submit">
          <svgicon
            icon="leaf"
            width="16"
            height="24"
            color="#000" />
          Add plant
        </button>
      </form>
    </main>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import AppHeader from '@/components/AppHeader'
  import Alert from '@/components/Alert'
  import FileUpload from '@/components/FileUpload'
  import { getPlantStructure } from '@/app/plant/utils'
  import '@/assets/leaf'

  export default {
    name: 'RegisterPlant',

    meta: {
      title: 'Add a new friend'
    },

    components: {
      'app-header': AppHeader,
      'register-alert': Alert,
      'file-upload': FileUpload
    },

    computed: {
      ...mapState({
        categories: state => state.categories
      }),
      canRegisterPlant () {
        return this.name !== '' || this.isUploadingFile
      }
    },

    data () {
      return {
        name: '',
        blob: undefined,
        isUploadingFile: false,
        selectedCategory: false,
        categoryName: '',
        showAlert: false
      }
    },

    methods: {
      ...mapActions([
        'addPlant',
        'addCategory'
      ]),
      handleLoadingState ({ loading }) {
        this.isUploadingFile = loading
      },
      getFile (data) {
        this.blob = data.blob
      },
      getName (event) {
        if (!event.target.value) return
        this.name = event.target.value
      },
      getCategory (event) {
        const $option = event.target.options[event.target.options.selectedIndex]
        this.selectedCategory = this.categories.find(cat => cat.guid === $option.value)
      },
      openCreateCategoryDialog () {
        this.showAlert = true
      },
      closeCreateCategoryDialog () {
        this.showAlert = false
      },
      confirmCreateCategory () {
        if (this.categoryName === '') return
        this.addCategory({ label: this.categoryName })
          .then(() => {
            this.closeCreateCategoryDialog()
          })
      },
      validateForm () {
        const config = {
          ...getPlantStructure(),
          blob: this.blob,
          categories: this.selectedCategory ? [this.selectedCategory.guid] : [],
          name: this.name
        }
        this.addPlant(config).then(guid =>
          this.$router.push(`/plant/${guid}`))
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .register-alert {
    & input {
      width: 100%;
    }
  }

  .main-wireframe {
    background: var(--background-secondary);

    & .app-content {
      padding: var(--base-gap) 0;
      line-height: 150%;
    }
  }

  form {
    position: relative;
    z-index: 1;
    padding: 0 var(--base-gap);
    width: 100%;

    & input {
      width: 100%;
    }

    & select {
      padding: calc(var(--base-gap) + 5px) var(--base-gap);
    }
  }

  .form-order {
    display: flex;
    background: white;
    padding: 0;
    margin-bottom: var(--base-gap);
    border: none;
    border-radius: var(--border-radius);
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.12);
    width: 100%;
  }

  .form-label-group {
    display: block;
    width: 100%;
    margin-bottom: calc(var(--base-gap) * 2);
  }

  label h2 {
    margin-bottom: calc(var(--base-gap) / 2);

    &.required::after {
      color: var(--text-color-button);
      content: "*";
      font-size: var(--text-size-medium);
      background: var(--brand-red);
      border-radius: 50%;
      width: var(--icon-size-small);
      height: var(--icon-size-small);
      display: inline-flex;
      justify-content: center;
      align-content: center;
      margin-left: calc(var(--base-gap) / 2);
    }
  }

  label span {
    display: block;
    color: var(--text-color-secondary);
    font-size: var(--text-size-small);
    margin-bottom: calc(var(--base-gap) / 2);
    padding: 0 1px;
  }
</style>
