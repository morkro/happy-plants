<template>
  <div class="welcome-wrapper">
    <portal-dialog
      dialog-name="intro-welcome-signin"
      :show="showDialog"
      @close-dialog="closeDialog">
      <template v-slot:headline>
        <span>Welcome back!</span>
      </template>
      <div>
        <auth-provider-list
          :loading="authFromRedirect"
          :disabled="disabled"
          @provider-selected="loginUser"
        />
      </div>
    </portal-dialog>

    <welcome-carousel>
      <div :style="{ 'background-color': 'silver' }">
        intro
      </div>
      <div :style="{ 'background-color': 'blue' }">
        water
      </div>
      <div :style="{ 'background-color': 'yellow' }">
        sun
      </div>
      <div :style="{ 'background-color': 'green' }">
        gallery
      </div>
      <div :style="{ 'background-color': 'purple' }">
        notes
      </div>
    </welcome-carousel>

    <!-- <div class="welcome-header">
      <img
        src="@/assets/happyplants-logo.svg"
        alt="HappyPlants Logo"
        title="HappyPlants Logo"
        width="100%">
    </div>

    <div class="welcome-content">
      <h2>
        HappyPlants is all about collecting, organising, and
        adding all kinds of information of your little friends.
      </h2>
      <img src="./icon.svg">
      <p>
        How much water does it need? During which seasons does it grow?
        When is it dormant? Does it require lots of sun?
      </p>
    </div> -->

    <ul class="welcome-actions">
      <li>
        <v-button
          @click.native="nextStep"
          :disabled="disabled"
          :loading="disabled">
          <span>Getting started</span>
        </v-button>
      </li>
      <li>
        <v-button
          @click.native="openDialog"
          color="grey"
          :disabled="disabled"
          :loading="disabled">
          <span>Sign in</span>
        </v-button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import Carousel from './Carousel'

  export default {
    name: 'IntroStart',

    components: {
      'feather-right': () =>
        import('vue-feather-icons/icons/ArrowRightIcon' /* webpackChunkName: "icons" */),
      'welcome-carousel': Carousel
    },

    computed: {
      ...mapState({
        authFromRedirect: state => state.user.authFromRedirect,
        authProgress: state => state.user.loading,
        authenticated: state => state.user.authenticated,
        plants: state => state.plants.data
      }),
      disabled () {
        return (
          this.authFromRedirect ||
          this.authProgress ||
          this.signInProgress
        )
      }
    },

    data: () => ({
      showDialog: false,
      signInProgress: false
    }),

    watch: {
      authenticated (auth) {
        if (auth) {
          this.$router.push('/')
        }
      }
    },

    methods: {
      ...mapActions([
        'signInUser',
        'loadPlants',
        'loadTags',
        'showNotification'
      ]),

      nextStep () {
        if (this.signInProgress) return
        this.$router.push('/intro/storage')
      },

      async loginUser (provider) {
        this.signInProgress = true
        try {
          await this.signInUser(provider)
        } catch (error) {
          this.showNotification()
          return
        }
        this.signInProgress = false

        await this.loadPlants()
        await this.loadTags()

        if (!this.plants.length) {
          this.$router.push('/intro/howto')
        } else {
          this.$router.push('/')
        }
      },

      openDialog () {
        this.showDialog = true
      },

      closeDialog () {
        this.showDialog = false
      }
    }
  }
</script>

<style lang="postcss">
  .welcome-wrapper {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }

  .welcome-header {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: calc(var(--base-gap) * 2);

    & > img {
      max-width: 80%;
    }
  }

  @media (--max-mobile-viewport) {
    .welcome-header > img {
      max-width: 50%;
    }
  }

  .welcome-login {
    margin-top: var(--double-gap);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    & p {
      text-align: center;
      font-size: var(--text-size-small);
      margin-bottom: calc(var(--base-gap) / 2);
      color: var(--text-color-secondary);
    }

    & p,
    & button {
      align-self: center;
    }
  }

  .welcome-content {
    margin-bottom: var(--double-gap);
    text-align: center;
    padding: 0 var(--base-gap);

    & h2 {
      margin-bottom: var(--double-gap);
      color: var(--brand-green);
    }

    & p {
      color: var(--text-color-secondary);
    }
  }

  .welcome-actions {
    list-style: none;
    width: 100%;

    & li:not(:last-child) {
      margin-bottom: var(--base-gap);
    }

    & button {
      width: 100%;
    }
  }
</style>
