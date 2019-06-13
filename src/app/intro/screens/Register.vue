<template>
  <div class="intro-register-wrapper">
    <v-box class="intro-content">
      <h2>Create account with email</h2>
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
    </v-box>

    <v-box class="intro-content">
      <h2>Use an existing account</h2>
      <span>
        Create an account by using your login from one of the following services.
      </span>
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
    </v-box>

    <div class="intro-footer">
      <v-button color="plain" @click.native="$router.back()">
        <template v-slot:icon>
          <feather-left />
        </template>
        <span>Back</span>
      </v-button>
      <v-button @click.native="$router.push('/howto')">
        <span>Next</span>
        <template v-slot:icon>
          <feather-right />
        </template>
      </v-button>
    </div>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  import { mapActions } from 'vuex'

  export default {
    name: 'IntroRegister',

    meta: {
      title: 'Create account'
    },

    mixins: [validationMixin],

    validations: {
      email: {
        email
      },
      password: {
        required
      }
    },

    components: {
      'feather-left': () =>
        import('vue-feather-icons/icons/ArrowLeftIcon' /* webpackChunkName: "icons" */),
      'feather-right': () =>
        import('vue-feather-icons/icons/ArrowRightIcon' /* webpackChunkName: "icons" */),
      'feather-twitter': () =>
        import('vue-feather-icons/icons/TwitterIcon' /* webpackChunkName: "icons" */),
      'feather-google': () =>
        import('vue-feather-icons/icons/ChromeIcon' /* webpackChunkName: "icons" */),
      'feather-github': () =>
        import('vue-feather-icons/icons/GithubIcon' /* webpackChunkName: "icons" */)
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

    created () {
      this.updateAppHeader({
        title: 'Register account',
        transparent: false,
        backBtn: false,
        rightBtn: false
      })
    },

    methods: {
      ...mapActions(['updateAppHeader']),
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
  .intro-content {
    padding: var(--base-gap);

    & h2 {
      margin-bottom: var(--base-gap);
    }
  }

  .intro-footer {
    margin-top: var(--double-gap);
    color: var(--text-color-inverse);
    display: flex;
    justify-content: space-between;
  }
</style>
