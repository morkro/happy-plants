<template>
  <div class="screen-debug">
    <app-header return-to="/">Debugger</app-header>

    <main>
      <div class="text-wrap">
        <div>
          <v-text type="hero">Hero</v-text>
          <v-text type="title">Title</v-text>
          <v-text type="subtitle">Subtitle</v-text>
          <v-text>Paragraph</v-text>
          <v-text small>Paragraph small</v-text>
          <v-text type="input">Input</v-text>
          <v-text type="input" small>Input small</v-text>
          <v-text type="button">Button</v-text>
          <v-text type="button" small>Button small</v-text>
        </div>
        <div>
          <v-text type="hero" color="inactive">Hero</v-text>
          <v-text type="title" color="inactive">Title</v-text>
          <v-text type="subtitle" color="inactive">Subtitle</v-text>
          <v-text color="inactive">Paragraph</v-text>
          <v-text small color="inactive">Paragraph small</v-text>
          <v-text type="input" color="inactive">Input</v-text>
          <v-text type="input" color="inactive" small>Input small</v-text>
          <v-text type="button" color="inactive">Button</v-text>
          <v-text type="button" color="inactive" small>Button small</v-text>
        </div>
        <div style="background: var(--brand-green);">
          <v-text type="hero" color="special">Hero</v-text>
          <v-text type="title" color="special">Title</v-text>
          <v-text type="subtitle" color="special">Subtitle</v-text>
          <v-text color="special">Paragraph</v-text>
          <v-text small color="special">Paragraph small</v-text>
          <v-text type="input" color="special">Input</v-text>
          <v-text type="input" color="special" small>Input small</v-text>
          <v-text type="button" color="special">Button</v-text>
          <v-text type="button" color="special" small>Button small</v-text>
        </div>
        <div>
          <v-text type="hero" color="warning">Hero</v-text>
          <v-text type="title" color="warning">Title</v-text>
          <v-text type="subtitle" color="warning">Subtitle</v-text>
          <v-text color="warning">Paragraph</v-text>
          <v-text small color="warning">Paragraph small</v-text>
          <v-text type="input" color="warning">Input</v-text>
          <v-text type="input" color="warning" small>Input small</v-text>
          <v-text type="button" color="warning">Button</v-text>
          <v-text type="button" color="warning" small>Button small</v-text>
        </div>
      </div>

      <div class="btn-wrap">
        <div>
          <v-button>Default</v-button>
          <v-button color="blue">Blue</v-button>
          <v-button color="yellow">Yellow</v-button>
          <v-button color="red">Red</v-button>
          <v-button color="grey">Grey</v-button>
          <v-button disabled>Disabled</v-button>
        </div>
        <div>
          <v-button round>
            <feather-loader />
            <span class="visuallyhidden">Default</span>
          </v-button>
          <v-button round color="blue">
            <feather-loader />
            <span class="visuallyhidden">Blue</span>
          </v-button>
          <v-button round color="yellow">
            <feather-loader />
            <span class="visuallyhidden">Yellow</span>
          </v-button>
          <v-button round color="red">
            <feather-loader />
            <span class="visuallyhidden">Red</span>
          </v-button>
          <v-button round color="grey">
            <feather-loader />
            <span class="visuallyhidden">Grey</span>
          </v-button>
          <v-button round disabled>
            <feather-loader />
            <span class="visuallyhidden">Disabled</span>
          </v-button>
        </div>
        <div>
          <v-button small>Default</v-button>
          <v-button small color="blue">Blue</v-button>
          <v-button small color="yellow">Yellow</v-button>
          <v-button small color="red">Red</v-button>
          <v-button small color="grey">Grey</v-button>
          <v-button small disabled>Disabled</v-button>
        </div>
        <div>
          <v-button round small>
            <feather-loader />
            <span class="visuallyhidden">Default</span>
          </v-button>
          <v-button round small color="blue">
            <feather-loader />
            <span class="visuallyhidden">Blue</span>
          </v-button>
          <v-button round small color="yellow">
            <feather-loader />
            <span class="visuallyhidden">Yellow</span>
          </v-button>
          <v-button round small color="red">
            <feather-loader />
            <span class="visuallyhidden">Red</span>
          </v-button>
          <v-button round small color="grey">
            <feather-loader />
            <span class="visuallyhidden">Grey</span>
          </v-button>
          <v-button round small disabled>
            <feather-loader />
            <span class="visuallyhidden">Disabled</span>
          </v-button>
        </div>
        <div style="background:var(--brand-green);">
          <v-button border>Default</v-button>
          <v-button border color="blue">Blue</v-button>
          <v-button border color="yellow">Yellow</v-button>
          <v-button border color="red">Red</v-button>
          <v-button border color="grey">Grey</v-button>
          <v-button border disabled>Disabled</v-button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'debug',
    components: {
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
    },
  })
</script>

<style lang="postcss" scoped>
  .screen-debug {
    width: 100%;
  }

  .screen-debug main {
    display: grid;

    & div > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
    }

    & .text-wrap {
      display: grid;
      grid-template-columns: 50% 50%;
    }

    & .btn-wrap {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 50% 50%;

      & .btn {
        margin-bottom: 10px;
      }
    }
  }
</style>
