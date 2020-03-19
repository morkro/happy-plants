<template>
  <div>
    <app-header return-to="/welcome">
      Login
    </app-header>

    <main>
      <form>
        <label for="login-email">
          Your e-mail
        </label>
        <input type="email" id="login-email" />
        <label for="login-pw">
          Your password
        </label>
        <input type="password" id="login-pw" />
        <button>
          Login
        </button>
      </form>

      <span>or login with</span>

      <div>
        <v-button @click.native="login('google')">Google</v-button>
        <v-button>GitHub</v-button>
        <v-button>Twitter</v-button>
      </div>
    </main>

    <footer>
      <span>About</span>
      <span>Contact</span>
      <span>Open Source</span>
    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  export default Vue.extend({
    name: 'Login',
    methods: {
      ...mapActions({
        login: 'login/signInUser',
      }),
    },
  })
</script>
