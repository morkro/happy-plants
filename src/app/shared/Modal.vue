<template>
  <section v-if="show">
    <header class="modal-header">
      <button @click.prevent="emitModalClose" class="circle">
        ✕
      </button>
      <slot name="headline"></slot>
    </header>
    <slot name="content"></slot>
  </section>
</template>

<script>
  export default {
    name: 'Modal',

    props: {
      show: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      emitModalClose () {
        this.$emit('close-modal')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/fonts";
  @import "~styles/layout";
  @import "~styles/z-index";

  section {
    width: 100%;
    min-height: 100vh;
    height: auto;
    background: $background-secondary;
    position: absolute;
    top: 0;
    left: 0;
    padding: $base-gap;
    z-index: z($page-elements, modals);
  }

  .modal-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: $base-gap;

    button {
      margin-right: $base-gap + 5;
      background: $background-primary;
      color: $link-color;
    }

    h1 {
      font-size: $text-size-large;
      font-weight: 600;
      line-height: 115%;
      margin-top: 8px;
    }
  }
</style>
