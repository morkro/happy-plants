<template>
  <label :for="name" data-step="1">
    <h2 :class="{ required }">{{ label }}</h2>
    <span v-if="description">{{ description }}</span>
    <input ref="input"
      :name="name"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      @change="emitValue">
  </label>
</template>

<script>
  export default {
    name: 'LabelGroup',

    props: {
      required: { type: Boolean, default: false },
      label: { type: String },
      description: { type: String },
      name: { type: String },
      placeholder: { type: String },
      type: { type: String, default: 'text' }
    },

    methods: {
      getInputValue () {
        const data = { type: this.type, payload: undefined }

        if (this.$refs.input.files && this.$refs.input.files.length) {
          data.payload = this.$refs.input.files[0]
        } else if (this.$refs.input.value) {
          data.payload = this.$refs.input.value
        }

        return data
      },
      emitValue () {
        this.$emit('process-step', this.getInputValue())
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";
  @import "~styles/fonts";

  label {
    position: relative;
    display: block;
  }

  h2 {
    margin-bottom: $base-gap / 2;

    &.required:after {
      color: $yellow;
      content: " *";
      font-size: $text-size-small;
    }
  }

  span {
    display: block;
    color: $text-color-secondary;
    font-size: $text-size-small;
    margin-bottom: $base-gap / 2;
    padding: 0 1px;
  }

  input {
    width: 100%;

    &:not([type="file"]) {
      display: block;
      height: 100%;
    }
  }
</style>
