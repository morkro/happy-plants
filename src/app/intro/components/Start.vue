<template>
  <div class="start-wrapper">
    <v-button @click.native="nextStep" :disabled="disabled">
      <feather-right slot="icon" />
      <span>Start introduction</span>
    </v-button>

    <div class="start-login">
      <p>Already have an account?</p>

      <auth-provider-list
        :loading="authFromRedirect"
        :disabled="disabled"
        @provider-selected="loginUser"
      />
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'IntroStart',

    components: {
      'feather-right': () =>
        import('vue-feather-icons/icons/ArrowRightIcon' /* webpackChunkName: "icons" */)
    },

    computed: {
      ...mapState({
        authFromRedirect: state => state.user.authFromRedirect,
        authProgress: state => state.user.loading,
        authenticated: state => state.user.authenticated,
        plants: state => state.plants.data
      }),
      disabled () {
        return (
          this.authFromRedirect ||
          this.authProgress ||
          this.signInProgress
        )
      }
    },

    data: () => ({
      signInProgress: false
    }),

    watch: {
      authenticated (auth) {
        if (auth) {
          this.$router.push('/')
        }
      }
    },

    methods: {
      ...mapActions([
        'signInUser',
        'loadPlants',
        'loadTags',
        'showNotification'
      ]),

      nextStep () {
        if (this.signInProgress) return
        this.$router.push('/intro/storage')
      },

      async loginUser (provider) {
        this.signInProgress = true
        try {
          await this.signInUser(provider)
        } catch (error) {
          this.showNotification()
          return
        }
        this.signInProgress = false

        await this.loadPlants()
        await this.loadTags()

        if (!this.plants.length) {
          this.$router.push('/intro/howto')
        } else {
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style lang="postcss">
  .start-wrapper {
    display: flex;
    flex-direction: column;

    & button {
      align-self: center;
    }
  }

  .start-login {
    margin-top: var(--double-gap);
    display: flex;
    justify-content: center;
    flex-direction: column;

    & p {
      text-align: center;
      font-size: var(--text-size-small);
      margin-bottom: calc(var(--base-gap) / 2);
      color: var(--text-color-secondary);
    }

    & p,
    & button {
      align-self: center;
    }
  }
</style>
