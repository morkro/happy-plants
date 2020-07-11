<template>
  <v-layout>
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
            >Please describe the bug you're facing.</textarea>
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

        <v-button>Submit bug report</v-button>
      </form>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { getDeviceInfo } from '@/utils/getDeviceInfo'

  export default Vue.extend({
    name: 'BugReport',
    data() {
      return {
        description: null,
        file: null,
        error: { el: null, message: null },
      }
    },
    methods: {
      submitBugReport(): void {
        const deviceInfo = getDeviceInfo()
        const appVersion = ''
        console.log('submit', {
          deviceInfo,
          appVersion,
          description: this.description,
          file: this.file,
        })
      },
      getFile(file: File): void {
        this.file = file
      },
    },
  })
</script>
