<template>
  <v-layout class="screen-settings">
    <v-loading v-if="logoutRedirect" message="logout" />

    <app-header />

    <main>
      <v-text type="title">
        Settings boi
      </v-text>
      <v-button @click.native="logoutUser()">
        Logout
      </v-button>
    </main>

    <app-menu />
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import delay from '@/utils/promiseDelay'

  export default Vue.extend({
    name: 'Settings',

    data: () => ({
      logoutRedirect: false,
    }),

    methods: {
      ...mapActions({
        logout: 'user/signOutUser',
      }),
      async logoutUser() {
        this.logoutRedirect = true
        await Promise.all([this.logout(), delay(2000)])
        this.$router.push('/')
      },
    },
  })
</script>

<style lang="postcss" scoped>
  .screen-settings {
    padding-top: var(--app-header-height);
    width: 100%;
    display: flex;
    flex-direction: column;

    & main {
      padding: 0 var(--base-gap);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
</style>
