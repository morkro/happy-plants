<template>
  <v-layout class="screen-login">
    <v-loading v-if="loginRedirect" message="login" />

    <app-header return-to="/welcome">Login</app-header>

    <main>
      <form class="login-form">
        <label-group
          id="email"
          label="Your e-mail *"
          :error="error.el === 'email' && error.message"
        >
          <template v-slot="{ label }">
            <v-input
              required
              type="email"
              placeholder="lover@plants.garden"
              id="email"
              v-model="email"
              autocomplete="username"
              :aria-describedby="label"
              :aria-invalid="error.el === 'email'"
              :error="error.el === 'email'"
              :error-message="error.message"
              data-cy="login-form-email"
            />
          </template>
        </label-group>

        <label-group
          id="password"
          label="Your password *"
          :error="error.el === 'password' && error.message"
          v-if="!showForgotPassword"
        >
          <template v-slot="{ label }">
            <v-input
              :type="showPasswordPlain ? 'text' : 'password'"
              v-model="password"
              :required="!showForgotPassword"
              placeholder="********"
              id="password"
              autocomplete="current-password"
              :aria-describedby="label"
              :error="error.el === 'password'"
              :error-message="error.message"
              :aria-invalid="error.el === 'password'"
              data-cy="login-form-password"
            />
            <button
              class="login-form-toggle-password"
              @click.prevent="togglePlainPassword"
              :aria-label="showPasswordPlain ? 'Hide your password' : 'Show your password'"
            >
              <component :is="showPasswordPlain ? 'feather-eye-off' : 'feather-eye'" />
              <v-text class="visuallyhidden">{{ passwordPlainLabel }}</v-text>
            </button>
          </template>
        </label-group>

        <router-link
          to="/login?forgotPassword=true"
          @click.native.prevent="toggleResetPassword"
          class="login-form-forgot-pw"
          data-cy="login-form-forgot-pw"
        >
          <v-text color="special" small>{{ togglePasswordReset }}</v-text>
        </router-link>

        <v-button
          color="yellow"
          type="submit"
          data-cy="login-form-submit"
          @click.native.prevent="formAction"
        >
          <feather-loader v-if="sendForgotPassword" />
          {{ submitBtnLabel }}
        </v-button>
      </form>

      <div class="login-form-separator">
        <v-text color="special">or login with</v-text>
        <hr />
      </div>

      <div class="login-services">
        <v-button
          border
          color="white"
          @click.native="login('google')"
          data-cy="form-service-google"
        >
          <feather-chrome />Google
        </v-button>
        <v-button
          border
          color="white"
          @click.native="login('github')"
          data-cy="form-service-github"
        >
          <feather-github />GitHub
        </v-button>
        <v-button
          border
          color="white"
          @click.native="login('twitter')"
          data-cy="form-service-twitter"
        >
          <feather-twitter />Twitter
        </v-button>
      </div>
    </main>

    <footer-no-auth />
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import { LoginType } from '@/modules/account/store/actions'
  import { getSessionEntry, deleteSessionEntry } from '@/services/sessionStorage'
  import { forgotPassword } from '@/services/firebase'
  import setErrorMessage from '@/utils/setErrorMessage'
  import logger from '@/utils/vueLogger'
  import delay from '@/utils/promiseDelay'

  export default Vue.extend({
    name: 'Login',
    components: {
      'feather-chrome': () =>
        import('vue-feather-icons/icons/ChromeIcon' /* webpackChunkName: "icons" */),
      'feather-github': () =>
        import('vue-feather-icons/icons/GithubIcon' /* webpackChunkName: "icons" */),
      'feather-twitter': () =>
        import('vue-feather-icons/icons/TwitterIcon' /* webpackChunkName: "icons" */),
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
      'feather-eye': () => import('vue-feather-icons/icons/EyeIcon' /* webpackChunkName: "icons" */),
      'feather-eye-off': () =>
        import('vue-feather-icons/icons/EyeOffIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        loginRedirect: false,
        email: null,
        password: null,
        error: { el: null, message: null },
        loading: false,
        showPasswordPlain: false,
        showForgotPassword: this.$hasQuery('forgotPassword'),
        sendForgotPassword: false,
      }
    },
    computed: {
      submitBtnLabel(): string {
        return this.showForgotPassword ? 'Send password reset' : 'Login'
      },
      togglePasswordReset(): string {
        return this.showForgotPassword ? 'Show password field again' : 'I forgot my password'
      },
      passwordPlainLabel(): string {
        return this.showPasswordPlain ? 'Hide password' : 'Show password'
      },
    },
    methods: {
      ...mapActions({
        signInUser: 'account/signInUser',
        authRedirectResults: 'account/authRedirectResults',
        showNotification: 'notifications/show',
      }),
      async login(type: LoginType): Promise<void> {
        this.error.el = null
        this.error.message = null
        this.loginRedirect = true

        try {
          await Promise.all([
            this.signInUser({
              type,
              email: this.email,
              password: this.password,
            }),
            delay(4000),
          ])
          this.$router.push('/home')
        } catch (error) {
          this.loginRedirect = false
          this.error = setErrorMessage(error)
        }
      },
      toggleResetPassword() {
        this.showForgotPassword = !this.showForgotPassword

        if (!this.showForgotPassword) {
          this.$router.push({ path: '/login' })
        } else {
          this.$router.push({ path: '/login', query: { forgotPassword: null } })
        }
      },
      async formAction() {
        if (!this.showForgotPassword) {
          await this.login('email')
          return
        }

        this.sendForgotPassword = true
        try {
          await forgotPassword(this.email)
          this.showNotification({
            type: 'info',
            message: 'An email to reset your password has been sent.',
          })
        } catch (error) {
          logger(`formAction() => ${error.message}`, true)
          this.error = setErrorMessage(error)
        } finally {
          this.sendForgotPassword = false
        }
      },
      togglePlainPassword() {
        this.showPasswordPlain = !this.showPasswordPlain
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

<style lang="postcss">
  .screen-login {
    background-color: var(--brand-green);
    background-image: url(../../../assets/green-illustrated-bg.svg);
    background-repeat: no-repeat;
    background-position: top left;
    background-size: calc(100% - var(--base-gap) * 4) auto;

    & #app-header .app-header-icon svg {
      transform: rotate(-90deg);
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    width: 100%;

    & .btn.yellow {
      box-shadow: 0 1px 2px var(--brand-green-dark);
    }

    & .login-form-forgot-pw {
      text-decoration: none;
      display: block;
      width: 100%;
      text-align: right;
      color: var(--brand-white);
      margin-top: calc(-0.5 * var(--base-gap));
      margin-bottom: var(--base-gap);

      &:hover {
        text-decoration: underline;
      }
    }

    & button[type='submit'] svg {
      animation: spin 3s linear infinite;
    }

    & input:focus {
      border-color: var(--brand-yellow);
    }

    & .login-form-toggle-password {
      position: absolute;
      z-index: 1;
      bottom: calc(1.5 * var(--base-gap));
      right: calc(1.5 * var(--base-gap));
      background: transparent;
      border: none;
      color: var(--brand-beige-dark);
      display: flex;

      &:focus,
      &:active {
        color: var(--brand-green-dark);
        outline: none;
      }
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
</style>
