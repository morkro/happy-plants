<template>
  <main class="main-wireframe">
    <app-header :back="true" :backPath="returnRoutePath">
      <h1 slot="title">{{ headline }}</h1>
      <div v-if="authenticated" slot="custom-action-right" class="settings-avatar">
        <img v-if="authenticated" :src="avatar" :alt="userName" :title="userName" />
        <feather-user v-else />
      </div>
    </app-header>

    <router-view></router-view>
  </main>
</template>

<script>
  import { mapState } from 'vuex'
  import AppHeader from '@/components/AppHeader'

  export default {
    name: 'Settings',

    components: {
      'app-header': AppHeader,
      'feather-user': () => import('vue-feather-icon/components/user')
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
    overflow: hidden;
    background: $light-grey;
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
