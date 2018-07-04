<template>
  <section class="plants-intro">
    <div class="intro-header">
      <h2>Welcome to</h2>
      <img
        src="/static/img/happyplants-logo.svg"
        alt="Happy Plants Logo"
        title="Happy Plants Logo"
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
      <h3>Happy organising!</h3>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'PlantsIntro',

    components: {
      'feather-settings': () =>
        import('vue-feather-icon/components/settings' /* webpackChunkName: "icons" */),
      'feather-grid': () =>
        import('vue-feather-icon/components/grid' /* webpackChunkName: "icons" */),
      'feather-box': () =>
        import('vue-feather-icon/components/box' /* webpackChunkName: "icons" */)
    }
  }
</script>

<style lang="postcss" scoped>
  section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 95%;

    & p {
      font-weight: 600;
    }
  }

  .intro-header {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    color: var(--text-color-inverse);
    margin-bottom: calc(var(--base-gap) / 2);

    & h2 {
      font-size: var(--text-size-large);
      margin-bottom: calc(-1 * var(--base-gap) / 2);
    }
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

    & h3 {
      font-size: var(--text-size-medium);
    }
  }
</style>
