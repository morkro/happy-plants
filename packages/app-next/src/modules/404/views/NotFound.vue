<template>
  <div class="screen-404">
    <app-header />

    <main>
      <img src="../assets/404-illustration.svg" />
      <v-text type="title">Oops, how did you get here?</v-text>
      <v-text color="inactive">
        Let’s just act like this never happend,
        <br />shall we?
      </v-text>
      <router-link to="/" class="btn">Back to your plants</router-link>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'NotFound',
  })
</script>

<style lang="postcss" scoped>
  .screen-404 {
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

      & img {
        margin-bottom: var(--base-gap);
      }

      & .btn {
        margin-top: calc(2 * var(--base-gap));
      }
    }
  }
</style>
