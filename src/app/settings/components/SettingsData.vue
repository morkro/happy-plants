<template>
  <div class="settings-data">
    <happy-dialog
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

        <v-button
          color="yellow"
          :loading="deleteAllDataProgress"
          @click.native="deleteApplicationData">
          I understand, delete my data
        </v-button>
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

        <v-button
          :disabled="file === null || selectedImportType === false"
          :loading="importDataProgress"
          @click.native.prevent="importApplicationData">
          Import
        </v-button>
      </div>
    </happy-dialog>

    <section class="download-section box">
      <h2>Export plant data</h2>

      <span>
        Download all your plant data as a JSON file. If you're <strong>storing your data locally</strong>,
        it's currently <strong>not possible</strong> to include the images.
        You might use this little database to import in a different tool,
        or even modify and import it again.
      </span>

      <v-button :loading="exportDataProgress" @click.native="downloadData">
        <feather-download slot="icon" />
        Export plant data
      </v-button>
    </section>

    <section class="import-section box">
      <h2>Import plant data</h2>

      <span>
        Import existing plant data. You can choose
        between overwriting your current database, merging, or adding new data
        to your current data.
      </span>

      <v-button @click.native="openImportModal">
        <feather-copy slot="icon" />
        Import plant data
      </v-button>

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
      <v-button color="yellow" @click.native="openDangerModal">
        <feather-delete slot="icon" />
        Delete application data
      </v-button>
    </section>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'SettingsData',

    meta: {
      title: 'Import/ Export'
    },

    components: {
      'feather-download': () =>
        import('vue-feather-icons/icons/DownloadIcon' /* webpackChunkName: "icons" */),
      'feather-delete': () =>
        import('vue-feather-icons/icons/DeleteIcon' /* webpackChunkName: "icons" */),
      'feather-copy': () =>
        import('vue-feather-icons/icons/CopyIcon' /* webpackChunkName: "icons" */)
    },

    data () {
      return {
        exportDataProgress: false,
        importDataProgress: false,
        file: null,
        showDialog: false,
        modalType: null,
        dangerDialogTitle: 'Deleting application data',
        importDialogTitle: 'Import plant data',
        selectedImportType: false,
        deleteAllDataProgress: false,
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

    created () {
      this.updateAppHeader({
        title: 'Import/ Export',
        backBtn: true,
        rightBtn: false
      })
    },

    methods: {
      ...mapActions([
        'showNotification',
        'deleteAllData',
        'importTags',
        'importSettings',
        'importPlants',
        'updateAppHeader'
      ]),
      ...mapGetters([
        'getAllData'
      ]),

      triggerDownload (data = { message: 'No data!' }) {
        const dataString = JSON.stringify(data, null, 2)
        const $a = document.createElement('a')

        $a.download = `happy-plants-${Date.now()}.json`
        $a.href = window.URL.createObjectURL(new Blob([dataString], { type: 'text/json' }))
        $a.dataset.downloadurl = ['text/json', $a.download, $a.href].join(':')

        $a.dispatchEvent(new MouseEvent('click', { view: window }))
      },

      async downloadData () {
        this.exportDataProgress = true
        const data = await this.getAllData()
        this.exportDataProgress = false

        this.triggerDownload(data)
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
          return this.importTags(Array.isArray(data) ? data : data.data)
        } else if (key === 'settings') {
          return this.importSettings(data)
        } else if (key === 'plants') {
          return this.importPlants({ data: data.data, importType: this.selectedImportType })
        } else if (key.startsWith('plant-')) {
          return this.importPlants({ data, importType: this.selectedImportType })
        } else {
          return Promise.resolve()
        }
      },

      async importApplicationData () {
        this.importDataProgress = true
        await Promise.all(Object.keys(this.file).map(this.selectImportType))
        this.importDataProgress = false

        this.closeDialog()
        this.showNotification({
          message: 'Successfully imported your plant data!'
        })
        this.$router.push('/')
      },

      async deleteApplicationData () {
        this.deleteAllDataProgress = true
        await this.deleteAllData()
        this.deleteAllDataProgress = false

        this.closeDialog()
        this.showNotification({
          message: 'Successfully deleted all your data.'
        })
        this.$router.push('/')
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

  .download-section,
  .import-section {
    margin: var(--base-gap);
  }

  @media (--min-desktop-viewport) {
    .download-section,
    .import-section {
      width: 50%;
      margin: 0 var(--base-gap);
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
    --danger-zone-color: var(--text-color-inverse);

    padding-top: calc(var(--base-gap) * 1.5);
    padding-bottom: calc(var(--base-gap) * 1.5);
    background: var(--brand-red);
    color: var(--danger-zone-color);

    @nest html[data-theme="dark"] & {
      --danger-zone-color: var(--text-color-base);
    }

    @media (--min-desktop-viewport) {
      border-radius: var(--border-radius);
      width: 50%;
    }

    & h2 {
      color: var(--danger-zone-color);
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
