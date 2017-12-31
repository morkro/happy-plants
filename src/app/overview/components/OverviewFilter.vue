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
        default: 'latest',
        validate (input) {
          return [
            'latest',
            'alphabetical',
            'categories'
          ].includes(input)
        }
      }
    },

    data () {
      return {
        options: [
          { value: 'latest', name: 'Latest' },
          { value: 'alphabetical', name: 'Alphabetical' },
          { value: 'categories', name: 'Categories' }
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
  select {
    background: rgba(0, 0, 0, 0.05);
    padding: 1.5vh 3vw;
  }
</style>
