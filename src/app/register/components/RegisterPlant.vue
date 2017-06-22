<template>
  <main class="main-wireframe">
    <app-header :back="true" :settings="true">
      <h1 slot="title">Add a new friend</h1>
    </app-header>

    <section>
      <form @submit.prevent="validateForm">
        <label-group
          class="form-label-group"
          v-for="step of formSteps"
          :required="step.required"
          :label="step.label"
          :description="step.description"
          :name="step.type"
          :type="step.type"
          :placeholder="step.placeholder"
          @process-step="getInputValue">
        </label-group>

        <button>
          Add plant <svg-icon class="icon" icon="right-arrow"></svg-icon>
        </button>
      </form>
    </section>
  </main>
</template>

<script>
  import { mapActions } from 'vuex'
  import blobUtil from 'blob-util'
  import AppHeader from '@/app/shared/AppHeader'
  import getDefaultStructure from '@/utils/getDefaultStructure'
  import LabelGroup from './LabelGroup'

  import '@/assets/right-arrow'

  export default {
    name: 'RegisterPlant',

    components: {
      'app-header': AppHeader,
      'label-group': LabelGroup
    },

    methods: {
      ...mapActions([
        'addPlant'
      ]),
      getInputValue (data) {
        if (data.type === 'name') {
          this.name = data.payload
        } else if (data.type === 'file') {
          this.blob = blobUtil.createObjectURL(data.payload)
        }
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
    },

    data () {
      return {
        name: '',
        blob: undefined,
        formSteps: [
          {
            type: 'name',
            required: true,
            label: 'What\'s your friends name?',
            placeholder: 'Name'
          },
          {
            type: 'file',
            required: false,
            label: 'Upload photo',
            description: 'You can either select a photo from your gallery or take one now.',
            placeholder: ''
          }
        ]
      }
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

  form {
    position: relative;
    z-index: 1;
    padding: 0 $base-gap;
    width: 100%;

    button {
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        margin-left: $base-gap / 2;
      }
    }
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
    margin-bottom: $base-gap * 2;
  }
</style>
