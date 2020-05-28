<template>
  <v-layout class="screen-login">
    <v-loading v-if="loginRedirect" message="login" />

    <app-header return-to="/welcome">Login</app-header>

    <main>
      <form class="login-form" @submit.prevent="login('email')">
        <label-group
          id="login-email"
          label="Your e-mail *"
          :error="error.el === 'email' && error.message"
        >
          <template v-slot="{ label }">
            <v-input
              required
              type="email"
              placeholder="lover@plants.garden"
              id="login-email"
              v-model="email"
              :aria-describedby="label"
              :aria-invalid="error.el === 'email'"
              :error="error.el === 'email'"
              :error-message="error.message"
            />
          </template>
        </label-group>

        <label-group
          id="login-pw"
          label="Your e-mail *"
          :error="error.el === 'password' && error.message"
        >
          <template v-slot="{ label }">
            <v-input
              type="password"
              v-model="password"
              required
              placeholder="********"
              id="login-pw"
              :aria-describedby="label"
              :error="error.el === 'password'"
              :error-message="error.message"
              :aria-invalid="error.el === 'password'"
            />
          </template>
        </label-group>

        <v-button color="yellow" type="submit">Login</v-button>
      </form>

      <div class="login-form-separator">
        <v-text color="special">or login with</v-text>
        <hr />
      </div>

      <div class="login-services">
        <v-button border @click.native="login('google')">
          <feather-chrome />Google
        </v-button>
        <v-button border @click.native="login('github')">
          <feather-github />GitHub
        </v-button>
        <v-button border @click.native="login('twitter')">
          <feather-twitter />Twitter
        </v-button>
      </div>
    </main>

    <footer>
      <v-text small color="special">About</v-text>
      <v-text small color="special">Contact</v-text>
      <v-text small color="special">Open Source</v-text>
    </footer>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import { getSessionEntry, deleteSessionEntry } from '@/services/sessionStorage'
  import delay from '@/utils/promiseDelay'
  import setErrorMessage from '@/utils/setErrorMessage'
  import { LoginType } from '@/modules/user/store/actions'

  export default Vue.extend({
    name: 'Login',
    components: {
      'feather-chrome': () =>
        import('vue-feather-icons/icons/ChromeIcon' /* webpackChunkName: "icons" */),
      'feather-github': () =>
        import('vue-feather-icons/icons/GithubIcon' /* webpackChunkName: "icons" */),
      'feather-twitter': () =>
        import('vue-feather-icons/icons/TwitterIcon' /* webpackChunkName: "icons" */),
    },
    data: () => ({
      loginRedirect: false,
      email: null,
      password: null,
      error: { el: null, message: null },
      loading: false,
    }),
    methods: {
      ...mapActions({
        signInUser: 'user/signInUser',
        authRedirectResults: 'user/authRedirectResults',
      }),
      async login(type: LoginType): Promise<void> {
        this.error.el = null
        this.error.message = null

        try {
          await this.signInUser({
            type,
            email: this.email,
            password: this.password,
          })
        } catch (error) {
          this.error = setErrorMessage(error)
        }
      },
    },
    async created() {
      if (getSessionEntry('USER_SIGNIN_PROGRESS')) {
        deleteSessionEntry('USER_SIGNIN_PROGRESS')
        this.loginRedirect = true
        await Promise.all([this.authRedirectResults(), delay(4000)])
        this.$router.push('/home')
      }
    },
    beforeDestroy() {
      this.loginRedirect = false
    },
  })
</script>

<style lang="postcss" scoped>
  .screen-login {
    background-color: var(--brand-green);
    background-image: url(../assets/login-illustration.svg);
    background-repeat: no-repeat;
    background-position: top left;
    background-size: calc(100% - var(--base-gap) * 4) auto;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    width: 100%;

    & .btn.yellow {
      box-shadow: 0 1px 2px var(--brand-green-dark);
    }
  }

  .login-form-separator {
    display: block;
    margin: calc(2 * var(--base-gap)) 0;
    position: relative;
    width: 100%;
    text-align: center;

    & .text {
      position: relative;
      z-index: 1;
      background: var(--brand-green);
      display: inline-block;
      padding: 0 var(--base-gap);
    }

    & hr {
      border: none;
      border-top: 2px solid var(--brand-green-dark);
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-1px);
    }
  }

  .login-services {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: var(--base-gap);

    & button {
      width: 100%;
    }
  }

  .screen-login footer {
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--brand-white);

    & .text:not(:last-of-type) {
      margin-right: calc(var(--base-gap) * 2);
    }
  }
</style>
