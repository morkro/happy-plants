<template>
  <div class="settings-data">
    <settings-dialog
      id="settings-dialog"
      app-root=".settings-data"
      :type="this.modalType"
      :show="showDialog"
      @close-dialog="closeDialog">
      <span slot="headline">{{ modalTitle }}</span>

      <div v-if="isDangerDialog" key="modal-warning">
        <p>
          Be aware that once you've done this, your data <strong>cannot</strong> be restored!
          This permanently deletes all your plant (photos, collections, <em>everything</em>) data.
        </p>

        <button
          type="button"
          class="delete-data-button"
          @click="deleteApplicationData">
          Delete my data
        </button>
      </div>

      <div v-if="!isDangerDialog" key="modal-normal">
        <form class="import-form">
          <label for="import-data">
            <file-upload
              name="import-data"
              accepts=".json"
              :disable-preview="true"
              @file-selected="getImportFile" />
          </label>

          <p>
            Please select an import type:
          </p>

          <ul class="import-types">
            <li v-for="(type, index) of importTypes" :key="index">
              <input
                type="radio"
                name="import-type"
                :id="type.id"
                @change="updateImportType(type.id)">
              <label :for="type.id">
                {{ type.label }}
                <span>{{ type.description }}</span>
              </label>
            </li>
          </ul>
        </form>

        <button
          type="button"
          :disabled="file === null || selectedImportType === false"
          @click.prevent="importApplicationData">
          Import
        </button>
      </div>
    </settings-dialog>

    <section class="download-section">
      <h2>Export plant data</h2>

      <span>
        Download all your plant data as a JSON file (without photos!).
        You might use this little database to import in a different tool,
        or even modify and import it again.
      </span>

      <button
        type="button"
        @click="downloadData">
        <feather-download />
        <span>Export plant data</span>
      </button>
    </section>

    <section class="import-section">
      <h2>Import plant data</h2>

      <span>
        Import existing plant data. You can choose
        between overwriting your current database, merging, or adding new data
        to your current data.
      </span>

      <button
        type="button"
        @click="openImportModal">
        <feather-copy />
        <span>Import plant data</span>
      </button>

      <span class="note">
        More info for custom plant
        <a href="https://github.com/morkro/happy-plants#data-structure" target="_blank">
          data structure
        </a>.
      </span>
    </section>

    <section class="danger-zone">
      <h2>Danger Zone</h2>
      <span>Delete your application data. Once you've deleted your data, there is no going back!</span>
      <button
        type="button"
        class="warning"
        @click="openDangerModal">
        <feather-delete />
        <span>Delete application data</span>
      </button>
    </section>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import HappyDialog from '@/components/HappyDialog'
  import FileUpload from '@/components/FileUpload'

  export default {
    name: 'SettingsData',

    meta: {
      title: 'Data'
    },

    components: {
      'settings-dialog': HappyDialog,
      'file-upload': FileUpload,
      'feather-download': () =>
        import('vue-feather-icon/components/download' /* webpackChunkName: "icons" */),
      'feather-delete': () =>
        import('vue-feather-icon/components/delete' /* webpackChunkName: "icons" */),
      'feather-copy': () =>
        import('vue-feather-icon/components/copy' /* webpackChunkName: "icons" */)
    },

    data () {
      return {
        file: null,
        showDialog: false,
        modalType: null,
        dangerDialogTitle: 'Deleting application data',
        importDialogTitle: 'Import plant data',
        selectedImportType: false,
        importTypes: [
          {
            label: 'Overwrite',
            description: 'Overwrites all your existing plant data.',
            id: 'import-overwrite'
          },
          {
            label: 'Merge and add',
            description: 'Merges existing plants and adds new.',
            id: 'import-merge'
          }
        ]
      }
    },

    computed: {
      modalTitle () {
        return this.isDangerDialog
          ? this.dangerDialogTitle
          : this.importDialogTitle
      },
      isDangerDialog () {
        return this.modalType === 'danger'
      }
    },

    methods: {
      ...mapActions([
        'showNotification',
        'getAllData',
        'deleteAllData',
        'importTags',
        'importSettings',
        'importPlants'
      ]),

      triggerDownload (data = { message: 'No data!' }) {
        const dataString = JSON.stringify(data, null, 2)
        const $a = document.createElement('a')

        $a.download = `happy-plants-${Date.now()}.json`
        $a.href = window.URL.createObjectURL(new Blob([dataString], { type: 'text/json' }))
        $a.dataset.downloadurl = ['text/json', $a.download, $a.href].join(':')

        $a.dispatchEvent(new MouseEvent('click', { view: window }))
      },

      downloadData () {
        this.getAllData()
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
        this.showDialog = true
        this.modalType = 'danger'
      },

      openImportModal () {
        this.showDialog = true
        this.modalType = 'import'
      },

      closeDialog () {
        this.showDialog = false
        this.modalType = null
      },

      selectImportType (key) {
        const data = this.file[key]

        if (key === 'tags') {
          return this.importTags(data)
        } else if (key === 'settings') {
          return this.importSettings(data)
        } else if (key.startsWith('plant-')) {
          return this.importPlants({ data, importType: this.selectedImportType })
        } else {
          return Promise.resolve()
        }
      },

      importApplicationData () {
        Promise.resolve(Object.keys(this.file))
          .then(keys => Promise.all(keys.map(this.selectImportType)))
          .then(() => this.closeDialog())
          .then(() => this.showNotification({
            message: 'Successfully imported your plant data!'
          }))
          .then(() => this.$router.push('/'))
      },

      deleteApplicationData () {
        this.deleteAllData()
          .then(() => this.closeDialog())
          .then(() => this.showNotification({
            message: 'Successfully deleted all your data.'
          }))
          .then(() => this.$router.push('/'))
      }
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../../../styles/media-queries";

  .settings-data {
    --color-modal-border: rgba(0, 0, 0, 0.06);
    line-height: 150%;

    @media (--min-desktop-viewport) {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    & section {
      padding: var(--base-gap);
    }

    & section > span {
      display: inline-block;
      margin-bottom: var(--base-gap);
    }

    & svg {
      height: 18px;
      width: 18px;
      filter: none;
    }

    & section h2 {
      margin-bottom: calc(var(--base-gap) / 2);
    }
  }

  @media (--min-desktop-viewport) {
    .download-section,
    .import-section {
      width: 50%;
    }
  }

  .import-section {
    margin-bottom: var(--base-gap) !important;

    & .note {
      font-size: var(--text-size-small);
      font-style: italic;
      margin-top: var(--base-gap);
      margin-bottom: 0;
      opacity: 0.7;

      & a {
        font-weight: 500;
      }
    }
  }

  section.danger-zone {
    padding-top: calc(var(--base-gap) * 1.5);
    padding-bottom: calc(var(--base-gap) * 1.5);
    background: var(--brand-red);
    color: var(--text-color-inverse);

    @media (--min-desktop-viewport) {
      border-radius: var(--border-radius);
      width: 50%;
    }

    & h2 {
      color: var(--text-color-inverse);
    }

    & button {
      --button-background: var(--brand-yellow);

      & span {
        color: var(--link-color);
      }

      & svg {
        filter: invert(100%);
      }
    }
  }

  .import-types {
    list-style: none;
    margin: var(--base-gap) 0;

    & input {
      margin-right: calc(var(--base-gap) / 2);
    }

    & span {
      margin: 0;
      font-size: var(--text-size-small);
      color: var(--text-color-secondary);
      display: block;
    }

    & li {
      display: block;
      width: 100%;
      padding: var(--base-gap) / 2 0;

      &:not(:last-of-type) {
        border-bottom: 2px solid var(--color-modal-border);
        padding-bottom: calc(var(--base-gap) / 2);
        margin-bottom: calc(var(--base-gap) / 2);
      }
    }
  }
</style>
