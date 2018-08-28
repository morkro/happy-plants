<template>
  <div class="settings-storage">
    <h2>Decide where your data is hosted</h2>
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
        </p>
        <v-button :disabled="isStorageType('local')" @click.native="switchStorageType('local')">
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
        </p>
        <v-button :disabled="isStorageType('cloud')" @click.native="switchStorageType('cloud')">
          <span v-if="isStorageType('cloud')">Currently activated</span>
          <span v-else>Activate cloud</span>
        </v-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Button from '@/components/Button'

  export default {
    name: 'SettingsStorage',

    components: {
      'v-button': Button,
      'feather-cloud': () =>
        import('vue-feather-icons/icons/CloudIcon' /* webpackChunkName: "icons" */),
      'feather-smartphone': () =>
        import('vue-feather-icons/icons/SmartphoneIcon' /* webpackChunkName: "icons" */)
    },

    computed: mapState({
      storageType: state => state.storage.type,
      authenticated: state => state.user.authenticated
    }),

    methods: {
      ...mapActions([
        'updateStorage',
        'signInUser',
        'signOutUser'
      ]),
      isStorageType (type) {
        return this.storageType === type
      },
      switchStorageType (type) {
        this.updateStorage({ type })
          .then(() => {
            if (type === 'local' && this.authenticated) {
              this.signOutUser()
            } else if (type === 'cloud' && !this.authenticated) {
              this.signInUser()
            }
          })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .settings-storage {
    padding: var(--base-gap);

    & h2 {
      margin-bottom: var(--base-gap);
    }
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

    & button {
      width: 100%;
    }
  }
</style>
