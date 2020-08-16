<template>
  <v-layout class="screen-settings-bugreport">
    <app-header return-to="/settings">Bug report</app-header>

    <main>
      <form @submit.prevent="submitBugReport">
        <label-group id="bugreport-description" label="Please describe the bug you're facing.">
          <template v-slot="{ label }">
            <textarea
              required
              id="bugreport-description"
              v-model="description"
              :aria-describedby="label"
              :aria-invalid="error.el === 'description'"
              :error="error.el === 'description'"
            >
              Please describe the bug you're facing.
            </textarea>
          </template>
        </label-group>

        <label-group
          id="bugreport-screenshot"
          label="You can upload a screenshot of the bug you're having."
          :error="error.el === 'screenshot' && error.message"
        >
          <template v-slot="{ label }">
            <file-upload
              id="bugreport-screenshot"
              @file-selected="getFile"
              :aria-describedby="label"
            />
          </template>
        </label-group>

        <v-button :disabled="!this.description" :aria-disabled="!this.description">
          <feather-loader v-if="progress" />
          {{ ' ' }}Submit bug report
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
  import { addBugReport } from '@/services/firebase'
  import { getDeviceInfo } from '@/utils/getDeviceInfo'
  import setErrorMessage from '@/utils/setErrorMessage'
  import logger from '@/utils/vueLogger'

  interface BugReportState {
    userID: string
  }

  export default (Vue as VueConstructor<Vue & BugReportState>).extend({
    name: 'BugReport',
    components: {
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        description: null,
        file: null,
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
      async submitBugReport(): Promise<void> {
        this.progress = true
        try {
          await addBugReport(uuid(), {
            deviceInfo: getDeviceInfo(),
            appVersion: '2.0.0',
            description: this.description,
            screenshot: this.file,
            reportedBy: {
              userId: this.userID,
              email: this.userEmail,
            },
            created: Date.now(),
            modified: Date.now(),
          })
          this.showNotification({
            type: 'info',
            message: 'Thank you for reporting this bug!',
          })
        } catch (error) {
          logger(error.message, true)
          this.error = setErrorMessage(error)
        } finally {
          this.progress = false
        }
      },
      getFile(file: File): void {
        this.file = file
      },
    },
  })
</script>

<style lang="postcss">
  .screen-settings-bugreport form {
    & button svg {
      animation: spin 3s linear infinite;
    }
  }
</style>
