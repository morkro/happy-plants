<template>
  <section class="settings-account">
    <div class="account-auth">
      <span v-if="authenticated" key="account-loggedin">
        You are currently logged in with your Google account <em>({{ email }})</em>.
      </span>
      <span v-else key="account-loggedout">
        You are logged out. Log in with your Google account.
      </span>
      <div class="auth-actions">
        <button :disabled="authenticated" @click="googleSignIn">
          <feather-sign-in :width="iconSize" :height="iconSize" /> Sign in
        </button>
        <button :disabled="!authenticated" @click="googleSignOut">
          <feather-sign-out :width="iconSize" :height="iconSize" /> Sign out
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  import firebase from 'firebase'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'SettingsAccount',

    components: {
      'feather-sign-in': () =>
        import('vue-feather-icon/components/log-in' /* webpackChunkName: "settings" */),
      'feather-sign-out': () =>
        import('vue-feather-icon/components/log-out' /* webpackChunkName: "settings" */)
    },

    data () {
      return {
        iconSize: 18
      }
    },

    computed: mapState({
      authenticated: state => state.user.authenticated,
      email: state => state.user.email
    }),

    methods: {
      ...mapActions([
        'showNotification'
      ]),
      googleSignIn () {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
        firebase.auth().getRedirectResult()
          .then(console.log)
          .catch(console.warn)
      },
      googleSignOut () {
        firebase.auth().signOut()
          .then(() => this.showNotification({ message: 'You have been logged out.' }))
          .catch(console.warn)
      }
    }
  }
</script>

<style lang="scss" scoped>
  section {
    padding: var(--base-gap);
    line-height: 150%;
  }

  .account-auth {
    span {
      display: inline-block;
      margin-bottom: var(--base-gap);
    }
  }

  .auth-actions {
    display: flex;
    justify-content: center;

    button {
      margin: 0 var(--base-gap);
    }
  }
</style>
