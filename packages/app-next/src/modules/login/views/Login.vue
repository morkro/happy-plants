<template>
  <v-layout class="screen-login">
    <v-loading v-if="loginRedirect" message="login" />

    <app-header return-to="/welcome">
      Login
    </app-header>

    <main>
      <form class="login-form">
        <label for="login-email">
          <v-text color="special">
            Your e-mail
          </v-text>
        </label>
        <v-input type="email" required placeholder="lover@plants.garden" id="login-email" />
        <label for="login-pw">
          <v-text color="special">
            Your password
          </v-text>
        </label>
        <v-input type="password" required placeholder="********" id="login-pw" />
        <v-button color="yellow">
          Login
        </v-button>
      </form>

      <div class="login-form-separator">
        <v-text color="special">or login with</v-text>
        <hr />
      </div>

      <div class="login-services">
        <v-button border @click.native="login('google')">Google</v-button>
        <v-button border @click.native="login('github')">GitHub</v-button>
        <v-button border @click.native="login('twitter')">Twitter</v-button>
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

  export default Vue.extend({
    name: 'Login',
    methods: {
      ...mapActions({
        login: 'login/signInUser',
        authRedirectResults: 'login/authRedirectResults',
      }),
    },
    data: () => ({
      loginRedirect: false,
    }),
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

    & label,
    & input {
      margin-bottom: var(--base-gap);
    }

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
