<template>
  <main>
    <header class="page-header">
      <h1>+🌵 Add a new plant</h1>
      <router-link :to="{ path: '/' }">
        Back to overview
      </router-link>
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
  export default {
    name: 'AddPlant',
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
          .then(what => console.log(what))
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
