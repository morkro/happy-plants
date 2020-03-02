<template>
  <plant-component>
    <template v-slot:icon>
      <feather-droplet />
    </template>

    <template v-slot:title>
      <h2>Watering</h2>
    </template>

    <template v-slot:content>
      <div class="watering-description">
        <p>
          This plant has to be watered
          <v-button
            class="watering-routine"
            @click="selectRoutine"
          >
            {{ frequency }}
          </v-button>
          and
          <strong class="watering-amount">
            {{ selectedAmount }}
          </strong>.
        </p>
      </div>

      <div class="droplet-canvas">
        <div
          v-for="(item, index) in amountLevels"
          :key="item.level"
          :class="{ 'droplet': true, 'active': index <= (amount - 1) }"
          @click="onEmitAmountChange($event, item)"
        />
        <div :class="{ 'droplet-background': true, 'active': amount >= 3 }"/>
      </div>
    </template>
  </plant-component>
</template>

<script>
  import { DropletIcon } from 'vue-feather-icons'
  import ModuleComponent from './ModuleComponent'
  export default {
    name: 'PlantWatering',

    components: {
      'plant-component': ModuleComponent,
      'feather-droplet': DropletIcon
    },

    props: {
      amount: { type: Number, default: 1 },
      frequency: { type: String, default: 'weekly' }
    },

    data () {
      return {
        showRoutineSelection: false,
        amountLevels: [{ amount: 1 }, { amount: 2 }, { amount: 3 }],
        messages: {
          frequency: [
            'daily',
            'semi-weekly',
            'weekly',
            'fortnightly',
            'monthly'
          ],
          amount: [
            'just a bit',
            'moderate',
            'a lot'
          ]
        }
      }
    },

    computed: {
      selectedAmount () {
        let index = this.amount - 1

        // This is only needed for converting legacy module data.
        if (this.amount > 3) {
          if (this.amount > 3 && this.amount < 33) index = 0
          if (this.amount >= 33 && this.amount < 66) index = 1
          if (this.amount >= 66) index = 2
        }

        return this.messages.amount[index]
      }
    },

    methods: {
      onEmitAmountChange (event, { amount }) {
        this.$emit('update-plant', {
          type: 'watering',
          payload: {
            amount,
            frequency: this.frequency
          }
        })
        event.target && event.target.blur()
      },

      onEmitFrequencyChange (frequency) {
        this.showRoutineSelection = false
        this.$emit('update-plant', {
          type: 'watering',
          payload: {
            amount: this.amount,
            frequency
          }
        })
      },

      selectRoutine () {
        this.showRoutineSelection = true
      },

      closeRoutineDialog () {
        this.showRoutineSelection = false
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .watering-description {
    color: var(--text-color-secondary);
    width: 100%;
    flex: 1;
    padding-right: var(--base-gap);

    & .watering-routine,
    & .watering-amount {
      display: inline-block;
    }
  }

  .watering-routine {
    --button-background: var(--brand-blue);
    --button-shadow: var(--brand-blue);
    --button-focus: var(--brand-blue-low);
    padding: calc(var(--base-gap) / 2) calc(var(--base-gap) / 2);
    margin-top: calc(var(--base-gap) / 4);
    color: var(--brand-blue);
    font-weight: 500;
  }

  .droplet-canvas {
    --droplet-color: var(--grey);

    position: relative;
    width: 30%;
    min-height: 65px;
    z-index: 1;
    align-self: center;

    & .droplet-background {
      position: absolute;
      z-index: 0;
      background: var(--droplet-color);
      opacity: 0.33;
      right: 50%;
      top: 0;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      transform: translate(166%, -150%);

      &.active {
        --droplet-color: var(--brand-blue);
      }

      &::after,
      &::before {
        content: "";
        width: 100%;
        height: 100%;
        background: var(--droplet-color);
        border-radius: 50%;
        position: absolute;
      }

      &::after {
        transform: scale(0.7) translate(90%, 155%);
      }

      &::before {
        transform: scale(0.3) translateY(42vh);
      }
    }

    & .droplet {
      --droplet-size: 42px;
      position: absolute;
      width: var(--droplet-size);
      height: var(--droplet-size);
      left: 0;
      bottom: 0;
      background: var(--grey);
      border-radius: 4% 50% 50% 50%;
      border: 2px solid var(--background-primary);
      transform: rotate(45deg);
      overflow: hidden;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 4% 50% 50% 50%;
        background: var(--brand-blue);
        transform: scale(0);
        transform-origin: 100% 100%;
        transition: transform calc(2.5 * var(--base-speed)) var(--ease-out-back);
      }

      &.active::after {
        transform: scaleY(1);
      }

      &:nth-of-type(1) {
        z-index: 3;
        top: 50%;
        transform: rotate(45deg) translateX(-50%);
      }

      &:nth-of-type(2) {
        --droplet-size: 80px;
        transform: rotate(45deg) translate(-12%, 21%);
        opacity: 0.5;
        z-index: 2;
      }

      &:nth-of-type(3) {
        --droplet-size: 125px;
        transform: rotate(45deg) translate(-1%, 22%);
        opacity: 0.33;
        z-index: 1;
      }
    }
  }
</style>
