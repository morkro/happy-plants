<template>
  <section class="plant-component">
    <header>
      <slot name="icon"></slot>
      <slot name="title"></slot>
    </header>
    <slot name="content"></slot>
  </section>
</template>

<script>
  export default {
    name: 'PlantComponentContainer'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  section.plant-component {
    background-color: $background-primary;
    width: 100%;
    padding: $base-gap;
    margin-bottom: 4px;
  }

  .plant-component header {
    display: flex;
    align-items: center;
    margin-bottom: $base-gap/2;

    svg {
      width: $icon-size-small;
      height: $icon-size-small;
      opacity: 0.5;
      margin-right: $base-gap/3;
    }
  }
</style>
