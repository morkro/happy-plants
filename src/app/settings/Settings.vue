<template>
  <main class="main-wireframe">
    <app-header :back="true" :backPath="returnRoutePath">
      <h1 slot="title">{{ headline }}</h1>
    </app-header>

    <router-view class="app-content"></router-view>
  </main>
</template>

<script>
  import AppHeader from '@/components/AppHeader'

  export default {
    name: 'Settings',

    components: {
      'app-header': AppHeader
    },

    computed: {
      headline () {
        return this.$route.path.split('/').pop()
      },
      returnRoutePath () {
        const routes = this.$route.path.split('/').filter(Boolean)
        return routes.length === 1
          ? '/'
          : `/${routes[routes.length - 2]}`
      }
    }
  }
</script>

<style lang="postcss" scoped>
  main {
    min-height: 10vh;
    height: 100vh;
    background: var(--background-secondary);
  }
</style>
