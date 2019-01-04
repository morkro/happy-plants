<template>
  <ul class="auth-provider-list">
    <li v-for="signin in signInOptions" :key="signin.key">
      <v-button
        color="plain"
        :loading="selectedProvider === signin.key || loading"
        :disabled="disabled"
        @click.native="emitSelectedProvider(signin.key)">
        <component :is="`feather-${signin.key}`" slot="icon" />
        <span>Login with {{ signin.label }}</span>
      </v-button>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'AuthProviderList',

    props: {
      disabled: { type: Boolean, default: false },
      loading: { type: Boolean, default: false }
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
      selectedProvider: null,
      signInOptions: [
        { key: 'twitter', label: 'Twitter' },
        { key: 'google', label: 'Google' },
        { key: 'github', label: 'GitHub' }
      ]
    }),

    methods: {
      emitSelectedProvider (provider) {
        this.selectedProvider = provider
        this.$emit('provider-selected', provider)
      }
    }
  }
</script>

<style lang="postcss">
  .auth-provider-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;

    & li:not(:last-child) {
      margin-bottom: var(--base-gap);
    }
  }
</style>
