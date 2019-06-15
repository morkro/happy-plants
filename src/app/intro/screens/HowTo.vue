<template>
  <app-wireframe>
    <app-header>
      <template v-slot:title>
        <h1>Add first plant</h1>
      </template>
    </app-header>

    <main-content>
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
    </main-content>
  </app-wireframe>
</template>

<script>
  import '@/assets/icons/leaf'
  export default {
    name: 'IntroHowTo',

    meta: {
      title: 'Add first plant'
    },

    components: {
      'feather-left': () =>
        import('vue-feather-icons/icons/ArrowLeftIcon' /* webpackChunkName: "icons" */)
    }
  }
</script>

<style lang="postcss" scoped>
  .main-content {
    padding: var(--base-gap);
  }

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
