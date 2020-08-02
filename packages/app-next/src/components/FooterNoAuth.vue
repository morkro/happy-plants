<template>
  <footer class="footer-no-auth">
    <a href="https://happyplants.app/#about" target="_blank" rel="noopener" data-cy="footer-about">
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
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'FooterNoAuth',
  })
</script>

<style lang="postcss" scoped>
  .footer-no-auth {
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
