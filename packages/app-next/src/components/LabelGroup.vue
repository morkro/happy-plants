<template>
  <label :for="id">
    <v-text :color="titleColor">{{ label }}</v-text>
    <slot :label="ariaDescribedBy" />
    <div :class="{ 'error-container': true, visible: !!error }">
      <feather-alert />
      <v-text :id="ariaDescribedBy" small color="special">{{ error }}</v-text>
    </div>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue'
  let id = 0
  export default Vue.extend({
    name: 'LabelGroup',
    props: {
      error: [Boolean, String],
      id: String,
      label: String,
      color: {
        type: String,
        default: 'white',
        validator: v => ['white', 'green'].includes(v),
      },
    },
    components: {
      'feather-alert': () =>
        import('vue-feather-icons/icons/AlertCircleIcon' /* webpackChunkName: "icons" */),
    },
    computed: {
      ariaDescribedBy() {
        return `labelgroup-${id}`
      },
      titleColor(): string {
        if (this.color === 'white') {
          return 'special'
        }
        return 'normal'
      },
    },
    created() {
      id++
    },
  })
</script>

<style lang="postcss" scoped>
  label {
    margin-bottom: var(--base-gap);
    display: block;
  }

  label > p {
    margin-bottom: var(--base-gap);
  }

  label > input {
    width: 100%;
  }

  label > * + .error-container {
    display: none;
    align-items: center;
    width: 100%;
    background: var(--brand-red);
    padding: calc(0.5 * var(--base-gap));
    border-bottom-left-radius: var(--base-radius);
    border-bottom-right-radius: var(--base-radius);

    &.visible {
      display: grid;
      grid-template-columns: 14px 1fr;
      grid-gap: calc(0.5 * var(--base-gap));
      align-items: start;
    }

    & svg {
      height: 14px;
      width: 14px;
      stroke: var(--brand-white);
      margin-top: 5px;
    }
  }
</style>
