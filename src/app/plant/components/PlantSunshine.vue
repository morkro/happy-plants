<template>
  <plant-component>
    <feather-sun slot="icon" />
    <h2 slot="title">Sunshine</h2>

    <div slot="content">
      <div class="sunshine-description">
        <p class="description-level"><strong>Intensity: {{ intensity }}</strong></p>
        <p>{{ intensityDescription }}</p>
      </div>
      <div :class="`sunshine-canvas intensity-${intensity}`">
        <v-touch
          tag="div"
          v-for="(level, index) of insenityLevels"
          :key="`intensity-${index}`"
          :class="{ active: isActiveLevel(index) }"
          @tap="onEmitIntensityChange($event, level)"
          @click="onEmitIntensityChange($event, level)" />
      </div>
    </div>
  </plant-component>
</template>

<script>
  import PlantComponent from './PlantComponent'
  export default {
    name: 'PlantSunshine',

    components: {
      'plant-component': PlantComponent,
      'feather-sun': () =>
        import('vue-feather-icon/components/sun' /* webpackChunkName: "plant" */)
    },

    props: {
      intensity: { type: Number, default: 1 },
      messages: { type: [Object, Boolean], default: false }
    },

    data () {
      return {
        insenityLevels: [{ level: 1 }, { level: 2 }, { level: 3 }],
        defaultMessages: {
          intensity: [
            'This plant doesn\'t require a lot of sun, shade is also fine.',
            'This plant needs bright, indirect, or filtered light but no direct sun.',
            'This plant needs a lot of direct, bright sun to partial shade!'
          ]
        }
      }
    },

    computed: {
      intensityDescription () {
        const messages = this.messages
          ? this.messages.intensity
          : this.defaultMessages.intensity

        return messages[this.intensity - 1]
      }
    },

    methods: {
      isActiveLevel (index) {
        return index <= (this.intensity - 1)
      },
      onEmitIntensityChange (event, level) {
        this.$emit('update-plant', { type: 'sunshine', payload: level })
        event.target && event.target.blur()
      }
    }
  }
</script>

<style lang="postcss" scoped>
  section {
    position: relative;
  }

  .sunshine-description {
    color: var(--text-color-secondary);
    width: 50%;
    position: relative;
    z-index: 0;

    & .description-level {
      margin-bottom: calc(var(--base-gap) / 2);
    }
  }

  .sunshine-canvas {
    width: 50%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;

    & > div {
      --base-sunshine-value: 40px;
      --base-sunshine-radius: var(--base-sunshine-value);
      --max-sunshine-rings: 3;

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: var(--base-sunshine-radius);
      height: var(--base-sunshine-radius);
      border-radius: 50%;
      border: 2px solid white;
      background-color: var(--grey);
      z-index: var(--max-sunshine-rings);
      transition: background-color calc(var(--base-speed) * 2) var(--ease-out-expo);

      &.active {
        background-color: var(--brand-yellow);
      }

      @nest .intensity-1 &.active:first-of-type {
        box-shadow: 0 0 10px 3px var(--brand-yellow);
      }

      &.active:first-of-type {
        box-shadow: 0 0 30px 3px var(--brand-yellow);
      }

      &:nth-of-type(2) {
        --base-sunshine-radius: calc(var(--base-sunshine-value) * 3);
        opacity: 0.5;
        z-index: calc(var(--max-sunshine-rings) - 1);

        &.active {
          box-shadow: 0 0 30px 3px var(--brand-yellow);
        }
      }

      &:nth-of-type(3) {
        --base-sunshine-radius: calc(var(--base-sunshine-value) * 5);
        opacity: 0.33;
        z-index: calc(var(--max-sunshine-rings) - 2);
        box-shadow: 0 0 0 40px rgba(0, 0, 0, 0.075);

        &.active {
          box-shadow: 0 0 0 40px var(--brand-yellow-medium);
        }
      }
    }
  }
</style>
