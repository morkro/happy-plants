<template>
  <v-layout class="screen-onboarding-account">
    <app-header return-to="/onboarding">
      Create account
    </app-header>

    <main>
      <form class="create-account-form" @submit.prevent="createAccount()">
        <label for="create-account-email">
          <v-text color="special">
            Your e-mail
          </v-text>
        </label>
        <v-input
          type="email"
          v-model="email"
          required
          placeholder="lover@plants.garden"
          id="create-account-email"
        />
        <label for="create-account-pw">
          <v-text color="special">
            Your password
          </v-text>
        </label>
        <v-input
          type="password"
          v-model="password"
          required
          placeholder="********"
          id="create-account-pw"
        />
        <v-button color="yellow" type="submit">
          Create account
        </v-button>
      </form>

      <router-link to="/onboarding" class="btn">
        Back
      </router-link>
      <router-link to="/onboarding/success" class="btn">
        Next
      </router-link>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  export default Vue.extend({
    name: 'OnboardingAccount',

    data: () => ({}),

    methods: {
      ...mapActions({}),
      createAccount() {},
    },
  })
</script>

<style lang="postcss" scoped>
  .screen-onboarding-account {
    width: 100%;
  }

  .create-account-form {
    width: 100%;
  }
</style>
