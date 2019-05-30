<template>
  <div class="main-wireframe logout">
    <main class="app-content">
      <feather-refresh />
      <h2>Signing you out</h2>
      <p>See you soon!</p>
    </main>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import sleep from '@/utils/sleep'
  export default {
    name: 'Logout',

    components: {
      'feather-refresh': () =>
        import('vue-feather-icons/icons/RefreshCwIcon' /* webpackChunkName: "icons" */)
    },

    created () {
      this.updateAppHeader({
        title: null,
        backBtn: false,
        transparent: true
      })
    },

    async mounted () {
      await sleep(3000)
      await this.updateStorage({ type: 'local' })
      await this.signOutUser()
      this.$router.push('/')
    },

    methods: {
      ...mapActions([
        'updateAppHeader',
        'updateStorage',
        'signOutUser'
      ])
    }
  }
</script>

<style lang="postcss">
  .main-wireframe.logout {
    justify-content: center;
    background: var(--background-primary);

    & .app-content {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
    }

    & h2 {
      margin: var(--base-gap) 0;
    }
  }
</style>
