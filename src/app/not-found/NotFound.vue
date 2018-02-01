<template>
  <main class="main-wireframe">
    <app-header :back="true">
      <h1 slot="title">Oops!</h1>
    </app-header>

    <section class="app-content">
      <p>
        Well, this is awkward.
        How about we pretend this didn't happen and go back to
      </p>
      <button @click="pushToSafety">
        <feather-home />
        Overview
      </button>
    </section>
  </main>
</template>

<script>
  import AppHeader from '@/components/AppHeader'

  export default {
    name: 'NotFound',

    components: {
      'app-header': AppHeader,
      'feather-home': () =>
          import('vue-feather-icon/components/home' /* webpackChunkName: "404" */)
    },

    methods: {
      pushToSafety () {
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="postcss" scoped>
  main {
    min-height: 100vh;
    justify-content: center;
    background: var(--background-secondary);
  }

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: var(--base-gap);

    & p {
      color: var(--text-color-secondary);
      text-align: center;
      font-weight: 600;
      margin-top: var(--base-gap);
    }
  }

  button {
    margin-top: var(--base-gap);
  }
</style>
