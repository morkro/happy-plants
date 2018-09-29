<template>
  <div class="settings-storage">
    <div class="storage-switch">
      <div :class="getStorageClass('local')">
        <h3>
          <feather-smartphone />
          Store data on your phone
        </h3>
        <p>
          All your data will be stored on your device only. Some functionality won't be available.
          <br><br>
          When switching to local from cloud storage, all <strong>data will be migrated</strong> and
          <strong>deleted from your cloud account</strong>.
        </p>
        <v-button v-if="isStorageType('cloud')" @click.native="openDialog('local')">
          <span>Use device storage</span>
        </v-button>
      </div>

      <div :class="getStorageClass('cloud')">
        <h3>
          <feather-cloud />
          Store data in the cloud
        </h3>
        <p>
          All your data will be stored in <strong>Google Firebase</strong>.
          This enables you to access your account from different devices.
          <br><br>
          When switching to cloud storage, all your data will be migrated and deleted from your device.
        </p>
        <v-button v-if="isStorageType('local')" @click.native="openDialog('cloud')">
          <span>Use cloud storage</span>
        </v-button>
      </div>
    </div>

    <storage-dialog
      id="storage-dialog"
      app-root=".settings-storage"
      :show="showCloudDialog"
      @close-dialog="closeDialog">
      <span slot="headline">Migrate data to {{ storageTypeName }}</span>

      <div>
        <div v-if="migrationProgress || migrationFinished" class="dialog-migration-progress">
          <p>
            <feather-check v-if="migrationFinished" />
            <feather-loader v-else class="rotate" />
            {{ migrationMessage }}
          </p>
        </div>

        <div v-if="selectedType === 'local' && !migrationProgress">
          <p>
            <span class="dialog-caution">
              <strong>Caution:</strong> This will delete all your cloud data!
            </span>
          </p>
          <p>
            This process may take a few minutes,
            depending on the amount of data that has to be migrated.
          </p>
        </div>

        <div v-if="selectedType === 'cloud' && !migrationProgress">
          <p>
            Activating the cloud option will prompt you to sign in with a Google account.
          </p>
          <p>
            After that has successfully happened, a dialog will show the progress of uploading
            your current plant data to Firebase.
          </p>
        </div>

        <v-button v-if="!migrationProgress" @click.native="switchStorageType(selectedType)">
          I understand, let's go
        </v-button>
      </div>
    </storage-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Button from '@/components/Button'
  import HappyDialog from '@/components/HappyDialog'
  import sleep from '@/utils/sleep'

  export default {
    name: 'SettingsStorage',

    components: {
      'v-button': Button,
      'storage-dialog': HappyDialog,
      'feather-cloud': () =>
        import('vue-feather-icons/icons/CloudIcon' /* webpackChunkName: "icons" */),
      'feather-smartphone': () =>
        import('vue-feather-icons/icons/SmartphoneIcon' /* webpackChunkName: "icons" */),
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
      'feather-check': () =>
        import('vue-feather-icons/icons/CheckIcon' /* webpackChunkName: "icons" */)
    },

    computed: {
      ...mapState({
        storageType: state => state.storage.type,
        migrationProgress: state => state.storage.migrationMode,
        authenticated: state => state.user.authenticated,
        plants: state => state.plants.data,
        tags: state => state.tags.data
      }),
      storageTypeName () {
        return this.selectedType === 'local'
          ? 'device'
          : this.selectedType
      }
    },

    data: () => ({
      selectedType: null,
      showCloudDialog: false,
      migrationFinished: false,
      migrationMessage: null
    }),

    methods: {
      ...mapActions([
        'updateStorage',
        'startDataMigration',
        'endDataMigration',
        'signInUser',
        'signOutUser',
        'showNotification',
        'addPlant',
        'loadPlants',
        'deletePlants',
        'loadTags',
        'deleteTags',
        'addTag'
      ]),
      getStorageClass (type) {
        return [`storage-${type}`, 'box', {
          green: this.isStorageType(type)
        }]
      },
      isStorageType (type) {
        return this.storageType === type
      },
      async migrateDataLocal () {
        this.migrationMessage = '1/5 Downloading all data...'
        await this.loadPlants()
        await this.loadTags()

        this.migrationMessage = '2/5 Deleting data from cloud...'
        await this.deletePlants(this.plants)
        for (const tag of this.tags) {
          await this.deleteTag(tag)
        }

        this.migrationMessage = '3/5 Updating data for device usage...'
        // TODO: Here we should clean up the data for
        // modules that aren't supported in device storage mode.
        await sleep(500)
        this.updateStorage({ type: 'local' })

        this.migrationMessage = '4/5 Adding data to device...'
        for (const plant of this.plants) {
          await this.addPlant(plant)
        }
        for (const tag of this.tags) {
          await this.addTag(tag)
        }
        // Create new photos here

        this.migrationMessage = '5/5 Logging you out of your account...'
        await this.signOutUser()
      },
      async migrateDataCloud () {
        await this.signInUser()

        this.migrationMessage = '1/4 Updating data for cloud usage...'
        await sleep(500) // FIXME
        this.migrationMessage = '2/4 Uploading data...'
        await sleep(500) // FIXME
        this.migrationMessage = '3/4 Uploading photos...'
        await sleep(4000) // FIXME
        this.migrationMessage = '4/4 Deleting data from device...'
        await sleep(5000) // FIXME
      },
      async switchStorageType (type) {
        this.startDataMigration()

        try {
          if (type === 'local') {
            await this.migrateDataLocal()
          } else if (type === 'cloud') {
            await this.migrateDataCloud()
          }

          this.migrationFinished = true
          this.migrationMessage = 'Migration successful!'
        } catch (error) {
          this.migrationFinished = true
          this.migrationMessage = 'Migration failed!'
          this.showNotification()
        }

        this.endDataMigration()
      },
      openDialog (storageType) {
        this.selectedType = storageType
        this.showCloudDialog = true
      },
      closeDialog () {
        this.migrationFinished = false
        this.migrationMessage = null
        this.selectedType = null
        this.showCloudDialog = false
      }
    }
  }
</script>

<style lang="postcss" scoped>
  @import "../../../styles/animations";

  .settings-storage {
    padding: var(--base-gap);
  }

  .storage-switch {
    margin-top: var(--base-gap);
    width: 100%;

    & > div {
      width: 100%;
      padding: var(--base-gap);
      margin-bottom: calc(2 * var(--base-gap));
      position: relative;

      &.green {
        overflow: unset;
        padding-top: calc(1.5 * var(--base-gap));
      }

      &.green::after {
        --button-shadow: var(--brand-yellow-medium);
        content: "Active";
        position: absolute;
        top: 0;
        left: var(--base-gap);
        padding: calc(var(--base-gap) / 6) calc(var(--base-gap) / 2);
        background: var(--brand-yellow);
        border-radius: var(--border-radius);
        transform: translateY(-50%);
        font-size: var(--text-size-xsmall);
        box-shadow: 0 2px 9px var(--button-shadow);
      }
    }

    & h3 {
      display: flex;
      align-items: center;
    }

    & svg {
      margin-right: calc(var(--base-gap) / 2);
    }

    & p {
      margin-top: var(--base-gap);
    }

    & .storage-info {
      font-style: italic;
    }

    & button {
      margin-top: var(--base-gap);
      width: 100%;
    }
  }

  #storage-dialog .happy-dialog-content {
    & .dialog-caution {
      background: var(--brand-red);
      color: var(--text-color-inverse);
      width: 100%;
      padding: calc(var(--base-gap) / 4) calc(var(--base-gap) / 2);
      border-radius: var(--border-radius);
      display: inline-block;
      box-shadow: 0 2px 9px var(--brand-red-low);
    }

    & .dialog-migration-progress {
      & p {
        display: flex;
        align-items: center;
        margin: 0;
      }

      & svg {
        margin-right: calc(var(--base-gap) / 2);
        transform-origin: center center;

        &.rotate {
          animation: rotate360 4s linear infinite;
        }
      }
    }

    & p {
      margin-bottom: var(--base-gap);
    }
  }
</style>
