<template>
  <plant-component>
    <feather-droplet slot="icon" />
    <h2 slot="title">Watering</h2>

    <div slot="content" class="watering-content">
      <plant-dialog
        class="watering-selection"
        :show="showRoutineSelection"
        :content-only="true"
        :actions="false"
        @close-dialog="closeRoutineDialog">
        <ul slot="content">
          <li v-for="type in messages.frequency" :key="type">
            <label :for="type">
              <input
                type="radio"
                name="watering-frequency"
                :id="type"
                :value="type"
                :checked="type === frequency"
                @change="onEmitFrequencyChange(type)">
              <span>{{ type }}</span>
            </label>
          </li>
        </ul>
      </plant-dialog>

      <div class="watering-description">
        <p>
          This plant has to be watered
          <button class="watering-routine" @click="selectRoutine">
            {{ frequency }}
          </button>
          and
          <strong class="watering-amount">
            {{ selectedAmount }}
          </strong>.
        </p>
      </div>

      <div class="droplet-canvas">
        <v-touch tag="div"
          :class="{ 'droplet': true, 'active': index <= (amount - 1) }"
          :key="item.level"
          v-for="(item, index) in amountLevels"
          @tap="onEmitAmountChange($event, item)" />
      </div>
    </div>
  </plant-component>
</template>

<script>
  import Dialog from '@/components/Dialog'
  import PlantComponent from './PlantComponent'
  export default {
    name: 'PlantWatering',

    components: {
      'plant-dialog': Dialog,
      'plant-component': PlantComponent,
      'feather-droplet': () =>
        import('vue-feather-icon/components/droplet' /* webpackChunkName: "plant" */)
    },

    props: {
      amount: { type: Number, default: 1 },
      frequency: { type: String, default: 'weekly' }
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
  .watering-content {
    display: flex;
    width: 100%;
  }

  .watering-description {
    width: 100%;
    flex: 1;

    & .watering-routine,
    & .watering-amount {
      display: inline-block;
    }
  }

  .droplet-canvas {
    position: relative;
    width: 30vw;
    min-height: 65px;
    z-index: 1;

    & .droplet {
      position: absolute;
      width: 42px;
      height: 42px;
      left: 50%;
      top: 50%;
      background: var(--grey);
      border-radius: 4% 50% 50% 50%;
      border: 2px solid var(--background-primary);
      transform: rotate(45deg) translate(-50%, -50%);
      transform-origin: 0 0;

      &.active {
        background: var(--brand-blue);

        &:nth-of-type(2) {
          background: var(--brand-blue-low);
        }
      }

      &:nth-of-type(1) {
        z-index: 3;
      }

      &:nth-of-type(2) {
        width: 100px;
        height: 100px;
        z-index: 2;
      }

      &:nth-of-type(3) {
        width: 145px;
        height: 145px;
        opacity: 0.1;
        z-index: 1;
      }
    }
  }
</style>
