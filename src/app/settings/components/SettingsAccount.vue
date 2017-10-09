<template>
  <section class="settings-account">
    <div class="account-auth">
      <span v-if="authenticated">
        You are currently logged in with your Google account <em>({{ email }})</em>.
      </span>
      <span v-else>
        You are logged out. Log in with your Google account.
      </span>
      <div class="auth-actions">
        <button :disabled="authenticated" @click="googleSignIn">
          Sign in
        </button>
        <button :disabled="!authenticated" @click="googleSignOut">
          Sign out
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
  @import "~styles/layout";

  section {
    padding: $base-gap;
    line-height: 150%;
  }

  .account-auth {
    span {
      display: inline-block;
      margin-bottom: $base-gap;
    }
  }

  .auth-actions {
    display: flex;
    justify-content: center;

    button {
      margin: 0 $base-gap;
    }
  }
</style>
