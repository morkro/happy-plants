<template>
  <div :class="['plant-preview', loading && 'loading']">
    <feather-loader v-if="loading" class="plant-preview-bg-svg" />

    <router-link v-else :to="link" class="plant-preview-wrapper">
      <div class="plant-preview-label">
        <v-text v-if="!loading">{{ label }}</v-text>
      </div>
      <div class="plant-preview-bg">
        <img v-if="photo" :src="photo" :alt="label" :title="label" />
        <feather-camera v-else class="plant-preview-bg-svg" />
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Preview',
    props: {
      loading: {
        type: Boolean,
      },
      link: {
        type: String,
      },
      label: {
        type: String,
      },
      photo: {
        type: String,
      },
    },
    components: {
      'feather-camera': () =>
        import('vue-feather-icons/icons/CameraOffIcon' /* webpackChunkName: "icons" */),
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
    },
  })
</script>

<style lang="postcss" scoped>
  .plant-preview {
    width: 100%;
    border-radius: var(--base-radius);
    overflow: hidden;
    background: var(--brand-white);

    & .plant-preview-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      position: relative;
      align-items: flex-end;
      text-decoration: none;
    }

    & .plant-preview-label {
      text-align: left;
      padding: calc(0.5 * var(--base-gap)) calc(0.75 * var(--base-gap));
    }

    & .plant-preview-bg {
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & .plant-preview-bg-svg {
      width: 46px;
      height: 46px;
      stroke: var(--brand-beige);
    }

    &.loading {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      & > svg {
        animation: spin 3s linear infinite;
      }

      &::before,
      &::after {
        content: '';
        width: calc(100% - 1.5 * var(--base-gap));
        height: 16px;
        display: block;
        background: var(--brand-beige);
        border-radius: var(--base-radius);
        position: absolute;
        bottom: calc(0.5 * var(--base-gap));
        left: calc(0.75 * var(--base-gap));
      }

      &::after {
        width: 40%;
        transform: translateY(calc(-100% - 0.5 * var(--base-gap)));
      }
    }
  }
</style>
