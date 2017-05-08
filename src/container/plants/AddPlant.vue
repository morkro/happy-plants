<template>
  <main>
    <app-header :back="true" :settings="true">
      <h1 slot="title">Add a new friend</h1>
    </app-header>

    <form @submit.prevent="validateForm">
      <label for="name" data-step="1" class="active">
        <span>What's your plants name?</span>
        <input v-model="name" name="name" type="text">
      </label>
      <label for="scientific" data-step="2">
        <span>Do you also know its scientific name?</span>
        <input v-model="scientific" name="scientific" type="text">
      </label>
      <label for="file" data-step="3">
        <span>Upload photo</span>
        <input name="file" v-on:change="getFileInput" type="file">
      </label>
      <label for="location" data-step="4">
        <span>Where is it located?</span>
        <input v-model="location" name="location" type="text">
      </label>

      <button class="rounded" type="submit">Add</button>
      <div class="form-controls">
        <form-progress :steps="10" :current="0" />
      </div>
    </form>

    <div class="form-background">
      <svg class="background-icon" width="20px" height="30px" viewBox="0 0 20 30">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-178.000000, -595.000000)" stroke="#17C37B" stroke-width="0.5" fill="#17C37B" fill-rule="nonzero">
            <g transform="translate(157.000000, 579.000000)">
              <g transform="translate(22.000000, 17.000000)">
                <path d="M9.50889908,0.238191033 C9.25266055,-0.0793606238 8.80431193,-0.0793606238 8.54807339,0.238191033 C8.16374312,0.682752437 0.0289541284,10.3366394 0.0289541284,15.7987135 C0.0289541284,21.0067135 3.74405505,23.4837037 7.26699083,24.0553294 C7.90761468,24.1823392 8.3559633,24.6904327 8.3559633,25.3255361 L8.3559633,27.3579103 C8.3559633,27.7389942 8.61220183,27.9930136 8.99647706,27.9930136 C9.38075229,27.9930136 9.63699083,27.7389396 9.63699083,27.3579103 L9.63699083,25.3255361 C9.63699083,24.0552749 8.74023853,23.0390877 7.45915596,22.7850682 C6.04998165,22.5309942 1.3100367,21.3242651 1.3100367,15.7987135 C1.3100367,11.4798908 7.20297248,3.85837817 8.99642202,1.69899415 C10.7899266,3.85843275 16.6828073,11.4798908 16.6828073,15.7987135 C16.6828073,20.4986199 13.8003853,22.1499649 11.4304404,22.7215361 C11.1101835,22.7850682 10.853945,23.1660975 10.9180183,23.4837037 C10.9820917,23.8012554 11.366367,24.0553294 11.6866789,23.9917973 C15.7220367,23.1026199 17.9638899,20.1810682 17.9638899,15.8622456 C17.963945,10.3366394 9.82921101,0.682752437 9.50889908,0.238191033 Z" id="Shape"></path>
              </g>
              <g transform="translate(27.000000, 28.000000)">
                <polygon id="Shape" points="8 3.33333333 4.66666667 3.33333333 4.66666667 0 3.33333333 0 3.33333333 3.33333333 0 3.33333333 0 4.66666667 3.33333333 4.66666667 3.33333333 8 4.66666667 8 4.66666667 4.66666667 8 4.66666667"></polygon>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  </main>
</template>

<script>
  import blobUtil from 'blob-util'
  import localforage from 'localforage'
  import uuid from 'uuid/v4'
  import router from '@/router'
  import AppHeader from '@/components/AppHeader'
  import Progress from '@/components/Progress'

  export default {
    name: 'AddPlant',
    components: {
      'app-header': AppHeader,
      'form-progress': Progress
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
  @import "../../styles/variables";

  main {
    background: $green;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .form-background {
    top: 0;
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 50vh;
    background: rgba(0, 0, 0, .12);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .background-icon {
      width: 50%;
      height: 50%;
      transform: translateY(25px);
    }
  }

  form {
    position: relative;
    z-index: 1;
    padding: 0 $base-gap;
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
