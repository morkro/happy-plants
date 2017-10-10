<template>
  <main class="main-wireframe">
    <app-header :back="true">
      <h1 slot="title">Add a new friend</h1>
    </app-header>

    <section>
      <form @submit.prevent="validateForm">
        <label for="register-name" class="form-label-group">
          <h2 class="required">What's your friends name?</h2>
          <span></span>
          <input required
            type="text"
            id="register-name"
            placeholder="Name"
            @change="getName" />
        </label>

        <label for="register-file" class="form-label-group">
          <h2>Upload photo</h2>
          <span>You can either select a photo from your gallery or take one now.</span>
          <file-upload
            name="register-file"
            @file-selected="getFile" />
        </label>

        <button>Add plant</button>
      </form>
    </section>
  </main>
</template>

<script>
  import { mapActions } from 'vuex'
  import AppHeader from '@/components/AppHeader'
  import FileUpload from '@/components/FileUpload'
  import getDefaultStructure from '@/utils/getDefaultStructure'

  export default {
    name: 'RegisterPlant',

    components: {
      'app-header': AppHeader,
      'file-upload': FileUpload
    },

    data () {
      return {
        name: '',
        blob: undefined
      }
    },

    methods: {
      ...mapActions([
        'addPlant'
      ]),
      getFile (data) {
        this.blob = data.blob
      },
      getName (event) {
        if (!event.target.value) return
        this.name = event.target.value
      },
      validateForm () {
        const config = {
          ...getDefaultStructure(),
          blob: this.blob,
          name: this.name
        }
        this.addPlant(config).then(guid =>
          this.$router.push(`/plant/${guid}`))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";
  @import "~styles/fonts";

  main {
    background: $background-secondary;

    section {
      padding: $base-gap 0;
      line-height: 150%;
    }
  }

  form {
    position: relative;
    z-index: 1;
    padding: 0 $base-gap;
    width: 100%;

    input {
      width: 100%;
    }
  }

  .form-order {
    display: flex;
    background: white;
    padding: 0;
    margin-bottom: $base-gap;
    border: none;
    border-radius: $border-radius;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.12);
    width: 100%;
  }

  .form-label-group {
    display: block;
    width: 100%;
    margin-bottom: $base-gap * 2;
  }

  label h2 {
    margin-bottom: $base-gap / 2;

    &.required::after {
      color: $blue;
      content: " *";
      font-size: $text-size-small;
    }
  }

  label span {
    display: block;
    color: $text-color-secondary;
    font-size: $text-size-small;
    margin-bottom: $base-gap / 2;
    padding: 0 1px;
  }
</style>
