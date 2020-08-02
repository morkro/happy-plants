<template>
  <v-layout class="screen-account">
    <app-header>Reset your password</app-header>

    <main>
      <form
        v-if="mode === 'resetPassword' && !verifyActionCode"
        class="account-resetpassword"
        @submit.prevent="setNewPassword"
      >
        <label-group
          id="account-newpw"
          label="New password *"
          :error="error.el === 'newPassword' && error.message"
        >
          <template v-slot="{ label }">
            <v-input
              type="password"
              v-model="newPassword"
              placeholder="********"
              id="account-newpw"
              :aria-describedby="label"
              :error="error.el === 'newPassword'"
              :error-message="error.message"
              :aria-invalid="error.el === 'newPassword'"
              data-cy="account-form-newpassword"
            />
          </template>
        </label-group>

        <label-group
          id="account-newpw-confirm"
          label="Confirm new password *"
          :error="error.el === 'newPasswordConfirm' && error.message"
        >
          <template v-slot="{ label }">
            <v-input
              type="password"
              v-model="newPasswordConfirm"
              placeholder="********"
              id="account-newpw-confirm"
              :aria-describedby="label"
              :error="error.el === 'newPasswordConfirm'"
              :error-message="error.message"
              :aria-invalid="error.el === 'newPasswordConfirm'"
              data-cy="account-form-newpassword"
            />
          </template>
        </label-group>

        <div class="account-resetpassword-actions">
          <router-link
            to="/login"
            class="account-resetpassword-return"
            data-cy="account-resetpassword-return"
          >
            <feather-left />
            <v-text color="special">Back to login</v-text>
          </router-link>

          <v-button color="yellow" type="submit" data-cy="account-resetpassword-submit">
            <feather-loader v-if="loading" />
            Reset password
          </v-button>
        </div>
      </form>
    </main>

    <footer-no-auth />
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import { verifyPasswordResetCode, confirmNewPassword } from '@/services/firebase'
  import logger from '@/utils/vueLogger'
  import setErrorMessage from '@/utils/setErrorMessage'
  import delay from '@/utils/promiseDelay'

  export default Vue.extend({
    name: 'Account',
    components: {
      'feather-left': () =>
        import('vue-feather-icons/icons/ArrowLeftIcon' /* webpackChunkName: "icons" */),
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
    },
    data() {
      return {
        mode: this.$route.query.mode,
        actionCode: String(this.$route.query.oobCode),
        verifyActionCode: false,
        email: null,
        newPassword: null,
        newPasswordConfirm: null,
        loading: false,
        error: { el: null, message: null },
      }
    },
    methods: {
      ...mapActions({
        signInUser: 'account/signInUser',
        showNotification: 'notifications/show',
      }),
      async setNewPassword() {
        this.error.el = null
        this.error.message = null

        if (this.newPassword !== this.newPasswordConfirm) {
          this.error.el = 'newPasswordConfirm'
          this.error.message = "Password doesn't match"
          return
        }

        this.loading = true
        try {
          await confirmNewPassword(this.actionCode, this.newPasswordConfirm)
          await this.signInUser({
            type: 'email',
            email: this.email,
            password: this.newPasswordConfirm,
          })
          await delay(2000)
          this.$router.push('/home')
        } catch (error) {
          logger(`setNewPassword() => ${error.message}`, true)
          this.error = setErrorMessage(error)
        } finally {
          this.loading = false
        }
      },
    },
    async created() {
      if (this.mode === 'resetPassword') {
        this.verifyActionCode = true
        try {
          this.email = await verifyPasswordResetCode(this.actionCode)
        } catch (error) {
          logger(`Account#created() => ${error.message}`, true)
          this.showNotification({
            type: 'alert',
            message: 'An error occured, unable to reset your password. Please try again.',
          })
        } finally {
          this.verifyActionCode = false
        }
      }
    },
  })
</script>

<style lang="postcss" scoped>
  .screen-account {
    background-color: var(--brand-green);
    background-image: url(../../../assets/green-illustrated-bg.svg);
    background-repeat: no-repeat;
    background-position: top left;
    background-size: calc(100% - var(--base-gap) * 4) auto;
  }

  .account-resetpassword {
    display: flex;
    flex-direction: column;
    width: 100%;

    & .btn.yellow {
      box-shadow: 0 1px 2px var(--brand-green-dark);
    }

    & button[type='submit'] svg {
      animation: spin 3s linear infinite;
    }

    & .account-resetpassword-actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    & .account-resetpassword-return {
      color: var(--brand-white);
      text-decoration: none;
      display: flex;
      align-items: center;

      & svg {
        margin-right: calc(0.5 * var(--base-gap));
      }
    }
  }
</style>
