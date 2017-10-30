<template>
  <section>
    <app-modal
      :class="{ 'danger-modal': isDangerModal() }"
      :backgroundColor="modalColor"
      :show="showModal"
      @close-modal="closeModal">
      <h1 slot="headline">{{ modalTitle }}</h1>

      <div slot="content" v-if="isDangerModal()">
        <p>
          Be aware that once you've done this, your data <strong>cannot</strong> be restored!
          This permanently deletes all your plant (photos, collections, <em>everything</em>) data.
        </p>
        <button @click="deleteApplicationData">
          I understand, delete my data
        </button>
      </div>

      <div slot="content" v-else class="import-modal-content">
        <form class="import-form" @submit.prevent="importApplicationData">
          <label for="import-data">
            <file-upload
              name="import-data"
              accepts=".json"
              :disablePreview="true"
              @file-selected="getImportFile" />
          </label>

          <p>
            Please select an import type:
          </p>

          <ul class="import-types">
            <li v-for="type of importTypes">
              <input
                type="radio"
                name="import-type"
                :id="type.id"
                @change="updateImportType(type.id)" />
              <label :for="type.id">
                {{ type.label }}
              </label>
            </li>
          </ul>

          <button :disabled="file === null || selectedImportType === false">
            Import
          </button>
        </form>
      </div>
    </app-modal>

    <div class="download-section">
      <span>
        Download all your plant data as a JSON file.
        You might use this little database to import in a different tool,
        or even modify and import it again.
      </span>

      <button @click="downloadData">
        <feather-download />
        Download plant data
      </button>
    </div>

    <div class="import-section">
      <span>
        Import existing plant data. You can choose
        between overwriting your current database, merging, or adding new data
        to your current data.
      </span>

      <button @click="openImportModal">
        <feather-copy />
        Import data
      </button>

      <span class="note">
        <strong>Note:</strong> More info for custom plant <a href="https://github.com/morkro/happy-plants#data-structure" target="_blank">data structure</a>.
      </span>
    </div>

    <hr />

    <div class="danger-zone">
      <h2>Danger Zone</h2>
      <span>Delete your application data. Once you've deleted your data, there is no going back!</span>
      <button class="warning" @click="openDangerModal">
        <feather-delete />
        Delete application data
      </button>
    </div>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'
  import Modal from '@/components/Modal'
  import FileUpload from '@/components/FileUpload'

  export default {
    name: 'SettingsData',

    components: {
      'app-modal': Modal,
      'file-upload': FileUpload,
      'feather-download': () => import('vue-feather-icon/components/download' /* webpackChunkName: "settings" */),
      'feather-delete': () => import('vue-feather-icon/components/delete' /* webpackChunkName: "settings" */),
      'feather-copy': () => import('vue-feather-icon/components/copy' /* webpackChunkName: "settings" */)
    },

    data () {
      return {
        file: null,
        showModal: false,
        modalType: null,
        dangerModalTitle: 'Deleting application data',
        importModalTitle: 'Import plant data',
        selectedImportType: false,
        importTypes: [
          { label: 'Overwrite', id: 'import-overwrite' },
          { label: 'Merge and add', id: 'import-merge' }
        ]
      }
    },

    computed: {
      modalColor () {
        return this.isDangerModal()
          ? '#ef494f'
          : '#f5f5f5'
      },
      modalTitle () {
        return this.isDangerModal()
          ? this.dangerModalTitle
          : this.importModalTitle
      }
    },

    methods: {
      ...mapActions([
        'showNotification',
        'getAllPlants',
        'deleteAllPlants',
        'importPlantData'
      ]),

      isDangerModal () {
        return this.modalType === 'danger'
      },

      triggerDownload (data = { message: 'No data!' }) {
        const dataString = JSON.stringify(data, null, 2)
        const $a = document.createElement('a')

        $a.download = `happy-plants-${Date.now()}.json`
        $a.href = window.URL.createObjectURL(new Blob([dataString], { type: 'text/json' }))
        $a.dataset.downloadurl = ['text/json', $a.download, $a.href].join(':')

        $a.dispatchEvent(new MouseEvent('click', { view: window }))
      },

      downloadData () {
        this.getAllPlants()
          .then(this.triggerDownload)
      },

      updateImportType (id) {
        this.selectedImportType = id.replace('import-', '')
      },

      getImportFile (data) {
        const reader = new FileReader()
        reader.readAsText(data.blob)
        reader.onload = event => {
          this.file = JSON.parse(event.currentTarget.result)
        }
      },

      openDangerModal () {
        this.showModal = true
        this.modalType = 'danger'
      },

      openImportModal () {
        this.showModal = true
        this.modalType = 'import'
      },

      closeModal () {
        this.showModal = false
        this.modalType = null
      },

      importApplicationData () {
        const payload = {
          data: this.file,
          importType: this.selectedImportType
        }
        this.importPlantData(payload)
          .then(() => this.closeModal())
          .then(() => this.showNotification({
            message: 'Successfully imported your plant data!'
          }))
          .then(() => this.$router.push('/'))
      },

      deleteApplicationData () {
        this.deleteAllPlants()
          .then(() => this.closeModal())
          .then(() => this.showNotification({
            message: 'Successfully deleted all your data.'
          }))
          .then(() => this.$router.push('/'))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";
  @import "~styles/fonts";

  $color-modal-border: rgba(0, 0, 0, 0.06);

  section {
    padding: $base-gap;
    line-height: 150%;

    span {
      display: inline-block;
      margin-bottom: $base-gap;
    }

    svg {
      height: 18px;
      width: 18px;
      filter: none;
    }
  }

  .download-section {
    margin-bottom: $base-gap;
  }

  .import-section .note {
    font-size: $text-size-small;
    font-style: italic;
    margin-top: $base-gap;
    margin-bottom: 0;
    opacity: 0.7;
  }

  hr {
    margin: $base-gap 0;
    border: none;
    border-top: 3px solid $dark-transparency;
  }

  .danger-modal {
    h1,
    p {
      color: $text-color-inverse;
    }

    button {
      margin-top: $base-gap;
      display: block;
      background: $yellow;
      color: $link-color;
    }
  }

  .import-modal-content {
    border-top: 3px solid $color-modal-border;
    padding-top: $base-gap;
  }

  .import-types {
    list-style: none;
    margin: $base-gap 0;

    span {
      margin: 0;
    }

    li {
      display: block;
      width: 100%;
      padding: $base-gap/2 0;

      &:not(:last-of-type) {
        border-bottom: 2px solid $color-modal-border;
      }
    }
  }
</style>
