<template>
  <main>
    <app-header :back="true" :settings="true">
      <h1 slot="title">Add a new friend</h1>
    </app-header>

    <section>
      <form @submit.prevent="validateForm">
        <div class="form-order" ref="labels">
          <label for="name" data-step="1">
            <h2>What's your friends name?</h2>
            <input v-model="name" name="name" type="text">
          </label>
          <label for="scientific" data-step="2">
            <h2>Do you also know its scientific name?</h2>
            <input v-model="scientific" name="scientific" type="text">
          </label>
          <label for="file" data-step="3">
            <h2>Upload photo</h2>
            <input name="file" v-on:change="getFileInput" type="file">
          </label>
          <label for="location" data-step="4">
            <h2>Where is it located?</h2>
            <input v-model="location" name="location" type="text">
          </label>

          <button class="rounded" type="submit">
            <svg-icon icon="right-arrow" width="25" height="25" color="#000000"></svg-icon>
          </button>
        </div>

        <div class="form-controls">
          <form-progress :steps="formLabels.length" :current="currentStep + 1" />
        </div>
      </form>

      <div class="form-background">
        <svg-icon icon="leaf" class="background-icon"></svg-icon>
      </div>
    </section>
  </main>
</template>

<script>
  import blobUtil from 'blob-util'
  import localforage from 'localforage'
  import uuid from 'uuid/v4'
  import router from '@/router'
  import AppHeader from '@/components/AppHeader'
  import Progress from '@/components/Progress'
  import '@/assets/leaf'
  import '@/assets/right-arrow'

  export default {
    name: 'AddPlant',
    components: {
      'app-header': AppHeader,
      'form-progress': Progress
    },
    methods: {
      validateForm (event) {
        this.updateForm()
        // this.$validator.validateAll()
        //   .then(this.prepareData)
        //   .catch(this.showError)
      },
      updateForm () {
        if (this.currentStep <= this.formLabels.length) {
          this.currentStep = this.currentStep + 1
          this.currentLabel = this.formLabels[this.currentStep]
          this.removeActiveLabel()
          this.setActiveLabel(this.currentLabel)
        }
      },
      updateCurrentStep () {
        if (this.currentStep <= this.formLabels.length) {
          this.currentStep = this.currentStep + 1
        }
      },
      removeActiveLabel () {
        this.$refs.labels
          .querySelector('label.active')
          .classList
            .remove('active')
      },
      setActiveLabel (name) {
        this.$refs.labels
          .querySelector(`label[for="${name}"]`)
          .classList
            .add('active')
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
        location: '',
        formLabels: ['name', 'scientific', 'file', 'location'],
        currentLabel: null,
        currentStep: 0
      }
    },
    created () {
      this.currentLabel = this.formLabels[this.currentStep]
    },
    mounted () {
      this.setActiveLabel(this.currentLabel)
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  main {
    background: $green;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    section {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      min-height: calc(100vh - #{$app-header-size});
      position: relative;
      top: $app-header-size;
    }
  }

  .form-background {
    top: 0;
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 50%;
    background: rgba(0, 0, 0, .12);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .background-icon {
      width: 50%;
      height: 50%;
      transform: translateY(25px);
      fill: $green;
    }
  }

  form {
    position: relative;
    z-index: 1;
    padding: 0 $base-gap;
    width: 100%;
    transform: translateY(20%);
  }

  .form-order {
    display: flex;
    background: white;
    padding: 0;
    margin-bottom: $base-gap;
    color: $text-color-base;
    border: none;
    border-radius: $border-radius;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.12);
    width: 100%;

    button {
      background: transparent;
      box-shadow: none;
      padding: $base-gap;
    }
  }

  label {
    display: none;
    width: 100%;
    position: relative;

    &.active {
      display: block;
    }

    h2 {
      position: absolute;
      color: $text-color-button;
      left: 0;
      top: 0;
      transform: translateY(-140%);
    }
  }

  input:not([type="file"]) {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
