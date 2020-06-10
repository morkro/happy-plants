<template>
  <div class="screen-addplant">
    <app-header color="white">Add a new friend</app-header>

    <main>
      <form class="addplant-form" @submit.prevent="createNewPlant">
        <div>
          <label-group
            id="addplant-name"
            label="What's your friends name? *"
            :error="error.el === 'name' && error.message"
          >
            <template v-slot="{ label }">
              <v-input
                required
                type="text"
                placeholder="e.g. Echeveria pulvinata"
                id="addplant-name"
                v-model="name"
                :aria-describedby="label"
                :aria-invalid="error.el === 'name'"
                :error="error.el === 'name'"
                :error-message="error.message"
              />
            </template>
          </label-group>

          <label-group
            id="addplant-photo"
            label="Do you want to upload a photo?"
            :error="error.el === 'photo' && error.message"
          >
            <template v-slot="{ label }">
              <file-upload
                id="addplant-photo"
                @file-selected="getFile"
                @has-error="assignFileUploadError"
                :error="error.el === 'photo'"
                :aria-describedby="label"
              />
            </template>
          </label-group>
        </div>

        <v-button color="yellow">
          <feather-loader v-if="progress" />
          {{ ' ' }}Add friend
        </v-button>
      </form>

      <new-illustration />
    </main>
  </div>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { v4 as uuid } from 'uuid'
  import { mapState } from 'vuex'
  import setErrorMessage from '@/utils/setErrorMessage'
  import { isBlobbable } from '@/utils/blob'
  import { getStoragePath, addPlant, uploadFile } from '@/services/firebase'
  import { RootState } from '@/store'
  import { Plant } from '@/types/plant'
  import logger from '@/utils/vueLogger'
  import Illustration from '../components/Illustration.vue'

  interface NewMapState {
    userID: string
  }

  export default (Vue as VueConstructor<Vue & NewMapState>).extend({
    name: 'New',
    components: {
      'new-illustration': Illustration,
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        name: null,
        file: null,
        progress: false,
        error: { el: null, message: null },
      }
    },
    computed: mapState<RootState>({
      userID: (state: RootState) => state.user.uid,
    }),
    methods: {
      getFile(file: File) {
        this.error = { el: null, message: null }
        this.file = file
      },
      assignFileUploadError(message: string) {
        this.error.el = 'photo'
        this.error.message = message
      },
      async createNewPlant() {
        if (!this.name) return

        if (this.name.trim() === '') {
          this.error = {
            el: 'name',
            message: "Name can't be empty.",
          }
          return
        }

        this.progress = true
        try {
          const hasFile = this.file && isBlobbable(this.file.blob)
          const guid = uuid()
          const plant: Plant = {
            guid,
            blob: null,
            name: this.name.trim(),
            created: Date.now(),
            modified: Date.now(),
            imageURL: hasFile && getStoragePath(this.userID, guid),
            modules: [],
            tags: [],
          }

          await addPlant(this.userID, plant)

          if (hasFile) {
            await uploadFile(getStoragePath(this.userID, guid), this.file.blob)
          }

          this.$store.commit('home/assignPlant', plant)
          await this.$router.push(`/plant/${guid}`)
        } catch (error) {
          logger(error.message, true)
          this.error = setErrorMessage(error)
        } finally {
          this.progress = false
        }
      },
    },
  })
</script>

<style lang="postcss">
  .screen-addplant {
    width: 100%;
    display: flex;
    flex-direction: column;

    & #app-header {
      background: var(--brand-green);
    }

    & main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: var(--brand-green);
      position: relative;

      & .new-illustration-bg {
        position: absolute;
        z-index: 0;
        bottom: 0;
      }
    }
  }

  .addplant-form {
    width: 100%;
    height: 100%;
    padding: 0 var(--base-gap) var(--base-gap);
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 1;

    & button {
      width: 100%;

      & svg {
        animation: spin 3s linear infinite;
      }
    }
  }
</style>
