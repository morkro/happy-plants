<template>
  <div class="main-wireframe">
    <main>
      <router-view class="app-content" />
    </main>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'Settings',

    meta: {
      title: 'Settings'
    },

    computed: {
      ...mapState({
        galleries: state => state.gallery
      }),
      currentRoute () {
        return this.$route.path.split('/').pop()
      },
      returnRoutePath () {
        const routes = this.$route.path.split('/').filter(Boolean)
        return routes.length === 1
          ? '/'
          : `/${routes[routes.length - 2]}`
      }
    },

    watch: {
      '$route' () {
        this.updateAppHeader({
          title: this.currentRoute,
          backBtnPath: this.returnRoutePath
        })
      }
    },

    methods: mapActions([
      'updateAppHeader'
    ]),

    async created () {
      this.updateAppHeader({
        title: this.currentRoute,
        backBtn: true,
        backBtnPath: this.returnRoutePath,
        rightBtn: false
      })
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
