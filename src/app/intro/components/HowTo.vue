<template>
  <div class="intro-wrapper">
    <div class="intro-content box">
      <h2>
        Looks like you haven't added any friends yet
      </h2>
      <p>
        Here are some first steps to get you started!
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
      <router-link to="/intro/storage" class="btn plain">
        <div class="button-icon">
          <feather-left />
        </div>
        <span>Back</span>
      </router-link>

      <router-link to="/add" class="btn">
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
  export default {
    name: 'IntroHowTo',

    components: {
      'feather-settings': () =>
        import('vue-feather-icons/icons/SettingsIcon' /* webpackChunkName: "icons" */),
      'feather-grid': () =>
        import('vue-feather-icons/icons/GridIcon' /* webpackChunkName: "icons" */),
      'feather-box': () =>
        import('vue-feather-icons/icons/BoxIcon' /* webpackChunkName: "icons" */),
      'feather-left': () =>
        import('vue-feather-icons/icons/ArrowLeftIcon' /* webpackChunkName: "icons" */)
    }
  }
</script>

<style lang="postcss" scoped>
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
    display: flex;
    justify-content: space-between;

    & .btn .button-icon svg {
      filter: none;
    }
  }
</style>
