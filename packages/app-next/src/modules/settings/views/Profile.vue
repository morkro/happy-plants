<template>
  <v-layout>
    <app-header return-to="/settings">Profile</app-header>

    <main>
      <form @submit.prevent="updateProfile">
        <label-group
          id="profile-name"
          label="Your name"
          :error="error.el === 'name' && error.message"
        >
          <template v-slot="{ label }">
            <v-input
              type="text"
              id="profile-name"
              v-model="name"
              :placeholder="_displayName"
              :aria-describedby="label"
              :aria-invalid="error.el === 'name'"
              :error="error.el === 'name'"
              :error-message="error.message"
              data-cy="profile-form-name"
            />
          </template>
        </label-group>

        <v-button type="submit" data-cy="profile-form-submit">
          <feather-loader v-if="updateProgress" />Save
        </v-button>
      </form>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { mapActions, mapState } from 'vuex'
  import { UserState } from '@/modules/user/store/state'
  import setErrorMessage from '../../../utils/setErrorMessage'

  interface ProfileMapState {
    _displayName: string
    _photoURL: string
  }

  export default (Vue as VueConstructor<Vue & ProfileMapState>).extend({
    name: 'SettingsProfile',
    components: {
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        name: null,
        photo: null,
        updateProgress: false,
        error: { el: null, message: null },
      }
    },
    computed: {
      ...mapState<UserState>({
        _displayName: (state: UserState) => state.displayName,
        _photoURL: (state: UserState) => state.photoURL,
      }),
    },
    methods: {
      ...mapActions({ update: 'user/updateProfile' }),
      updateProfile() {
        if (!this.name) return
        this.updateProgress = true
        try {
          this.update({
            displayName: this.name || this._displayName,
            photoURL: this.photo || this._photoURL,
          })
        } catch (error) {
          this.error = setErrorMessage(error)
        } finally {
          this.updateProgress = false
        }
      },
    },
  })
</script>
