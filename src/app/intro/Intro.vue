<template>
  <div class="main-wireframe">
    <div class="intro-header box">
      <img
        src="@/assets/happyplants-logo.svg"
        alt="HappyPlants Logo"
        title="HappyPlants Logo"
        width="100%">
    </div>

    <router-view class="intro-wrapper" />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import '@/assets/icons/leaf'

  export default {
    name: 'Intro',

    meta: {
      title: 'Welcome to HappyPlants!'
    },

    methods: mapActions([
      'updateAppHeader'
    ]),

    created () {
      this.updateAppHeader({
        title: 'Welcome to',
        transparent: true,
        backBtn: false,
        settingsBtn: true
      })
    },

    beforeDestroy () {
      this.updateAppHeader({ transparent: false })
    }
  }
</script>

<style lang="postcss" scoped>
  .main-wireframe {
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    min-height: 100vh;
    background: var(--brand-green);
    padding-left: var(--base-gap);
    padding-right: var(--base-gap);
    padding-bottom: var(--base-gap);

    & p {
      font-weight: 500;
    }
  }

  .intro-header {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: calc(var(--base-gap) * 2);
  }

  .intro-wrapper {
    width: 100%;
  }
</style>
