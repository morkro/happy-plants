<template>
  <main class="main-wireframe">
    <!-- <settings-modal
      :show="showSettingsModal"
      @close-modal="closeSettingsModal">
    </settings-modal> -->

    <app-header :back="true" :backPath="returnRoutePath">
      <h1 slot="title">{{ headline }}</h1>
    </app-header>

    <router-view></router-view>
  </main>
</template>

<script>
  import AppHeader from '@/app/shared/AppHeader'
  import SettingsModal from './SettingsModal'

  export default {
    name: 'Settings',

    components: {
      'app-header': AppHeader,
      'settings-modal': SettingsModal
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
  @import "~styles/colors";

  main {
    min-height: 10vh;
    height: 100vh;
    background: $light-grey;
  }
</style>
