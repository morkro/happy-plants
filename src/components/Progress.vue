<template>
  <div class="progress-container">
    <progress :value="current" :max="steps"></progress>
    <span :data-current="current" :data-steps="steps"></span>
  </div>
</template>

<script>
  export default {
    name: 'Progress',
    props: {
      current: { type: Number, default: 0 },
      steps: { type: Number, default: 0 }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/variables";

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
      border-radius: 6px;
      background: $yellow;
    }
  }

  span {
    font-size: $text-size-xsmall;
    color: rgba(0, 0, 0, .35);
    margin-left: $base-gap * 2;

    &:before {
      content: attr(data-current) " / ";
    }

    &:after {
      content: attr(data-steps);
    }
  }
</style>
