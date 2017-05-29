<template>
  <main class="main-wireframe">
    <app-header :back="true" :settings="true">
      <h1 slot="title">Add a new friend</h1>
    </app-header>

    <section>
      <form @submit.prevent="validateForm">
        <button v-if="!currentLabel.required" class="form-skip">
          Skip
        </button>

        <div class="form-order" ref="labels">
          <label for="name" data-step="1">
            <h2>What's your friends name?</h2>
            <input
              name="name"
              type="text"
              v-model="name"
              v-validate="'required'"
              placeholder="Plant name">
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
            <svg-icon :icon="getSubmitIconName()" width="25" height="25" color="#000000"></svg-icon>
          </button>
        </div>

        <div class="form-controls">
          <form-progress :steps="formSteps.length" :current="currentStep" />
        </div>
      </form>

      <div class="form-background">
        <svg-icon v-if="!file" icon="leaf" class="background-icon"></svg-icon>
        <img v-else :src="filePreviewBlob" />
      </div>
    </section>
  </main>
</template>

<script>
  import blobUtil from 'blob-util'
  import uuid from 'uuid/v4'
  import AppHeader from '@/components/AppHeader'
  import Progress from '@/components/Progress'
  import '@/assets/leaf'
  import '@/assets/right-arrow'
  import '@/assets/check'
  import '@/assets/shutter'

  export default {
    name: 'AddPlant',
    components: {
      'app-header': AppHeader,
      'form-progress': Progress
    },
    methods: {
      validateForm () {
        if (this.currentStep < this.formSteps.length) {
          this.triggerNextFormStep()
        } else {
          this.packageResults(this.file)
        }
      },
      triggerNextFormStep () {
        this.currentStep = this.currentStep + 1
        this.currentLabel = this.formSteps[this.currentStep - 1]
        this.removeActiveLabel()
        this.setActiveLabel(this.currentLabel)
      },
      packageResults (blob) {
        const guid = uuid()
        const config = { guid, blob, ...this.createBaseConfig() }
        this.$localforage.setItem(`plant-${guid}`, config)
          .then(data => {
            this.$router.replace(`/plant/${guid}`)
          })
      },
      removeActiveLabel () {
        this.$refs.labels
          .querySelector('label.active')
          .classList
            .remove('active')
      },
      setActiveLabel ({ type }) {
        this.$refs.labels
          .querySelector(`label[for="${type}"]`)
          .classList
            .add('active')
      },
      getFileInput (event) {
        this.filePreviewBlob = blobUtil.createObjectURL(event.target.files[0])
        this.file = event.target.files[0]
      },
      getSubmitIconName () {
        if (this.currentLabel.type === 'file') {
          return 'shutter'
        }
        if (this.currentStep === this.formSteps.length) {
          return 'check'
        }
        return 'right-arrow'
      },
      createBaseConfig () {
        const months = [
          'January', 'February', 'March',
          'April', 'Mai', 'June',
          'July', 'August', 'September',
          'October', 'November', 'December'
        ]
        return {
          name: this.name,
          scientific: this.scientific,
          seasons: months.map(month => ({ month, growth: false }))
        }
      }
    },
    data: () => ({
      name: '',
      scientific: '',
      file: undefined,
      filePreviewBlob: undefined,
      blob: '',
      location: '',
      formSteps: [
        { type: 'name', required: true },
        { type: 'scientific', required: false },
        { type: 'file', required: false },
        { type: 'location', required: false }
      ],
      currentLabel: null,
      currentStep: 1
    }),
    created () {
      this.currentLabel = this.formSteps[this.currentStep - 1]
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

    section {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      min-height: calc(100vh - #{$app-header-size});
      position: relative;
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
    overflow: hidden;

    .background-icon {
      width: 50%;
      height: 50%;
      fill: $green;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: .5;
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

  input {
    width: 100%;

    &:not([type="file"]) {
      display: block;
      height: 100%;
    }
  }

  .form-skip {
    background: none;
    box-shadow: none;
    position: absolute;
    top: 0;
    right: 0;
    font-size: $text-size-xsmall;
    font-weight: 600;
    color: rgba(0, 0, 0, .35);
    transform: translateY(-100%) translateX(-5%);
  }
</style>
