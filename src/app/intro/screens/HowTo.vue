<template>
  <div class="intro-wrapper">
    <v-box class="intro-content">
      <h2>You're all set!</h2>
      <v-button @click.native="$router.push('/new')">
        <template v-slot:icon>
          <svgicon
            icon="leaf"
            width="20"
            height="28" />
        </template>
        <span>Add your first plant</span>
      </v-button>
    </v-box>

    <div class="intro-footer">
      <v-button color="plain" @click.native="$router.back()">
        <template v-slot:icon>
          <feather-left />
        </template>
        <span>Back</span>
      </v-button>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import '@/assets/icons/leaf'

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

    & button .button-icon svg {
      filter: invert(100%);
    }
  }

  .intro-footer {
    margin-top: var(--double-gap);
    color: var(--text-color-inverse);
    display: flex;
    justify-content: space-between;
  }
</style>
