<template>
  <div class="main-wireframe">
    <main class="app-content">
      <h2>Well, this is awkward.</h2>
      <p>
        How about we pretend this didn't happen?
      </p>
      <v-button @click.native="pushToSafety">
        <template v-slot:icon>
          <feather-home />
        </template>
        Back to overview
      </v-button>
    </main>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'NotFound',

    meta: {
      title: 'Not found!'
    },

    components: {
      'feather-home': () =>
        import('vue-feather-icons/icons/HomeIcon' /* webpackChunkName: "icons" */)
    },

    created () {
      this.updateAppHeader({
        title: 'Oops!',
        backBtn: true
      })
    },

    methods: {
      ...mapActions([
        'updateAppHeader'
      ]),
      pushToSafety () {
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .main-wireframe {
    min-height: 100vh;
    justify-content: center;
    background: var(--background-secondary);
  }

  .app-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: var(--base-gap);

    & p {
      color: var(--text-color-secondary);
      text-align: center;
      font-weight: 500;
      margin-top: var(--base-gap);
    }
  }

  button {
    margin-top: var(--base-gap);
  }
</style>
