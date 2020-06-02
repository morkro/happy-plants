<template>
  <header id="app-header" :class="[color]">
    <div class="app-header-essentials">
      <div class="app-header-icon">
        <router-link v-if="returnTo" :to="returnTo">
          <feather-left />
          <v-text class="visuallyhidden" color="inactive">Back</v-text>
        </router-link>
        <app-logo :color="color" v-else />
      </div>

      <v-text type="subtitle" :color="titleColor" class="app-header-title">
        <slot>HappyPlants</slot>
      </v-text>
    </div>

    <slot name="actions" />
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
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 1;

    & .app-header-essentials {
      display: grid;
      align-items: center;
      height: 100%;
      grid-template-columns: auto auto;
    }
  }

  .app-header-icon {
    height: 100%;
    min-width: var(--app-header-height);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 var(--base-gap);

    & svg:not(#app-logo) {
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
