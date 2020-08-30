<template>
  <v-layout class="screen-onboarding-email">
    <app-header return-to="/onboarding">Create account</app-header>

    <main>
      <form class="create-account-form" @submit.prevent="createAccount">
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

        <label-group
          id="login-name"
          label="Your name"
          :error="error.el === 'name' && error.message"
        >
          <template v-slot="{ label }">
            <v-input
              required
              type="text"
              placeholder="Plant Lover"
              id="login-name"
              v-model="name"
              :aria-describedby="label"
              :aria-invalid="error.el === 'name'"
              :error="error.el === 'name'"
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
              autocomplete="new-password"
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
              @blur.native="comparePasswords"
            />
          </template>
        </label-group>

        <div class="create-account-actions">
          <router-link to="/onboarding" class="btn border green">Back</router-link>
          <v-button
            type="submit"
            :disabled="!canProceed"
            :aria-disabled="!canProceed"
            :color="canProceed ? 'green' : 'grey'"
          >Create account</v-button>
        </div>
      </form>
    </main>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import setErrorMessage, { FormErrorObject } from '@/utils/setErrorMessage'

  interface OnboardingAccountData {
    email: string
    name: string
    password: string
    passwordConfirmed: string
    error: FormErrorObject
  }

  export default Vue.extend({
    name: 'OnboardingAccount',
    data(): OnboardingAccountData {
      const query = this.$route.query
      return {
        email: Object.prototype.hasOwnProperty.call(query, 'email') ? String(query.email) : null,
        name: null,
        password: null,
        passwordConfirmed: null,
        error: { el: null, message: null },
      }
    },
    computed: {
      canProceed(): boolean {
        return this.email && this.password && this.password === this.passwordConfirmed
      },
    },
    watch: {
      email(newValue): void {
        this.$router.push({ path: '/onboarding/email', query: { email: newValue } })
      },
    },
    methods: {
      ...mapActions({
        create: 'account/createAccount',
      }),
      comparePasswords(): void {
        if (this.passwordConfirmed !== this.password) {
          this.error = { el: 'password', message: `Password's don't match` }
        } else {
          this.error = { el: null, message: null }
        }
      },
      async createAccount() {
        if (!this.canProceed) {
          return
        }

        this.error.el = null
        this.error.message = null

        try {
          await this.create({ email: this.email, password: this.password, displayName: this.name })
          this.$router.push('/onboarding/success')
        } catch (error) {
          this.error = setErrorMessage(error)
        }
      },
    },
  })
</script>

<style lang="postcss">
  .screen-onboarding-account {
    width: 100%;
  }

  .create-account-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    & label > .text {
      color: var(--brand-green-dark);
    }
  }

  .create-account-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--base-gap);
    padding-bottom: var(--base-gap);
    margin-top: auto;
    width: 100%;
  }
</style>
