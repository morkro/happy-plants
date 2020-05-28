<template>
  <header id="app-header">
    <div class="app-header-icon">
      <router-link v-if="returnTo" :to="returnTo">
        <feather-left />
        <v-text class="visuallyhidden" color="inactive">Back</v-text>
      </router-link>
      <img v-else src="@/assets/logo-small.svg" width="32" height="28" alt="HappyPlants Logo" />
    </div>

    <v-text type="subtitle" :color="titleColor" class="app-header-title">
      <slot>HappyPlants</slot>
    </v-text>
  </header>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'AppHeader',

    components: {
      'feather-left': () =>
        import('vue-feather-icons/icons/ArrowLeftIcon' /* webpackChunkName: "icons" */),
    },

    props: {
      returnTo: {
        type: [String, Boolean],
        default: false,
      },
      color: {
        type: String,
        default: 'green',
        validator: v => ['white', 'green'].includes(v),
      },
    },

    computed: {
      titleColor(): string {
        if (this.color === 'white') {
          return 'special'
        }
        return 'normal'
      },
    },
  })
</script>

<style lang="postcss" scoped>
  #app-header {
    width: 100%;
    height: var(--app-header-height);
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .app-header-icon {
    height: 100%;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    & svg {
      stroke: var(--brand-green-dark);
    }

    & > a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      &:focus {
        outline: none;
        background: var(--brand-white);
        border-bottom-right-radius: var(--base-radius);
      }
    }
  }

  .app-header-title {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: 700 !important;
  }
</style>
