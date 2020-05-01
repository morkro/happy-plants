<template>
  <v-layout class="screen-onboarding-account">
    <app-header return-to="/onboarding">
      Create account
    </app-header>

    <main>
      <form class="create-account-form" @submit.prevent="createAccount()">
        <label-group
          label="Your e-mail *"
          id="create-account-email"
          :error="error.el === 'email' && error.message"
        >
          <template v-slot="{ label }">
            <v-input
              required
              type="email"
              id="create-account-email"
              placeholder="lover@plants.garden"
              v-model="email"
              :aria-describedby="label"
              :aria-invalid="error.el === 'email'"
              :error="error.el === 'email'"
              :error-message="error.message"
            />
          </template>
        </label-group>

        <label-group id="create-account-pw" label="Your password *">
          <template v-slot="{ label }">
            <v-input
              required
              type="password"
              v-model="password"
              placeholder="********"
              id="create-account-pw"
              :aria-describedby="label"
              :error="error.el === 'password'"
              :aria-invalid="error.el === 'password' || password !== passwordConfirmed"
            />
          </template>
        </label-group>

        <label-group
          id="create-account-pw-confirm"
          label="Confirm password *"
          :error="error.el === 'password' && error.message"
        >
          <template v-slot="{ label }">
            <v-input
              required
              type="password"
              v-model="passwordConfirmed"
              placeholder="********"
              id="create-account-pw-confirm"
              :aria-describedby="label"
              :error="error.el === 'password'"
              :error-message="error.message"
              :aria-invalid="error.el === 'password' || password !== passwordConfirmed"
            />
          </template>
        </label-group>

        <v-button color="yellow" type="submit">
          Create account
        </v-button>
      </form>

      <div class="create-account-actions">
        <router-link to="/onboarding" class="btn">
          Back
        </router-link>
        <router-link to="/onboarding/success" class="btn">
          Next
        </router-link>
      </div>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import setErrorMessage, { FormErrorObject } from '@/utils/setErrorMessage'

  interface OnboardingAccountData {
    email: string
    password: string
    passwordConfirmed: string
    error: FormErrorObject
  }

  export default Vue.extend({
    name: 'OnboardingAccount',

    data: (): OnboardingAccountData => ({
      email: null,
      password: null,
      passwordConfirmed: null,
      error: { el: null, message: null },
    }),

    methods: {
      ...mapActions({
        create: 'user/createAccount',
      }),
      async createAccount() {
        this.error.el = null
        this.error.message = null

        try {
          await this.create({ email: this.email, password: this.password })
          this.$router.push('/onboarding/success')
        } catch (error) {
          this.error = setErrorMessage(error)
        }
      },
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

  .create-account-actions {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: var(--base-gap);
  }
</style>
