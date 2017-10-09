<template>
  <main class="main-wireframe">
    <!-- <settings-modal
      :show="showSettingsModal"
      @close-modal="closeSettingsModal">
    </settings-modal> -->

    <app-header :back="true" :backPath="returnRoutePath">
      <h1 slot="title">{{ headline }}</h1>
      <img
        class="settings-avatar"
        slot="custom-action-right"
        v-if="authenticated"
        :src="avatar"
        :alt="userName"
        :title="userName" />
    </app-header>

    <router-view></router-view>
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import AppHeader from '@/components/AppHeader'
  import SettingsModal from './SettingsModal'

  export default {
    name: 'Settings',

    components: {
      'app-header': AppHeader,
      'settings-modal': SettingsModal
    },

    computed: {
      ...mapState({
        authenticated: state => state.user.authenticated,
        userName: state => state.user.name,
        avatar: state => state.user.avatar
      }),
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
  @import "~styles/layout";

  $avatar-size: 20px;

  main {
    min-height: 10vh;
    height: 100vh;
    background: $light-grey;
  }

  .settings-avatar {
    border-radius: 50%;
    width: $avatar-size;
    height: $avatar-size;
    margin-right: $base-gap;
  }
</style>
