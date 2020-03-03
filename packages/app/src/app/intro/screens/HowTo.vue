<template>
  <div class="intro-wrapper">
    <v-box class="intro-content">
      <h2>You're all set!</h2>
      <router-link to="/add" class="btn">
        <div class="button-icon">
          <svgicon
            icon="leaf"
            width="20"
            height="28"
          />
        </div>
        <span>Add your first plant</span>
      </router-link>
    </v-box>

    <div class="intro-footer">
      <router-link to="/intro/storage" class="btn plain">
        <div class="button-icon">
          <feather-left />
        </div>
        <span>Back</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'IntroHowTo',

    components: {
      'feather-left': () =>
        import('vue-feather-icons/icons/ArrowLeftIcon' /* webpackChunkName: "icons" */)
    },

    created () {
      this.updateAppHeader({
        title: 'Add first plant',
        transparent: false,
        backBtn: false,
        rightBtn: false
      })
    },

    methods: mapActions([
      'updateAppHeader'
    ])
  }
</script>

<style lang="postcss" scoped>
  .intro-content {
    padding: var(--base-gap);

    & h2 {
      margin-bottom: var(--base-gap);
    }

    & svg {
      filter: invert(100%);
    }
  }

  .intro-footer {
    margin-top: var(--double-gap);
    color: var(--text-color-inverse);
    display: flex;
    justify-content: space-between;

    & .btn .button-icon svg {
      filter: none;
    }
  }
</style>
