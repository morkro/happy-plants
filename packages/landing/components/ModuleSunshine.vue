<template>
  <plant-component>
    <template v-slot:icon>
      <feather-sun />
    </template>

    <template v-slot:title>
      <h2>Sunshine</h2>
    </template>

    <template v-slot:content>
      <div class="sunshine-description">
        <p class="description-level">
          <strong>Intensity: {{ intensityLevel }}</strong>
        </p>
        <p>{{ intensityDescription }}</p>
      </div>
      <div :class="`sunshine-canvas intensity-${intensity}`">
        <div
          v-for="(level, index) of insenityLevels"
          :key="`intensity-${index}`"
          tag="div"
          :class="{ active: isActiveLevel(index) }"
          @click="onEmitIntensityChange($event, level)"
        />
      </div>
    </template>
  </plant-component>
</template>

<script>
  import { SunIcon } from 'vue-feather-icons'
  import ModuleComponent from './ModuleComponent'
  export default {
    name: 'PlantSunshine',

    components: {
      'plant-component': ModuleComponent,
      'feather-sun': SunIcon
    },

    props: {
      intensity: { type: Number, default: 1 },
      messages: { type: [Object, Boolean], default: false }
    },

    data () {
      return {
        insenityLevels: [{ level: 1 }, { level: 2 }, { level: 3 }],
        defaultMessages: {
          level: [
            'Shade-friendly',
            'Partial shade',
            'Full sun'
          ],
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
        return this.getIntensityText('intensity')
      },
      intensityLevel () {
        return this.getIntensityText('level')
      }
    },

    methods: {
      isActiveLevel (index) {
        return index <= (this.intensity - 1)
      },
      onEmitIntensityChange (event, level) {
        this.$emit('update-plant', level)
        event.target && event.target.blur()
      },
      getIntensityText (type) {
        const messages = this.messages
          ? this.messages[type]
          : this.defaultMessages[type]
        return messages[this.intensity - 1]
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .plant-component {
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
      --base-sunshine-background: var(--grey);

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: var(--base-sunshine-radius);
      height: var(--base-sunshine-radius);
      border-radius: 50%;
      border: 2px solid var(--background-primary);
      background-color: var(--base-sunshine-background);
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
