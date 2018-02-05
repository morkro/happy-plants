<template>
  <plant-component>
    <feather-droplet slot="icon" />
    <h2 slot="title">Watering</h2>

    <div slot="content" class="watering-slider">
      <input
        type="range"
        @input="updateRangeValue"
        :value="actualLevel"
        :min="minLevel"
        :max="maxLevel"
        step="5"
        :style="defaultInputProperties">
    </div>
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
      amount: { type: Number, default: 5 }
    },

    computed: {
      defaultInputProperties () {
        return `--min: ${this.minLevel}; --max: ${this.maxLevel}; --val: ${this.actualLevel}`
      }
    },

    data () {
      return {
        maxLevel: 100,
        minLevel: 5,
        actualLevel: this.amount
      }
    },

    methods: {
      updateRangeValue (event) {
        if (!(event && event.target)) return
        event.target.style.setProperty('--val', +event.target.value)
        this.$emit('update-plant', {
          type: 'watering',
          payload: { level: +event.target.value }
        })
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .watering-slider {
    margin-top: var(--base-gap);
  }

  /**
   * This slider magic is taken from:
   * https://css-tricks.com/sliding-nightmare-understanding-range-input/
   * All kudos to Ana Tudor.
   */
  .watering-slider input[type=range] {
    --range: calc(var(--max) - var(--min));
    --ratio: calc((var(--val) - var(--min)) / var(--range));
    --sx: calc(22.5px + var(--ratio) * (100% - 45px));

    margin: 0;
    padding: 0;
    width: 100%;
    height: 37px;
    border-radius: var(--border-radius);
    background: var(--grey);

    &,
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
    }

    &::-webkit-slider-runnable-track {
      box-sizing: border-box;
      border: none;
      width: 100%;
      height: 45px;
      border-radius: var(--border-radius);
      background: var(--grey);
      background:
        linear-gradient(var(--brand-blue), var(--brand-blue))
        0/ var(--sx) 100% no-repeat transparent;
    }

    &::-moz-range-track,
    &::-ms-track {
      box-sizing: border-box;
      border: none;
      width: 100%;
      height: 45px;
      background: var(--grey);
    }

    &::-moz-range-progress,
    &::-ms-fill-lower {
      height: 45px;
      background: var(--grey);
    }

    &::-webkit-slider-thumb {
      box-sizing: border-box;
      border: none;
      width: 45px;
      height: 45px;
      background: var(--brand-blue);
      border-radius: var(--border-radius);
    }

    &::-moz-range-thumb {
      box-sizing: border-box;
      border: none;
      width: 45px;
      height: 45px;
      background: var(--brand-blue);
      border-radius: var(--border-radius);
    }

    &::-ms-thumb {
      margin-top: 0;
      box-sizing: border-box;
      border: none;
      width: 45px;
      height: 45px;
      background: var(--brand-blue);
    }

    &::-ms-tooltip {
      display: none;
    }
  }
</style>
