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

    <v-carousel class="welcome-carousel">
      <div class="welcome-cards card-intro">
        <img
          src="@/assets/happyplants-logo.svg"
          alt="HappyPlants Logo"
          title="HappyPlants Logo"
          width="100%">

        <h2>
          HappyPlants is all about collecting, organising, and
          adding all kinds of information of your little friends
        </h2>
      </div>

      <div class="welcome-cards card-features">
        <div class="features-modules card-showcase">
          <ul>
            <li>
              <v-box><plant-watering /></v-box>
            </li>
            <li>
              <v-box><plant-sunshine :intensity="2" /></v-box>
            </li>
            <li>
              <v-box><plant-seasons /></v-box>
            </li>
          </ul>
        </div>

        <h2>
          How much water does it need? Does it require lots of sun?
          Keep track by adding plant modules!
        </h2>
      </div>

      <div class="welcome-cards card-gallery">
        <div class="gallery-list card-showcase">
          <ul>
            <li v-for="index in 9" :key="'gallery-item-' + index">
              <v-box />
            </li>
          </ul>
        </div>
        <h2>
          Add a gallery to your plants for documenting its growth or keeping a collection of photos
        </h2>
      </div>
    </v-carousel>

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

  export default {
    name: 'IntroStart',

    components: {
      'plant-watering': () =>
        import('@/app/plant/components/PlantWatering' /* webpackChunkName: "intro" */),
      'plant-sunshine': () =>
        import('@/app/plant/components/PlantSunshine' /* webpackChunkName: "intro" */),
      'plant-seasons': () =>
        import('@/app/plant/components/PlantSeasons' /* webpackChunkName: "intro" */),
      'feather-right': () =>
        import('vue-feather-icons/icons/ArrowRightIcon' /* webpackChunkName: "icons" */)
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

    created () {
      this.updateAppHeader({
        title: false,
        transparent: true,
        backBtn: false,
        rightBtn: false,
        color: 'black'
      })
    },

    methods: {
      ...mapActions([
        'signInUser',
        'loadPlants',
        'loadTags',
        'showNotification',
        'updateAppHeader'
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

  .welcome-carousel {
    margin-bottom: var(--double-gap);
  }

  .card-showcase {
    position: relative;

    &::before,
    &::after {
      content: "";
      width: 100vw;
      height: 50px;
      position: absolute;
      bottom: 0;
      left: calc(-1 * var(--double-gap));
      z-index: 1;
      background-image:
        linear-gradient(
          transparent 0%,
          var(--background-secondary) 50%,
          var(--background-secondary) 100%
        );
    }

    &::after {
      top: 0;
      transform: rotate(180deg);
    }

    &::before {
      bottom: 0;
    }
  }

  .welcome-cards {
    width: 100vw;
    padding: 0 var(--base-gap);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > h2 {
      line-height: 140%;
      margin-bottom: var(--double-gap);
    }
  }

  .card-intro {
    padding: 0 var(--base-gap);

    & > img {
      max-width: 80%;
      margin-bottom: var(--double-gap);
    }
  }

  @media (--max-mobile-viewport) {
    .card-intro > img {
      max-width: 50%;
    }
  }

  .card-features {
    padding: 0;

    & ul {
      list-style: none;
      transform: translateY(-2.5%);

      & li {
        margin-bottom: var(--base-gap);
      }
    }

    & .plant-component {
      margin-bottom: 0;
    }
  }

  .features-modules,
  .gallery-list {
    max-height: 45vh;
    margin-bottom: var(--base-gap);
    overflow: hidden;
    padding: 0 var(--base-gap);
    text-align: left;
  }

  .card-gallery {
    padding: 0;

    & ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      list-style: none;
      margin-bottom: var(--base-gap);

      & li {
        --gallery-item-size: calc(33vw - var(--double-gap));
        width: var(--gallery-item-size);
        height: var(--gallery-item-size);
        margin-bottom: var(--base-gap);
      }
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
