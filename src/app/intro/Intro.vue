<template>
  <div class="main-wireframe">
    <div class="intro-header box">
      <img
        src="@/assets/happyplants-logo.svg"
        alt="HappyPlants Logo"
        title="HappyPlants Logo"
        width="100%">
    </div>

    <div class="intro-content box">
      <p>
        Looks like you haven't added any friends yet — here are some first steps to get you started!<br>
      </p>
      <ol>
        <li>
          <p>Tap on the bottom button to add your first plant.</p>
        </li>
        <li>
          <p>
            Now you can add different modules <span aria-hidden="true"><feather-box /></span>
            to keep track of your plant, as well as using tags to help you group them better.
          </p>
        </li>
        <li>
          <p>
            Later on, you can change the list view, filter by tags, or sorting by clicking on the view button
            <span aria-hidden="true"><feather-grid /></span> in the lower menu.
          </p>
        </li>
      </ol>
    </div>

    <div class="intro-footer">
      <router-link to="/add" class="btn yellow">
        <div class="button-icon">
          <svgicon
            icon="leaf"
            width="20"
            height="28" />
        </div>
        <span>Add your first plant</span>
      </router-link>
    </div>
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

    components: {
      'feather-settings': () =>
        import('vue-feather-icons/icons/SettingsIcon' /* webpackChunkName: "icons" */),
      'feather-grid': () =>
        import('vue-feather-icons/icons/GridIcon' /* webpackChunkName: "icons" */),
      'feather-box': () =>
        import('vue-feather-icons/icons/BoxIcon' /* webpackChunkName: "icons" */)
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

  .intro-content {
    padding: var(--base-gap);

    & ol {
      margin-top: var(--base-gap);
    }

    & li {
      margin-left: var(--base-gap);

      &:not(:last-child) {
        margin-bottom: var(--base-gap);
      }
    }

    & svg {
      display: inline-block;
      vertical-align: middle;
      width: calc(var(--icon-size-base) / 1.25);
      height: calc(var(--icon-size-base) / 1.25);
    }
  }

  .intro-footer {
    margin-top: calc(2 * var(--base-gap));
    color: var(--text-color-inverse);

    & .btn .button-icon svg {
      filter: none;
    }
  }
</style>
