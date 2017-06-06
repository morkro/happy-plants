<template>
  <section>
    <select @change="updateSelection">
      <option v-for="option in options" value="option.value">{{ option.name }}</option>
    </select>
  </section>
</template>

<script>
  export default {
    name: 'OverviewFilter',
    data: () => ({
      options: [
        { value: 'latest', name: 'Latest' },
        { value: 'alphabetical', name: 'Alphabetical' },
        { value: 'category', name: 'Category' }
      ]
    }),
    methods: {
      updateSelection (event) {
        const $option = event.target.options[event.target.options.selectedIndex]
        this.$emit('update-selection', $option.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/variables";

  select {
    width: 100%;
  }
</style>
