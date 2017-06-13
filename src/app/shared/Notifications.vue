<template>
  <div class="notification-wrapper" v-if="message">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'Notifications',

    props: {
      message: {
        type: [String, Boolean],
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/variables";

  .notification-wrapper {
    background: rgba(0, 0, 0, .8);
    color: $text-color-inverse;
    width: 90vw;
    padding: 10px 15px;
    border-radius: $border-radius;
    position: fixed;
    top: 55px;
    left: 5vw;
  }
</style>
