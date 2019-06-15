<template>
  <app-wireframe class="logout">
    <main-content>
      <feather-refresh />
      <h2>Signing you out</h2>
      <p>See you soon!</p>
    </main-content>
  </app-wireframe>
</template>

<script>
  import { mapActions } from 'vuex'
  import sleep from '@/utils/sleep'
  export default {
    name: 'Logout',

    meta: {
      title: 'Logout'
    },

    components: {
      'feather-refresh': () =>
        import('vue-feather-icons/icons/RefreshCwIcon' /* webpackChunkName: "icons" */)
    },

    async mounted () {
      await sleep(3000)
      await this.updateStorage({ type: 'local' })
      await this.signOutUser()
      this.$router.push('/')
    },

    methods: {
      ...mapActions([
        'updateStorage',
        'signOutUser'
      ])
    }
  }
</script>

<style lang="postcss">
  .app-wireframe.logout {
    justify-content: center;
    background: var(--background-primary);

    & .main-content {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;

      & svg {
        width: calc(var(--icon-size-base) * 2);
        height: calc(var(--icon-size-base) * 2);
        animation: rotate360 3s linear infinite;
      }
    }

    & h2 {
      margin: var(--base-gap) 0;
    }
  }
</style>
