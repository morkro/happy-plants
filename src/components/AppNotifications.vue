<template>
  <div class="notification-wrapper" v-if="message">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'AppNotifications',

    props: {
      message: {
        type: [String, Boolean],
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notification-wrapper {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.8);
    color: var(--text-color-inverse);
    width: calc(100% - var(--base-gap) * 2);
    height: var(--app-header-size);
    padding: 10px var(--base-gap);
    position: fixed;
    bottom: var(--base-gap);
    left: 50%;
    transform: translateX(-50%);
    border-radius: var(--border-radius);
  }
</style>
