<template>
  <label :for="name" data-step="1">
    <h2>{{ label }}</h2>
    <input :name="name" :type="type" :placeholder="placeholder">
    <button class="rounded">
      <svg-icon icon="right-arrow" width="25" height="25" color="#000000"></svg-icon>
    </button>
  </label>
</template>

<script>
  export default {
    name: 'LabelGroup',

    props: {
      label: { type: String },
      name: { type: String },
      placeholder: { type: String },
      type: { type: String, default: 'text' }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/variables";

  label {
    position: relative;
  }

  h2 {
    position: absolute;
    color: $text-color-button;
    left: 0;
    top: 0;
    transform: translateY(-140%);
  }

  input {
    width: 100%;
    padding-right: 47px;

    &:not([type="file"]) {
      display: block;
      height: 100%;
    }
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    box-shadow: none;
    padding: $base-gap - 3;
  }
</style>
