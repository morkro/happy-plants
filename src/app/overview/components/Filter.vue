<template>
  <section>
    <select @change="updateSelection">
      <option
        v-for="option in options"
        :selected="option.value === selected"
        :value="option.value">
        {{ option.name }}
      </option>
    </select>
  </section>
</template>

<script>
  export default {
    name: 'OverviewFilter',

    props: {
      selected: {
        type: String,
        default: 'latest'
      }
    },

    data () {
      return {
        options: [
          { value: 'latest', name: 'Latest' },
          { value: 'alphabetical', name: 'Alphabetical' }
        ]
      }
    },

    methods: {
      updateSelection (event) {
        const $option = event.target.options[event.target.options.selectedIndex]
        this.$emit('update-selection', $option.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";
  @import "~styles/fonts";

  select {
    appearance: none;
    background: rgba(0, 0, 0, .05);
    border-radius: $border-radius;
    border: none;
    color: $text-color-base;
    padding: 1.5vh 3vw;
    width: 100%;
    font-size: $text-size-small;
  }
</style>
