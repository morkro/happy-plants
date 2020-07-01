<template>
  <div class="screen-welcome">
    <main>
      <div class="welcome-illustration">
        <welcome-illustration data-cy="illustration" focusable="false" />
        <div>
          <v-text color="inactive" data-cy="welcome-text">
            Keep track of your
            <br />houseplants' well-being.
          </v-text>
        </div>
      </div>
      <div class="welcome-actions">
        <router-link to="/login" class="btn border" data-cy="action-login">
          <v-text color="special">Login</v-text>
        </router-link>
        <router-link to="/onboarding" class="btn yellow" data-cy="action-onboarding">
          <v-text>Getting started</v-text>
        </router-link>
      </div>
    </main>

    <footer>
      <a
        href="https://happyplants.app/#about"
        target="_blank"
        rel="noopener"
        data-cy="footer-about"
      >
        <v-text small color="special">About</v-text>
      </a>
      <a
        href="https://happyplants.app/#contact"
        target="_blank"
        rel="noopener"
        data-cy="footer-contact"
      >
        <v-text small color="special">Contact</v-text>
      </a>
      <a
        href="https://github.com/morkro/happy-plants"
        target="_blank"
        rel="noopener"
        data-cy="footer-os"
      >
        <v-text small color="special">Open Source</v-text>
      </a>
    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Illustration from '@/modules/welcome/components/Illustration.vue'
  export default Vue.extend({
    name: 'Welcome',
    components: {
      'welcome-illustration': Illustration,
    },
  })
</script>

<style lang="postcss" scoped>
  .screen-welcome {
    width: 100%;
    background-image: url('../assets/welcome-background.svg');
    background-repeat: no-repeat;
    background-size: calc(100% + 2px);
    background-position: bottom;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 var(--base-gap);
  }

  .screen-welcome main {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    & .welcome-illustration {
      margin-top: calc(3.25 * var(--base-gap));
      text-align: center;

      & p {
        transform: translateY(calc(var(--base-gap) * -1));
        background: var(--brand-beige);
        display: inline;
        box-shadow: 3px 0 0 var(--brand-beige), -3px 0 0 var(--brand-beige);
        border-radius: var(--base-radius);
      }
    }

    & .welcome-actions {
      width: 100%;
      display: grid;
      grid-template-columns:
        calc(50% - (var(--base-gap) / 2))
        calc(50% - (var(--base-gap) / 2));
      grid-column-gap: var(--base-gap);

      & .btn.yellow {
        box-shadow: 0 1px 2px var(--brand-green-dark);
      }
    }
  }

  .screen-welcome footer {
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--brand-white);

    & a {
      text-decoration: none;
    }

    & a:not(:last-of-type) {
      margin-right: calc(var(--base-gap) * 2);
    }
  }
</style>
