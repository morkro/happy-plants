<template>
  <app-wireframe>
    <app-header v-if="!authProgress" :back-button="true">
      <template v-slot:title>
        <h1>Login</h1>
      </template>
    </app-header>

    <main-content>
      <div v-if="authProgress" class="signin-progress">
        <feather-refresh class="rotate" />
        <h2>Sign in</h2>
      </div>

      <div v-else>
        <form class="form-signin" @submit.prevent="validateForm">
          <form-group for="login-email" :error="$v.email.$error">
            <h2>E-Mail</h2>
            <v-input
              required
              :class="{ invalid: $v.email.$error }"
              autocomplete="email"
              type="text"
              id="login-email"
              placeholder="Email"
              @change="setEmail" />
            <div v-if="!$v.email.email" class="form-group-error">
              <span>You need to use a valid email address.</span>
            </div>
          </form-group>

          <form-group for="login-password">
            <h2>Password</h2>
            <v-input
              required
              autocomplete="current-password"
              type="password"
              id="login-password"
              placeholder="Password"
              @change="setPassword" />
            <div v-if="$v.password.$error" class="form-group-error">
              <span>You have to provide a password to login.</span>
            </div>
          </form-group>

          <v-button
            type="submit"
            :disabled="disabled">
            Sign in
          </v-button>
        </form>

        <div class="login-divider">
          <span>or</span>
          <hr>
        </div>

        <ul class="login-provider-list">
          <li v-for="provider in providerOptions" :key="provider.key">
            <v-button
              color="plain"
              :class="provider.key"
              :loading="selectedProvider === provider.key"
              :disabled="disabled"
              @click.native="selectProvider(provider.key)">
              <template v-slot:icon>
                <component :is="`feather-${provider.key}`" />
              </template>
              <span>{{ provider.label }}</span>
            </v-button>
          </li>
        </ul>
      </div>
    </main-content>
  </app-wireframe>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'Login',

    meta: {
      title: 'Login'
    },

    mixins: [validationMixin],

    components: {
      'feather-twitter': () =>
        import('vue-feather-icons/icons/TwitterIcon' /* webpackChunkName: "icons" */),
      'feather-google': () =>
        import('vue-feather-icons/icons/ChromeIcon' /* webpackChunkName: "icons" */),
      'feather-github': () =>
        import('vue-feather-icons/icons/GithubIcon' /* webpackChunkName: "icons" */),
      'feather-refresh': () =>
        import('vue-feather-icons/icons/RefreshCwIcon' /* webpackChunkName: "icons" */)
    },

    data: () => ({
      disabled: false,
      email: null,
      password: null,
      selectedProvider: null,
      providerOptions: [
        { key: 'twitter', label: 'Twitter' },
        { key: 'google', label: 'Google' },
        { key: 'github', label: 'GitHub' }
      ]
    }),

    computed: {
      ...mapState({
        authProgress: state => (
          state.user.authFromRedirect &&
          state.user.loading
        ),
        authenticated: state => state.user.authenticated
      })
    },

    watch: {
      authenticated (authenticated) {
        if (authenticated) {
          this.$router.push('/')
        }
      }
    },

    validations: {
      email: {
        email
      },
      password: {
        required
      }
    },

    methods: {
      ...mapActions([
        'signInUser'
      ]),
      setEmail (event) {
        if (!event.target.value) return
        this.email = event.target.value
        this.$v.email.$touch()
      },
      setPassword (event) {
        if (!event.target.value) return
        this.password = event.target.value
        this.$v.password.$touch()
      },
      validateForm () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          console.log('cant do it')
        } else {
          console.log('yes submit')
        }
        console.group('login user')
          console.log('email', this.email)
          console.log('password', this.password)
        console.groupEnd()
      },
      async selectProvider (provider) {
        this.disabled = true
        this.selectedProvider = provider
        try {
          await this.signInUser(provider)
        } catch (error) {
          this.showNotification()
          return
        }
        this.disabled = false
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .app-wireframe {
    min-height: 100vh;
    background: var(--background-secondary);

    & .main-content {
      padding: var(--base-gap);
      line-height: 150%;
    }
  }

  .signin-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: var(--background-primary);

    & svg {
      width: calc(var(--icon-size-base) * 2);
      height: calc(var(--icon-size-base) * 2);
      animation: rotate360 3s linear infinite;
      margin-bottom: var(--base-gap);
    }
  }

  .form-signin {
    width: 100%;

    & button {
      width: 100%;
    }
  }

  .login-divider {
    margin: calc(var(--double-gap) * 1.5) 0;
    display: flex;
    justify-content: center;

    & span {
      position: absolute;
      z-index: 1;
      transform: translateY(-50%);
      background: var(--background-secondary);
      padding: 0 var(--base-gap);
    }

    & hr {
      width: 100%;
    }
  }

  .login-provider-list {
    list-style: none;
    display: flex;
    justify-content: space-between;

    & button.twitter {
      --button-background: var(--brand-blue);
      --button-shadow: var(--brand-blue);
      --button-focus: var(--brand-blue-low);
      --text-color: var(--text-color-button);
    }

    & button.google {
      --button-background: var(--background-primary);
    }

    & button.github {
      --button-background: var(--custom-black);
      --button-shadow: var(--custom-black);
      --text-color: var(--text-color-button);
    }
  }
</style>
