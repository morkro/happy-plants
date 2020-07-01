<template>
  <div :class="classes">
    <feather-loader v-if="loading" class="plant-preview-bg-svg" />

    <router-link v-else :to="link" class="plant-preview-wrapper">
      <div class="plant-preview-label">
        <v-text v-if="!loading" :color="photo && !listview ? 'special' : 'normal'">{{ label }}</v-text>
      </div>
      <div class="plant-preview-bg">
        <lazy-image v-if="photo" :src="photo" :alt="label" :title="label" />
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
        default: true,
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
      listview: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      'feather-camera': () =>
        import('vue-feather-icons/icons/CameraOffIcon' /* webpackChunkName: "icons" */),
      'feather-loader': () =>
        import('vue-feather-icons/icons/LoaderIcon' /* webpackChunkName: "icons" */),
    },
    computed: {
      classes(): Record<string, boolean> {
        return {
          'plant-preview': true,
          loading: this.loading,
          'no-photo': this.photo === null,
          listview: this.listview,
        }
      },
    },
  })
</script>

<style lang="postcss">
  .plant-preview {
    width: 100%;
    border-radius: var(--base-radius);
    overflow: hidden;

    &:not(.listview) {
      background: var(--brand-white);
    }

    &:not(.no-photo):not(.listview) .plant-preview-label {
      background-image: linear-gradient(
        to bottom,
        hsla(0, 0%, 0%, 0) 0%,
        hsla(0, 0%, 0%, 0) 0.5%,
        hsla(0, 0%, 0%, 0.002) 1.9%,
        hsla(0, 0%, 0%, 0.008) 4.2%,
        hsla(0, 0%, 0%, 0.019) 7.4%,
        hsla(0, 0%, 0%, 0.037) 11.5%,
        hsla(0, 0%, 0%, 0.064) 16.5%,
        hsla(0, 0%, 0%, 0.102) 22.4%,
        hsla(0, 0%, 0%, 0.152) 29.1%,
        hsla(0, 0%, 0%, 0.216) 36.7%,
        hsla(0, 0%, 0%, 0.296) 45.2%,
        hsla(0, 0%, 0%, 0.394) 54.5%,
        hsla(0, 0%, 0%, 0.512) 64.6%,
        hsla(0, 0%, 0%, 0.651) 75.6%,
        hsla(0, 0%, 0%, 0.813) 87.4%,
        hsl(0, 0%, 0%) 100%
      );
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

  .plant-preview-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    align-items: flex-end;
    text-decoration: none;

    @nest .listview & {
      display: grid;
      grid-template-columns: 70px 1fr;
      grid-gap: var(--base-gap);
      grid-template-areas: 'photo description';
      align-items: flex-start;
    }
  }

  .plant-preview-label {
    text-align: left;
    padding: var(--base-gap) calc(0.5 * var(--base-gap)) calc(0.5 * var(--base-gap));
    position: relative;
    z-index: 1;
    width: 100%;

    @nest .listview & {
      grid-area: description;
      padding: 0;
    }

    & .text {
      font-weight: 500;
    }
  }

  .plant-preview-bg {
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

    @nest .listview & {
      position: relative;
      grid-area: photo;
      background: var(--brand-white);
      border-radius: var(--base-radius);
      overflow: hidden;
    }
  }

  .plant-preview-bg-svg {
    width: 46px;
    height: 46px;
    stroke: var(--brand-beige);
  }
</style>
