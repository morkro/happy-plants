<template>
  <div class="main-wireframe">
    <main class="app-content">
      <form class="form-signin" @submit.prevent>
        <label for="login-email" class="form-label-group">
          <h2 class="required">E-Mail</h2>
          <span />
          <input
            required
            autocomplete="email"
            type="text"
            id="login-email"
            placeholder="Email"
            @change="getEmail">
        </label>

        <label for="login-password" class="form-label-group">
          <h2 class="required">Password</h2>
          <span />
          <input
            required
            autocomplete="current-password"
            type="password"
            id="login-password"
            placeholder="Password"
            @change="getPassword">
        </label>

        <v-button
          @click.native="validateForm"
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
    </main>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'Login',

    meta: {
      title: 'Login'
    },

    components: {
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
        title: 'Login',
        backBtn: true
      })
    },

    methods: {
      ...mapActions([
        'updateAppHeader',
        'signInUser'
      ]),
      validateForm () {
        console.group('login user')
          console.log('email', this.email)
          console.log('password', this.password)
        console.groupEnd()
      },
      getEmail (event) {
        if (!event.target.value) return
        this.email = event.target.value
      },
      getPassword (event) {
        if (!event.target.value) return
        this.password = event.target.value
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
  .main-wireframe {
    min-height: 100vh;
    background: var(--background-secondary);

    & .app-content {
      padding: var(--base-gap);
      line-height: 150%;
    }
  }

  .form-signin {
    width: 100%;

    & button,
    & input {
      width: 100%;
    }

    & .form-label-group {
      display: block;
      width: 100%;
      margin-bottom: calc(var(--base-gap) * 2);
    }

    & label h2 {
      margin-bottom: calc(var(--base-gap) / 2);
    }

    & label span {
      display: block;
      color: var(--text-color-secondary);
      font-size: var(--text-size-small);
      margin-bottom: calc(var(--base-gap) / 2);
      padding: 0 1px;
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
