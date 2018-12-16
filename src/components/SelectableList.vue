<template>
  <v-touch tag="ul"
    rel="selectableList"
    v-bind="$attrs"
    v-on="$listeners"
    @press="onPressList">
    <li
      v-for="(item, index) in items"
      :key="item.guid || index"
      :class="{ selected: selected.find(s => s.guid === item.guid)}">
      <slot :data="item" />
    </li>
  </v-touch>
</template>

<script>
  export default {
    name: 'SelectableList',

    props: {
      items: { type: Array, required: true }
    },

    data: () => ({
      selected: []
    }),

    methods: {
      onPressList (event) {
        const $rootList = Array.from(event.target.closest('ul').children)
        const selectedIndex = $rootList.findIndex($el => $el === event.target.closest('li'))
        const selected = this.items[selectedIndex]
        this.selected.push({ guid: selected.guid })
        this.$emit('selected', this.selected)
      },

      clearSelection () {
        this.selected = []
      }
    }
  }
</script>
