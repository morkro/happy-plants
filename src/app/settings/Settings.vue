<template>
  <main class="main-wireframe">
    <app-header :back="true" :backPath="returnRoutePath">
      <h1 slot="title">{{ headline }}</h1>
    </app-header>

    <router-view></router-view>
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

<style lang="scss" scoped>
  $avatar-size: 20px;

  main {
    min-height: 10vh;
    height: 100vh;
    background: var(--background-secondary);
  }

  .settings-avatar {
    border-radius: 50%;
    width: $avatar-size;
    height: $avatar-size;
    margin-right: var(--base-gap);
    overflow: hidden;
    background: var(--background-secondary);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      object-fit: cover;
      width: 100%;
    }

    svg {
      width: 12px;
      height: 12px;
    }
  }
</style>
