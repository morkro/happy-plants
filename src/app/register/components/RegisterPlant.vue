<template>
  <main class="main-wireframe">
    <app-header :back="true" :settings="true">
      <h1 slot="title">Add a new friend</h1>
    </app-header>

    <section>
      <!-- <form @submit.prevent="validateForm"> -->
      <div class="form">
        <label-group
          class="form-label-group"
          v-for="(step, index) of formSteps"
          :data-step="index"
          :required="step.required"
          :label="step.label"
          :name="step.type"
          :type="step.type"
          :placeholder="step.placeholder"
          @process-step="getInputValue">
        </label-group>

        <button>Add plant</button>
        <!-- <form-progress :steps="formSteps.length" :current="currentStep" /> -->
      </div>

      <div class="form-background">
        <svg-icon v-if="!file" icon="leaf" class="background-icon"></svg-icon>
        <img v-else :src="filePreviewBlob" />
      </div>
    </section>
  </main>
</template>

<script>
  import { mapActions } from 'vuex'
  import blobUtil from 'blob-util'
  import AppHeader from '@/app/shared/AppHeader'
  import Progress from '@/app/shared/Progress'
  import getDefaultStructure from '@/utils/getDefaultStructure'
  import LabelGroup from './LabelGroup'

  import '@/assets/leaf'
  import '@/assets/right-arrow'
  import '@/assets/check'
  import '@/assets/shutter'

  export default {
    name: 'RegisterPlant',

    components: {
      'app-header': AppHeader,
      'form-progress': Progress,
      'label-group': LabelGroup
    },

    methods: {
      ...mapActions([
        'addPlant'
      ]),
      getInputValue (data) {
        console.log(data)
      },
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
        const config = {
          ...getDefaultStructure(),
          blob,
          name: this.name
        }
        this.addPlant(config).then(guid =>
          this.$router.push(`/plant/${guid}`))
      },
      getFileInput (event) {
        this.filePreviewBlob = blobUtil.createObjectURL(event.target.files[0])
        this.file = event.target.files[0]
      }
    },

    data () {
      return {
        name: '',
        file: undefined,
        filePreviewBlob: undefined,
        blob: '',
        formSteps: [
          {
            type: 'name',
            required: true,
            label: 'What\'s your friends name?',
            description: '',
            placeholder: 'Name'
          },
          {
            type: 'file',
            required: false,
            label: 'Upload photo',
            description: '',
            placeholder: ''
          }
        ],
        currentLabel: null,
        currentStep: 0
      }
    },

    created () {
      this.currentLabel = this.formSteps[this.currentStep]
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

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

  .form {
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
  }

  .form-label-group {
    width: 100%;
    margin-bottom: $base-gap;
  }
</style>
