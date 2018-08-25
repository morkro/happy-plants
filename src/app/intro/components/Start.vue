<template>
  <div class="start-wrapper">
    <router-link to="/intro/storage" class="btn">
      <div class="button-icon">
        <feather-right />
      </div>
      <span>Start introduction</span>
    </router-link>

    <div class="start-login">
      <p>Already have an account?</p>

      <v-button @click.native="loginUser" color="plain">
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
      authenticated: state => state.user.authenticated,
      plants: state => state.plants.data
    }),

    methods: {
      ...mapActions([
        'signInUser'
      ]),

      loginUser () {
        this.signInUser()
          .then(() => {
            // @TODO Implement failed login behaviour.
            if (!this.authenticated) return

            if (!this.plants.length) {
              this.$router.push('/intro/howto')
            } else {
              this.$router.push('/')
            }
          })
      }
    }
  }
</script>

<style lang="postcss" scoped>
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
