<template>
  <div
    :class="['notification-wrapper', type]"
    role="alert"
    :aria-live="type !== 'alert' ? 'polite' : 'assertive'"
  >
    <!-- <component :is="icon()" /> -->
    <v-text color="special">{{ message }}</v-text>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { NotificationsState, NotificationsType } from '../store/state'

  export default Vue.extend({
    name: 'AppNotification',

    // components: {
    //   'feather-check': () =>
    //     import('vue-feather-icons/icons/CheckCircleIcon' /* webpackChunkName: "icons" */),
    //   'feather-alert': () =>
    //     import('vue-feather-icons/icons/AlertCircleIcon' /* webpackChunkName: "icons" */),
    // },

    computed: {
      ...mapState<NotificationsState>('notifications', {
        message: (state: NotificationsState): string | null => state.message,
        type: (state: NotificationsState): NotificationsType => state.type,
      }),
      icon(): string {
        let icon = 'feather-check'
        switch (this.type) {
          case 'info':
          case 'alert':
            icon = 'feather-alert'
            break
          case 'success':
          default:
            icon = 'feather-check'
        }
        return icon
      },
    },
  })
</script>

<style lang="postcss" scoped>
  .notification-wrapper {
    width: calc(100vw - 2 * var(--base-gap));
    position: fixed;
    z-index: 100;
    top: var(--app-header-height);
    left: var(--base-gap);
    right: var(--base-gap);
    background: var(--brand-blue);
    border-radius: var(--base-radius);
    color: var(--brand-white);
    padding: var(--base-gap);
    box-shadow: 0 2px 9px var(--brand-blue);
    display: flex;
    align-items: center;

    & svg {
      margin-right: var(--base-gap);
    }

    &.info svg {
      transform: rotate(180deg);
    }

    &.success {
      background: var(--brand-green);
      box-shadow: 0 2px 9px var(--brand-green);
    }

    &.alert {
      background: var(--brand-red);
      box-shadow: 0 2px 9px var(--brand-red);
    }
  }
</style>
