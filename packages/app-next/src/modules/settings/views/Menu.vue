<template>
  <v-layout class="screen-settings">
    <v-loading v-if="logoutRedirect" message="logout" />

    <app-header color="white">Settings</app-header>

    <main>
      <section class="settings-header">
        <div class="settings-header-photo">
          <img
            v-if="userPhotoURL"
            :src="userPhotoURL"
            :alt="`Photo of ${displayName}`"
            :title="`Photo of ${displayName}`"
          />
          <div v-else>
            <feather-smile />
          </div>
        </div>
        <div class="settings-header-content">
          <v-text color="special">{{ displayName }}</v-text>
          <v-text color="special">{{ plantCount }} Plants</v-text>
        </div>

        <svg
          class="settings-header-background"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 360 204"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              fill="#FFF"
              d="M324.238 61.787c11.994-6.299 24.425-9.031 35.763-7.254L360 124.576c-5.01 4.241-9.168 9.434-10.95 17.276-2.065 9.087-2.39 18-3.618 25.087-2.813 16.261-16.19 28.217-32.846 34.848-7.36 2.913-14.782 2.891-22.31.283-9.082-3.142-10.878-8.562-13.404-15.219l-.508-1.325c-8.31-21.348-53.772-8.282-70.316-34.63-12.272-19.522 5.436-49.326 25.359-58.587 18.445-8.585 35.306-8.467 44.215-9.249l.602-.055c21.887-2.152 32.218-12.913 48.014-21.218zM201.593 168.182c.093 3.685-1.334 6.48-4.166 8.449-7.948 5.526-14.643-1.645-13.24-7.231 1.839-7.324 6.636-15.157 12.211-11.448 3.529 2.35 5.099 5.84 5.195 10.23"
            />
            <path fill="#1B6D4F" d="M0 0h360v139H0z" />
            <path
              fill="#1B6D4F"
              d="M295.782 119.436c16.422 2.233 42.549 6.005 56.274 11.532 3.435 1.375 5.867 3.357 7.122 5.737 1.864 3.488.515 5.254-3.616 7.255-13.441 6.46-27.08 5.92-43.125 3.407-17.813-2.788-29.088 3.744-35.93 6.846-6.757 3.062-14.265 4.168-22.392 3.717-22.653-1.243-23.708-6.385-46.906-12.24-19.238-4.856-28.679 4.75-39.802 10.478-45.202 23.275-68.645-18.366-116.215-.053-7.166 2.758-19.463 8.763-25.671 11.115-6.98 2.644-18.093 3.623-25.522-1.227v-48.19c3.495-6.366 8.947-12.186 16.185-17.433 33.551-24.413 98.474-5.552 279.598 19.056z"
            />
          </g>
        </svg>
      </section>

      <section class="settings-list list-account">
        <v-text type="subtitle" color="inactive">Account</v-text>
        <ul>
          <li>
            <router-link to="/settings/account">
              <v-text>Email & password</v-text>
              <feather-arrow />
            </router-link>
          </li>
        </ul>
      </section>

      <section class="settings-list list-app">
        <v-text type="subtitle" color="inactive">Application</v-text>
        <ul>
          <li>
            <router-link to="/settings/tags">
              <v-text>Tags</v-text>
              <feather-arrow />
            </router-link>
          </li>
          <li>
            <router-link to="/settings/modules">
              <v-text>Modules</v-text>
              <feather-arrow />
            </router-link>
          </li>
        </ul>
      </section>

      <section class="settings-list list-happyplants">
        <v-text type="subtitle" color="inactive">HappyPlants</v-text>
        <ul>
          <li>
            <router-link to="/settings/about">
              <v-text>About</v-text>
              <feather-arrow />
            </router-link>
          </li>
          <li>
            <router-link to="/settings/release-notes">
              <v-text>Release Notes</v-text>
              <feather-arrow />
            </router-link>
          </li>
          <li>
            <router-link to="/settings/feature-request">
              <v-text>Request a feature</v-text>
              <feather-arrow />
            </router-link>
          </li>
          <li>
            <router-link to="/settings/bug-report">
              <v-text>Found a bug?</v-text>
              <feather-arrow />
            </router-link>
          </li>
          <li>
            <v-text>Version</v-text>
            <v-text>{{ version }}</v-text>
          </li>
        </ul>
      </section>

      <v-button @click.native="logoutUser" color="red" small>Logout</v-button>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions, mapState } from 'vuex'
  import { RootState } from '@/store'
  import config from '@/config'
  import delay from '@/utils/promiseDelay'
  import { getLocalEntry } from '@/services/localStorage'

  export default Vue.extend({
    name: 'Settings',

    components: {
      'feather-arrow': () =>
        import('vue-feather-icons/icons/ArrowRightIcon' /* webpackChunkName: "icons" */),
      'feather-smile': () =>
        import('vue-feather-icons/icons/SmileIcon' /* webpackChunkName: "icons" */),
    },

    data: () => ({
      logoutRedirect: false,
      version: config.version,
      plantCountFromLocalStorage: getLocalEntry('plant-data-count'),
    }),

    computed: {
      ...mapState<RootState>({
        userName: (state: RootState) => state.user.displayName,
        email: (state: RootState) => state.user.email,
        userPhotoURL: (state: RootState) => state.user.photoURL,
        plants: (state: RootState) => state.home.plants.length,
      }),
      plantCount(): string {
        return this.plants ? String(this.plants) : this.plantCountFromLocalStorage
      },
      displayName(): string {
        return this.userName || this.email
      },
    },

    methods: {
      ...mapActions({
        logout: 'user/signOutUser',
        showNotification: 'notifications/show',
      }),
      async logoutUser() {
        this.logoutRedirect = true
        try {
          await this.logout()
          await delay(2000)
          this.$store.commit('home/resetState', null, { root: true })
          this.$router.push('/welcome')
        } catch (error) {
          this.logoutRedirect = false
          this.showNotification({ info: 'alert', message: error.message })
        }
      },
    },
  })
</script>

<style lang="postcss" scoped>
  .screen-settings {
    width: 100%;
    display: flex;
    flex-direction: column;

    & #app-header {
      background: var(--brand-green);
    }

    & main {
      padding: 0 var(--base-gap) var(--base-gap);
      width: 100%;
      height: 100%;
    }
  }

  .settings-header {
    display: grid;
    width: 100%;
    grid-template-columns: 45px 1fr;
    column-gap: var(--base-gap);
    position: relative;
    background: var(--brand-green);
    padding-top: calc(0.5 * var(--base-gap));
    margin-bottom: 60px;

    & .settings-header-photo {
      & img,
      & div {
        width: 100%;
        border-radius: var(--base-radius);
        box-shadow: 0 2px 4px var(--brand-green-dark);
      }

      & div {
        height: 45px;
        background: var(--brand-yellow);
        display: flex;
        justify-content: center;
        align-items: center;

        & svg {
          stroke: var(--brand-green-dark);
        }
      }
    }

    & .settings-header-content {
      display: flex;
      flex-direction: column;
      justify-content: center;

      & .text:first-of-type {
        font-weight: 600;
      }
    }

    & .settings-header-background {
      position: absolute;
      z-index: -1;
      width: calc(100% + 2 * var(--base-gap));
      left: calc(-1 * var(--base-gap));
      bottom: 0;
      transform: translateY(35%);
    }
  }

  .settings-list {
    width: 100%;
    padding-bottom: calc(1.5 * var(--base-gap));

    & ul {
      list-style: none;
      width: 100%;
    }

    & li {
      width: 100%;

      &:not(:last-child) {
        padding-bottom: 4px;
      }
    }

    & h2 {
      padding-bottom: var(--base-gap);
    }

    &.list-happyplants li:last-child,
    & a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--brand-white);
      width: 100%;
      padding: var(--base-gap);
      border-radius: var(--base-radius);
      text-decoration: none;
      color: var(--brand-green-dark);
    }
  }
</style>
