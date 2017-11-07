<template>
  <plant-component>
    <feather-droplet slot="icon" />
    <h2 slot="title">Watering</h2>
    <ul slot="content" class="watering-list">
      <v-touch
        tag="li"
        v-for="(level, index) of levels"
        :key="`level-${index}`"
        @tap="emitContentChange($event, level)"
        @click="emitContentChange($event, level)">
        <button
          :class="{ active: index <= (amount-1), 'no-shadow': index > (amount-1) }">
        </button>
      </v-touch>
    </ul>
  </plant-component>
</template>

<script>
  import PlantComponent from './PlantComponent'
  export default {
    name: 'PlantWatering',

    components: {
      'plant-component': PlantComponent,
      'feather-droplet': () =>
        import('vue-feather-icon/components/droplet' /* webpackChunkName: "plant" */)
    },

    props: {
      amount: { type: Number, default: 1 }
    },

    data () {
      return {
        levels: [{ level: 1 }, { level: 2 }, { level: 3 }]
      }
    },

    methods: {
      emitContentChange (event, level) {
        this.$emit('update-plant', { type: 'watering', payload: level })
        event.target && event.target.blur()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/fonts";
  @import "~styles/layout";
  @import "~styles/animations";

  .watering-list {
    margin-top: $base-gap;
    display: flex;
    list-style: none;
    justify-content: space-between;

    li {
      width: calc(100% / 3 - #{$base-gap} / 2);
    }

    button {
      width: 100%;
      height: 44px;
      transition: transform $base-speed * 2 $ease-out-back;

      &:not(.active) {
        background-color: $grey;
        box-shadow: none;
      }

      &.active {
        background-color: $blue;
        box-shadow: $blue-shadow;
        transform: scale(1.1);
      }
    }
  }
</style>
