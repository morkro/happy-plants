<template>
  <main>
    <header class="page-header">
      <back-button />
      <h1>+🌵 Add a new plant</h1>
    </header>

    <form @submit.prevent="validateForm">
      <label for="name">
        <span>What's your plants name?</span>
        <input v-model="name" name="name" type="text">
      </label>
      <label for="scientific">
        <span>Do you also know its scientific name?</span>
        <input v-model="scientific" name="scientific" type="text">
      </label>
      <label for="file">
        <span>Upload photo</span>
        <input name="file" v-on:change="getFileInput" type="file">
      </label>
      <label for="location">
        <span>Where is it located?</span>
        <input v-model="location" name="location" type="text">
      </label>
      <button class="rounded">Add</button>
    </form>
  </main>
</template>

<script>
  import blobUtil from 'blob-util'
  import localforage from 'localforage'
  import uuid from 'uuid/v4'
  import router from '@/router'
  import BackButton from '@/components/BackButton'

  export default {
    name: 'AddPlant',
    components: {
      'back-button': BackButton
    },
    methods: {
      validateForm (event) {
        this.$validator.validateAll()
          .then(this.prepareData)
          .catch(this.showError)
      },
      prepareData () {
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(this.file)
        fileReader.onloadend = event =>
          blobUtil.arrayBufferToBlob(event.target.result, this.file.type)
            .then(this.saveData)
      },
      saveData (blob) {
        const guid = uuid()
        const config = { guid, name: this.name, blob, scientific: this.scientific }
        localforage.setItem(`plant-${guid}`, config)
          .then(data => {
            console.log(data)
            router.push('/')
          })
      },
      showError (error) {
        console.warn(error)
      },
      getFileInput (event) {
        this.file = event.target.files[0]
      }
    },
    data () {
      return {
        name: '',
        scientific: '',
        file: '',
        blob: '',
        location: ''
      }
    },
    mounted () {
      console.log(localforage)
    }
  }
</script>

<style lang="scss" scoped>
  main {
    background: #38B449;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  label {
    display: block;
    width: 100%;
    margin: 2vh 0;
  }

  input:not([type="file"]) {
    display: block;
    width: 100%;
  }
</style>
