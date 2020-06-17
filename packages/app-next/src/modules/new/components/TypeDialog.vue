<template>
  <app-dialog id="dialog-types" :show="show" @close-dialog="$emit('close-dialog')">
    <template v-slot:headline>Select a type</template>

    <ul>
      <li>
        <label for="type-empty">
          <v-input
            type="radio"
            id="type-empty"
            name="type"
            value="empty"
            :checked="selected === null"
            @click.native="updatetype(null)"
          />
          <v-text>Leave empty</v-text>
        </label>
      </li>
      <li v-for="type of types" :key="type.guid">
        <label :for="`type-${type.value}`">
          <v-input
            type="radio"
            :id="`type-${type.value}`"
            name="type"
            :value="type.value"
            :checked="type.guid === selected && selected.guid"
            @click.native="updatetype(type)"
          />
          <v-text>{{ type.label }}</v-text>
        </label>
      </li>
    </ul>
  </app-dialog>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import types from '@/data/types'
  import { PlantType } from '@/types/plant'

  export default Vue.extend({
    name: 'TypeDialog',
    props: {
      show: { type: Boolean, default: false },
      selected: { type: Object as PropType<PlantType> },
    },
    data() {
      return {
        types,
      }
    },
    methods: {
      updatetype(type: PlantType | null): void {
        this.$emit('type-selected', type)
      },
    },
  })
</script>

<style lang="postcss">
  #dialog-types ul {
    list-style: none;

    & label {
      display: flex;
    }

    & li:not(:last-child) label {
      padding-bottom: var(--base-gap);
    }

    & input {
      margin-right: var(--base-gap);
    }
  }
</style>
