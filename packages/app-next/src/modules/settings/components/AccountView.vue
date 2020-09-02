<template>
  <v-layout class="screen-settings-account">
    <app-header return-to="/settings">Update profile</app-header>

    <app-dialog
      id="dialog-account-delete"
      :show="showDeleteAccount"
      @close-dialog="toggleDialog(false)"
    >
      <template v-slot:headline>Delete account</template>

      <v-text color="special">Are you sure you want to delete your account?</v-text>
      <div class="dialog-account-delete-actions">
        <v-button border color="white" @click.native="deleteAccount">
          <feather-loader v-if="deleteProgress" />Yes, delete my account
        </v-button>
      </div>
    </app-dialog>

    <main>
      <form class="settings-account-form" @submit.prevent="updateAccount">
        <div class="form-profile">
          <label-group
            id="settings-account-name"
            label="Your name"
            color="green"
            :error="error.el === 'name' && error.message"
          >
            <template v-slot="{ label }">
              <v-input
                type="text"
                v-model="name"
                :placeholder="currentName"
                id="settings-account-name"
                :aria-describedby="label"
                :error="error.el === 'name'"
                :error-message="error.message"
                :aria-invalid="error.el === 'name'"
                data-cy="settings-account-name"
              />
            </template>
          </label-group>

          <label-group
            id="settings-account-photo"
            label="Your current photo"
            color="green"
            :error="error.el === 'photo' && error.message"
          >
            <template v-slot="{ label }">
              <file-upload
                id="settings-account-photo"
                :preview="currentPhotoURL"
                @file-selected="getFile"
                @has-error="assignFileUploadError"
                :error="error.el === 'photo'"
                :aria-describedby="label"
              />
            </template>
          </label-group>
        </div>

        <label-group
          id="settings-account-email"
          label="Your email"
          color="green"
          :error="error.el === 'email' && error.message"
        >
          <template v-slot="{ label }">
            <v-input
              type="text"
              v-model="email"
              :placeholder="currentEmail"
              :disabled="!currentEmail"
              id="settings-account-email"
              :aria-describedby="label"
              :error="error.el === 'email'"
              :error-message="error.message"
              :aria-invalid="error.el === 'email'"
              data-cy="settings-account-email"
            />
          </template>
        </label-group>

        <v-button type="submit">
          <feather-loader v-if="progress" />
          {{ ' ' }} Update profile
        </v-button>
      </form>

      <div class="account-dangerzone">
        <v-text color="special" type="subtitle">
          <feather-alert />
          {{ ' ' }} Danger zone
        </v-text>
        <v-text color="special">
          Deleting your account will remove all your personal information (name, email) and plant
          data. This step can't be reversed.
        </v-text>
        <v-button color="yellow" @click.native="toggleDialog(true)">Delete account</v-button>
      </div>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { mapState, mapActions } from 'vuex'
  import { RootState } from '@/store'
  import logger from '@/utils/vueLogger'
  import setErrorMessage from '@/utils/setErrorMessage'

  // TODO: Move account deletion to new page Account settings

  interface SettingsAccountMapState {
    currentName: string | null
    currentPhotoURL: string | null
    currentEmail: string | null
  }

  export default (Vue as VueConstructor<Vue & SettingsAccountMapState>).extend({
    name: 'SettingsAccount',
    components: {
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
      'feather-alert': () =>
        import('vue-feather-icons/icons/AlertTriangleIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        name: null,
        newPhotoFile: null,
        email: null,
        password: null,
        error: { el: null, message: null },
        progress: false,
        deleteProgress: false,
        showDeleteAccount: this.$hasQuery('delete-account'),
      }
    },
    computed: {
      ...mapState<RootState>({
        currentName: (state: RootState) => state.account.displayName,
        currentPhotoURL: (state: RootState) => state.account.photoURL,
        currentEmail: (state: RootState) => state.account.email,
      }),
    },
    methods: {
      ...mapActions({
        updateProfile: 'account/updateProfile',
        showNotification: 'notifications/show',
      }),
      async updateAccount() {
        const newPhotoURL: string = null // do something with it

        this.progress = true
        try {
          await this.updateProfile({
            displayName: this.name || this.currentName,
            photoURL: newPhotoURL || this.currentPhotoURL,
          })
          this.showNotification({
            type: 'info',
            message: 'Your information has been updated.',
          })
        } catch (error) {
          logger(error.message, true)
          this.error = setErrorMessage(error)
        } finally {
          this.progress = false
        }
      },
      getFile(file: File) {
        this.error = { el: null, message: null }
        this.newPhotoFile = file
      },
      assignFileUploadError(message: string) {
        this.error.el = 'photo'
        this.error.message = message
      },
      toggleDialog(show: boolean) {
        this.showDeleteAccount = show

        if (show) {
          this.$router.push({ path: '/settings/account', query: { 'delete-account': null } })
        } else {
          this.$router.push('/settings/account')
        }
      },
      deleteAccount() {
        this.deleteProgress = true
        console.log('delete account')
      },
    },
  })
</script>

<style lang="postcss">
  .screen-settings-account {
    & main {
      padding: 0 !important;
      justify-content: flex-start;
    }
  }

  .settings-account-form {
    width: 100%;
    padding: 0 var(--base-gap);
  }

  .account-dangerzone {
    margin-top: var(--base-gap);
    width: 100%;
    background: var(--brand-red);
    padding: var(--base-gap);

    & .subtitle {
      display: flex;
      align-items: center;

      & svg {
        margin-right: calc(0.5 * var(--base-gap));
      }
    }

    & > .text {
      margin-bottom: var(--base-gap);
    }
  }

  #dialog-account-delete {
    & .app-dialog-element {
      background: var(--brand-red);
      color: var(--brand-white);
    }

    & #dialog-account-delete-title {
      color: var(--brand-white);
    }

    & .app-dialog-close-btn {
      --background: var(--brand-yellow);
      --shadow: var(--brand-black-50);
      color: var(--brand-green);
    }

    & .dialog-account-delete-actions {
      padding-top: var(--base-gap);

      & .btn {
        width: 100%;
      }

      & svg {
        animation: spin 3s linear infinite;
      }
    }
  }
</style>
