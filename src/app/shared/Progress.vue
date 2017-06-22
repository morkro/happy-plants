<template>
  <div class="progress-container">
    <progress :value="current" :max="steps"></progress>
    <span v-if="showInfo" :data-current="current" :data-steps="steps"></span>
  </div>
</template>

<script>
  export default {
    name: 'Progress',

    props: {
      current: { type: Number, default: 0 },
      steps: { type: Number, default: 0 },
      showInfo: { type: Boolean, default: true }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";
  @import "~styles/colors";
  @import "~styles/fonts";
  @import "~styles/animations";

  .progress-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  progress {
    flex: 1;
    appearance: none;
    height: 8px;
    width: 100%;

    &::-webkit-progress-bar {
      border-radius: 6px;
      background: rgba(0, 0, 0, .12);
    }

    &::-webkit-progress-value {
      border-radius: $border-radius;
      background: $yellow;
      box-shadow: 0 0 12px $yellow;
      transition: width $base-speed $ease-out-back;
    }
  }

  span {
    font-size: $text-size-xsmall;
    color: rgba(0, 0, 0, .35);
    margin-left: $base-gap;

    &:before {
      content: attr(data-current) " / ";
    }

    &:after {
      content: attr(data-steps);
    }
  }
</style>
