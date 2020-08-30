<template>
  <v-layout class="screen-settings-featurerequest">
    <app-header return-to="/settings" color="white">Feature request</app-header>

    <main>
      <form @submit.prevent="submitFeatureRequest">
        <label-group
          id="featurerequest-description"
          label="What kind of feature do you want to request?"
          color="green"
        >
          <template v-slot="{ label }">
            <v-textarea
              required
              id="featurerequest-description"
              v-model="description"
              :aria-describedby="label"
              :aria-invalid="error.el === 'description'"
              :error="error.el === 'description'"
            />
          </template>
        </label-group>

        <v-button :disabled="!this.description" :aria-disabled="!this.description">
          <feather-loader v-if="progress" />Submit feature request
        </v-button>
      </form>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { mapState, mapActions } from 'vuex'
  import { v4 as uuid } from 'uuid'
  import { RootState } from '@/store'
  import { addFeatureRequest } from '@/services/firebase'
  import { getDeviceInfo } from '@/utils/getDeviceInfo'
  import setErrorMessage from '@/utils/setErrorMessage'
  import logger from '@/utils/vueLogger'
  import config from '@/config'

  interface FeatureRequestState {
    userID: string
    userEmail: string
  }

  export default (Vue as VueConstructor<Vue & FeatureRequestState>).extend({
    name: 'BugReport',
    components: {
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        description: null,
        error: { el: null, message: null },
        progress: false,
      }
    },
    computed: {
      ...mapState<RootState>({
        userID: (state: RootState) => state.account.uid,
        userEmail: (state: RootState) => state.account.email,
      }),
    },
    methods: {
      ...mapActions({
        showNotification: 'notifications/show',
      }),
      async submitFeatureRequest(): Promise<void> {
        this.progress = true
        try {
          await addFeatureRequest(uuid(), {
            deviceInfo: getDeviceInfo(),
            appVersion: config.version,
            description: this.description,
            reportedBy: {
              userId: this.userID,
              email: this.userEmail,
            },
            created: Date.now(),
            modified: Date.now(),
          })

          this.showNotification({
            type: 'info',
            message: 'Thank you!',
          })

          this.description = null
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
  .screen-settings-featurerequest #app-header {
    background: var(--brand-green);
  }

  .screen-settings-featurerequest main {
    justify-content: flex-start !important;
    padding-top: var(--base-gap) !important;
  }

  .screen-settings-featurerequest form {
    width: 100%;

    & textarea {
      width: 100%;
      height: 20vh;
    }

    & button svg {
      animation: spin 3s linear infinite;
    }
  }
</style>
