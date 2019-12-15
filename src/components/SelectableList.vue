<template>
  <v-touch
    tag="ul"
    ref="selectableList"
    :class="['selectable-list', { 'edit-mode': editMode }]"
    v-bind="$attrs"
    v-on="filterListeners"
    @tap="onTapList"
    @click="onTapList"
    @press="onPressList"
  >
    <li
      v-for="(item, index) in items"
      :key="item.guid || index"
      :class="{ selected: isSelected(item.guid) }"
    >
      <slot :data="item" :selected="isSelected(item.guid)" />
    </li>
  </v-touch>
</template>

<script>
  export default {
    name: 'SelectableList',

    props: {
      items: { type: Array, required: true },
      onList: { type: Function, default: () => {} }
    },

    data: () => ({
      selected: [],
      editMode: false
    }),

    watch: {
      selected (list) {
        if (list.length === 0) {
          this.editMode = false
        }
      },
      editMode (value) {
        this.$emit('edit-mode', value)
      }
    },

    computed: {
      filterListeners () {
        const { tap, click, press, ...rest } = this.$listeners
        return rest
      }
    },

    methods: {
      isSelected (guid) {
        return this.selected.some(s => s.guid === guid)
      },

      onPressList () {
        if (!this.editMode) {
          this.editMode = true
        }
      },

      onTapList (event) {
        if (this.editMode) {
          this.toggleItemSelection(event.target.closest('li'))
          this.$emit('selected', this.selected)
        } else {
          this.$listeners.tap(event)
        }
      },

      toggleItemSelection (item) {
        const $selectableList = Array.from(this.$refs.selectableList.$el.children)
        const selectedIndex = $selectableList.findIndex($el => $el === item)
        const selected = this.items[selectedIndex]

        if (this.selected.find(s => s.guid === selected.guid)) {
          this.selected = this.selected.filter(s => s.guid !== selected.guid)
        } else {
          this.selected.push(selected)
        }
      },

      clearSelection () {
        this.editMode = false
        this.selected = []
        this.$emit('selected', this.selected)
      }
    }
  }
</script>
