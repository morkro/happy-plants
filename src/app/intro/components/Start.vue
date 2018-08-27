<template>
  <div class="start-wrapper">
    <v-button @click="nextStep" :disabled="signInProgress">
      <feather-right slot="icon" />
      <span>Start introduction</span>
    </v-button>

    <div class="start-login">
      <p>Already have an account?</p>

      <v-button
        color="plain"
        :loading="signInProgress"
        :disabled="signInProgress"
        @click.native="loginUser">
        <feather-login slot="icon" />
        <span>Login</span>
      </v-button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import Button from '@/components/Button'

  export default {
    name: 'IntroStart',

    components: {
      'v-button': Button,
      'feather-right': () =>
        import('vue-feather-icons/icons/ArrowRightIcon' /* webpackChunkName: "icons" */),
      'feather-login': () =>
        import('vue-feather-icons/icons/LogInIcon' /* webpackChunkName: "icons" */)
    },

    computed: mapState({
      plants: state => state.plants.data
    }),

    data: () => ({
      signInProgress: false
    }),

    methods: {
      ...mapActions([
        'signInUser',
        'loadPlants',
        'loadTags'
      ]),

      nextStep () {
        if (this.signInProgress) return
        this.$router.push('/intro/storage')
      },

      async loginUser () {
        this.signInProgress = true
        try {
          await this.signInUser()
        } catch (error) {
          // @TODO Implement failed login behaviour.
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

<style lang="postcss" scoped>
  .start-wrapper {
    display: flex;
    flex-direction: column;
  }

  .start-login {
    margin-top: calc(2 * var(--base-gap));
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
