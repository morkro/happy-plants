<template>
  <div class="notification-wrapper">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'Notifications',

    props: {
      message: {
        type: String,
        default: ''
      },
      timeout: {
        type: Number,
        default: 1000
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
