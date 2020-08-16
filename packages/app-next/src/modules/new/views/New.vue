<template>
  <div class="screen-addplant">
    <app-header color="white">Add a new friend</app-header>

    <type-dialog
      :show="showTypesDialog"
      :selected="type"
      @type-selected="setSelectedType"
      @close-dialog="toggleDialog('type', false)"
    />

    <tags-dialog
      :show="showTagsDialog"
      :tags="existingTags"
      :preselected="selectedTags"
      @create-tag="createNewTag"
      @tags-selected="setSelectedTags"
      @close-dialog="toggleDialog('tags', false)"
    />

    <main>
      <form class="addplant-form" @submit.prevent>
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

          <label-group id="addplant-type" label="Type">
            <button class="addplant-type-selector" @click="toggleDialog('type', true)">
              <div>
                <v-text v-if="type === null" color="inactive">e.g. Succulent, Herb, …</v-text>
                <v-text v-else>{{ type.label }}</v-text>
              </div>
              <div>
                <feather-list />
              </div>
            </button>
          </label-group>

          <label-group id="addplant-tags" label="Tags">
            <div :class="['addplant-tags-container', selectedTags.length && 'has-tags']">
              <v-button color="yellow" round small @click.native="toggleDialog('tags', true)">
                <feather-plus />
                <span class="visuallyhidden">Open dialog</span>
              </v-button>

              <v-text v-if="!selectedTags.length" color="special">
                Add tags for more granular organisation
              </v-text>
              <div v-else>
                <v-tag v-for="tag of selectedTags" :key="tag.guid" :tag="tag">{{
                  tag.label
                }}</v-tag>
              </div>
            </div>
          </label-group>
        </div>

        <v-button color="yellow" @click.prevent.native="createNewPlant">
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
  import { mapState, mapActions } from 'vuex'
  import { getStoragePath, addPlant, uploadFile } from '@/services/firebase'
  import { RootState } from '@/store'
  import { Plant, PlantType, PlantTag } from '@/types/plant'
  import logger from '@/utils/vueLogger'
  import setErrorMessage from '@/utils/setErrorMessage'
  import { isBlobbable } from '@/utils/blob'
  import TypeDialog from '@/components/TypeDialog.vue'
  import Illustration from '../components/Illustration.vue'
  import { downloadFile } from '../../../services/firebase'

  interface NewMapState {
    userID: string
    existingTags: {
      data: PlantTag[]
      loaded: boolean
    }
  }

  export default (Vue as VueConstructor<Vue & NewMapState>).extend({
    name: 'New',
    components: {
      'new-illustration': Illustration,
      'type-dialog': TypeDialog,
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
      'feather-list': () =>
        import('vue-feather-icons/icons/ListIcon' /* webpackChunkName: "icons" */),
      'feather-plus': () =>
        import('vue-feather-icons/icons/PlusIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        name: null,
        file: null,
        type: null,
        progress: false,
        error: { el: null, message: null },
        selectedTags: [] as PlantTag[],
        showTypesDialog: this.$hasQuery('type'),
        showTagsDialog: this.$hasQuery('tags'),
      }
    },
    computed: mapState<RootState>({
      userID: (state: RootState) => state.account.uid,
      existingTags: (state: RootState) => state.home.tags,
    }),
    methods: {
      ...mapActions({
        loadTags: 'home/loadTags',
        createTag: 'home/createTag',
        updateTags: 'home/updateTags',
      }),
      getFile(file: File) {
        this.error = { el: null, message: null }
        this.file = file
      },
      assignFileUploadError(message: string) {
        this.error.el = 'photo'
        this.error.message = message
      },
      async createNewTag(label: string) {
        await this.createTag({ label })
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
            tags: this.selectedTags,
            type: this.type,
          }

          await addPlant(this.userID, plant)
          await this.updateTags(
            this.selectedTags.map(tag => {
              tag.plants.push(guid)
              return tag
            })
          )

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
      toggleDialog(type: 'tags' | 'type', show: boolean) {
        let query

        if (type === 'tags') {
          this.showTagsDialog = show
          query = { tags: null }
        } else {
          this.showTypesDialog = show
          query = { type: null }
        }

        if (show) {
          this.$router.push({ path: '/new', query })
        } else {
          this.$router.push('/new')
        }
      },
      setSelectedType(type: PlantType) {
        this.type = type
      },
      setSelectedTags(tags: PlantTag[]) {
        this.selectedTags = tags
      },
    },
    async created() {
      if (!this.existingTags.loaded) {
        await this.loadTags()
      }
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

    & > button {
      --shadow: var(--brand-green-dark) !important;
      width: 100%;

      & svg {
        animation: spin 3s linear infinite;
      }
    }
  }

  .addplant-type-selector {
    display: flex;
    align-items: stretch;
    width: 100%;
    border: none;
    overflow: hidden;
    font-family: 'FiraMono', 'Courier New', Courier, monospace;
    background: transparent;

    &:active,
    &:focus {
      outline: none;

      & div:first-of-type,
      & div:first-of-type + div {
        border-color: var(--brand-beige-dark);
      }
    }

    & div:first-of-type {
      width: 100%;
      display: flex;
      align-items: center;
      padding: calc(var(--base-gap) * 1.5);
      border: 2px solid var(--brand-white);
      border-top-left-radius: var(--base-radius);
      border-bottom-left-radius: var(--base-radius);
      border-right: none;
      background: var(--brand-white);
    }

    & div:first-of-type + div {
      background: var(--brand-yellow);
      border: 2px solid var(--brand-yellow);
      border-top-right-radius: var(--base-radius);
      border-bottom-right-radius: var(--base-radius);
      border-left: none;
      padding: 0 calc(var(--base-gap) * 1.25);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .addplant-tags-container {
    display: flex;
    align-items: center;

    &.has-tags {
      align-items: flex-start;
    }

    & > button {
      --shadow: var(--brand-green-dark) !important;
      margin-right: var(--base-gap);
    }

    & > div {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: calc(0.5 * var(--base-gap));

      & .plant-tag {
        margin-bottom: calc(0.5 * var(--base-gap));
      }

      & .plant-tag:not(:last-of-type) {
        margin-right: calc(0.5 * var(--base-gap));
      }
    }
  }
</style>
