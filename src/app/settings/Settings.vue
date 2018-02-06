<template>
  <div class="main-wireframe">
    <app-header :back-button="true" :back-path="returnRoutePath">
      <h1 slot="title">{{ headline }}</h1>
    </app-header>

    <main>
      <router-view class="app-content" />
    </main>
  </div>
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
  .main-wireframe {
    min-height: 100vh;
    height: auto;
    background: var(--background-secondary);
  }
</style>
