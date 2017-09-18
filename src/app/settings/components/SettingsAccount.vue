<template>
  <section>
    <button @click="googleSignIn">Google sign in</button>
    <button @click="googleSignOut">Google sign out</button>
  </section>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'SettingsAccount',

    methods: {
      googleSignIn () {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
        firebase.auth().getRedirectResult()
          .then(console.log)
          .catch(console.warn)
      },
      googleSignOut () {
        firebase.auth().signOut()
          .then(console.log)
          .catch(console.warn)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  section {
    padding: $base-gap;
    line-height: 150%;
  }
</style>
