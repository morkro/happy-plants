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
  @import "~styles/colors";
  @import "~styles/layout";

  .notification-wrapper {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.8);
    color: $text-color-inverse;
    width: 100vw;
    height: $app-header-size;
    padding: 10px 15px;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
