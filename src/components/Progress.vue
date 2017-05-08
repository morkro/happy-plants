<template>
  <div class="progress-container">
    <progress value="0" max="4"></progress>
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
  }

  span {
    font-size: $text-size-xsmall;
    margin-left: $base-gap * 2;

    &:before {
      content: attr(data-current) " / ";
    }

    &:after {
      content: attr(data-steps);
    }
  }
</style>
