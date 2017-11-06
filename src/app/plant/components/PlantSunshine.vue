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
          @click="onEmitIntensityChange($event, level)">
        </v-touch>
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
        this.$emit('toggle-sunshine', level)
        event.target && event.target.blur()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/fonts";
  @import "~styles/layout";

  $sunshine-size: 75px;
  $base-sunshine-radius: 40px;
  $max-sunshine-rings: 3;

  section {
    position: relative;
  }

  .sunshine-description {
    color: $text-color-secondary;
    width: 50%;
    position: relative;
    z-index: 0;

    .description-level {
      margin-bottom: $base-gap/2;
    }
  }

  .sunshine-canvas {
    width: 50%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;

    > div {
      --base-sunshine-radius: $base-sunshine-radius;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: var(--base-sunshine-radius);
      height: var(--base-sunshine-radius);
      border-radius: 50%;
      border: 2px solid white;
      background-color: $grey;
      z-index: $max-sunshine-rings;

      &.active {
        background-color: $yellow;
      }

      .intensity-1 &.active:first-of-type {
        box-shadow: 0 0 10px 3px $yellow;
      }

      &.active:first-of-type {
        box-shadow: 0 0 30px 3px $yellow;
      }

      &:nth-of-type(2) {
        --base-sunshine-radius: $base-sunshine-radius * 3;
        opacity: 0.5;
        z-index: $max-sunshine-rings - 1;

        &.active {
          box-shadow: 0 0 30px 3px $yellow;
        }
      }

      &:nth-of-type(3) {
        --base-sunshine-radius: $base-sunshine-radius * 5;
        opacity: 0.33;
        z-index: $max-sunshine-rings - 2;
        box-shadow: 0 0 0 40px rgba(0, 0, 0, 0.075);

        &.active {
          box-shadow: 0 0 0 40px transparentize($yellow, 0.5);
        }
      }
    }
  }
</style>
