<template>
  <div class="main-wireframe">
    <main class="app-content">
      <form @submit.prevent>
        <form-group for="new-plant-name" required>
          <h2>What's your friends name?</h2>
          <v-input required
            type="text"
            id="new-plant-name"
            placeholder="Name"
            @change="getName" />
        </form-group>

        <form-group for="new-plant-file">
          <h2>Upload photo</h2>
          <span>You can either select a photo from your gallery or take one now.</span>
          <file-upload
            name="new-plant-file"
            @file-selected="getFile"
            @loading-file="handleLoadingState" />
        </form-group>

        <v-button
          @click.native="validateForm"
          :disabled="!canAddPlant"
          :loading="addPlantProgress">
          <template v-slot:icon>
            <svgicon
              icon="leaf"
              width="16"
              height="24"
              color="#000" />
          </template>
          Add plant
        </v-button>
      </form>
    </main>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { getPlantStructure } from '@/app/plant/utils'
  import { getUrlFromBlob, isBlobbable } from '@/utils/blob'
  import '@/assets/icons/leaf'

  export default {
    name: 'NewPlant',

    meta: {
      title: 'Add a new friend'
    },

    computed: {
      canAddPlant () {
        return this.name !== '' || this.isUploadingFile
      }
    },

    data () {
      return {
        name: '',
        blob: null,
        isUploadingFile: false,
        addPlantProgress: false
      }
    },

    created () {
      this.updateAppHeader({
        title: 'Add a new friend',
        backBtn: true,
        backBtnPath: this.returnRoutePath
      })
    },

    methods: {
      ...mapActions([
        'addPlant',
        'updateAppHeader'
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
      async validateForm () {
        this.addPlantProgress = true
        const guid = await this.addPlant({
          ...getPlantStructure(),
          blob: this.blob,
          imageURL: isBlobbable(this.blob) && getUrlFromBlob(this.blob),
          name: this.name
        })
        this.addPlantProgress = false

        this.$router.push(`/plant/${guid}`)
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .new-plant-dialog {
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

    & button:not([disabled]) svg {
      filter: invert(100%) !important;
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
</style>
