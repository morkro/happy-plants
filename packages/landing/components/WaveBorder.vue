<template>
  <svg
    :class="['wave-border', color]"
    viewBox="0 0 500 150"
    preserveAspectRatio="none"
  >
    <path d="M0.00,49.98 C243.79,87.33 234.76,6.42 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"></path>
  </svg>
</template>

<script>
  const colors = ['white', 'black', 'blue']
  export default {
    name: 'WaveBorder',
    props: {
      color: {
        type: String,
        default: colors[0],
        validator: v => colors.includes(v)
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .wave-border {
    height: 150px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-54%);
    stroke: none;
    z-index: 0;

    &.white {
      fill: white;
    }

    &.black {
      fill: var(--custom-black);
    }

    &.blue {
      fill: var(--brand-blue);
    }
  }
</style>
