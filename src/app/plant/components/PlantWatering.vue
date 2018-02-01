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

<style lang="postcss" scoped>
  .watering-list {
    margin-top: var(--base-gap);
    display: flex;
    list-style: none;
    justify-content: space-between;

    & li {
      width: calc(100% / 3 - var(--base-gap) / 2);
    }

    & button {
      width: 100%;
      height: 44px;
      transition: transform var(--base-speed) * 2 var(--ease-out-back);

      &:not(.active) {
        background-color: var(--grey);
        box-shadow: none;
      }

      &.active {
        background-color: var(--brand-blue);
        box-shadow: var(--blue-shadow);
        transform: scale(1.05);
      }
    }
  }
</style>
