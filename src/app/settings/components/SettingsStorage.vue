<template>
  <div class="settings-storage">
    <p>
      You're currently using the <strong>{{ storageType }}</strong> option.
    </p>

    <div class="storage-switch">
      <div class="storage-local box">
        <h3>
          <feather-smartphone />
          Use local only
        </h3>
        <p>
          Using the local storage option saves all your data on your device only.
          Some functionality won't be available.
        </p>

        <p v-if="isStorageType('cloud')" class="storage-info">
          It's currently not possible to migrate from cloud to local storage.
        </p>

        <v-button :disabled="true" @click.native="switchStorageType('local')">
          <span v-if="isStorageType('local')">Currently activated</span>
          <span v-else>Activate local</span>
        </v-button>
      </div>

      <div class="storage-cloud box">
        <h3>
          <feather-cloud />
          Use cloud storage
        </h3>
        <p>
          The cloud storage saves all your data in <strong>Firebase Cloud Firestore</strong> by Google.
          This enables you to access your account from different devices.
        </p>
        <v-button :disabled="isStorageType('cloud')" @click.native="openDialog">
          <span v-if="isStorageType('cloud')">Currently activated</span>
          <span v-else>Activate cloud</span>
        </v-button>
      </div>
    </div>

    <storage-dialog
      id="storage-dialog"
      app-root=".settings-storage"
      :show="showCloudDialog"
      @close-dialog="closeDialog">
      <span slot="headline">Activate cloud option</span>

      <div>
        <p>
          Activating the cloud option will prompt you to sign in with a Google account.
        </p>
        <p>
          After that has successfully happened, a dialog will show the progress of uploading
          your current plant data to Firebase.
        </p>

        <v-button @click.native="switchStorageType('cloud')">
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

  export default {
    name: 'SettingsStorage',

    components: {
      'v-button': Button,
      'storage-dialog': HappyDialog,
      'feather-cloud': () =>
        import('vue-feather-icons/icons/CloudIcon' /* webpackChunkName: "icons" */),
      'feather-smartphone': () =>
        import('vue-feather-icons/icons/SmartphoneIcon' /* webpackChunkName: "icons" */)
    },

    computed: mapState({
      storageType: state => state.storage.type,
      authenticated: state => state.user.authenticated
    }),

    data: () => ({
      showCloudDialog: false
    }),

    methods: {
      ...mapActions([
        'updateStorage',
        'signInUser',
        'signOutUser',
        'showNotification'
      ]),
      isStorageType (type) {
        return this.storageType === type
      },
      async switchStorageType (type) {
        let authMethod = null

        if (type === 'local' && this.authenticated) {
          authMethod = this.signOutUser
        } else if (type === 'cloud' && !this.authenticated) {
          authMethod = this.signInUser
        }

        try {
          await authMethod()
          await this.updateStorage({ type })
        } catch (error) {
          this.showNotification()
        }
      },
      openDialog () {
        this.showCloudDialog = true
      },
      closeDialog () {
        this.showCloudDialog = false
      }
    }
  }
</script>

<style lang="postcss" scoped>
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
    }

    & h3 {
      display: flex;
      align-items: center;
    }

    & svg {
      margin-right: calc(var(--base-gap) / 2);
    }

    & p {
      margin: var(--base-gap) 0;
    }

    & .storage-info {
      font-style: italic;
    }

    & button {
      width: 100%;
    }
  }

  #storage-dialog .happy-dialog-content p {
    margin-bottom: var(--base-gap);
  }
</style>
