<template>
  <section>
    <div class="sunshine-description">
      <p><strong>Intensity: {{ intensity }}</strong></p>
      <p>{{ intensityDescription }}</p>
    </div>
    <div class="sunshine-canvas">
      <v-touch
        tag="div"
        v-for="(level, index) of insenityLevels"
        :key="`intensity-${index}`"
        :class="{
          active: isActiveLevel(index),
          'intensity-one': index === 1 && intensity > 1
        }"
        @tap="onEmitIntensityChange($event, level)"
        @click="onEmitIntensityChange($event, level)">
      </v-touch>
    </div>
  </section>
</template>1

<script>
  export default {
    name: 'PlantSunshine',

    props: {
      intensity: { type: Number, default: 1 }
    },

    data () {
      return {
        insenityLevels: [{ level: 1 }, { level: 2 }, { level: 3 }]
      }
    },

    computed: {
      intensityDescription () {
        switch (this.intensity) {
          case 1:
            return 'This plant doesn\'t require a lot of sun, shade is also fine.'
          case 2:
            return 'This plant needs bright, indirect, or filtered light but no direct sun.'
          case 3:
          default:
            return 'This plant needs a lot of direct, bright sun to partial shade!'
        }
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
    z-index: 1;
  }

  .sunshine-canvas {
    width: 50%;
    height: 100%;
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;

    > div {
      --base-sunshine-radius: $base-sunshine-radius;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, calc(-50% - 14px)); /* 14: magic number. looks good in the UI. */
      width: var(--base-sunshine-radius);
      height: var(--base-sunshine-radius);
      border-radius: 50%;
      border: 2px solid white;
      background-color: $grey;
      z-index: $max-sunshine-rings;

      &.active {
        background-color: $yellow;
      }

      &.active.intensity-one:first-of-type {
        box-shadow: 0 0 10px 3px $yellow;
      }

      &.active:first-of-type {
        box-shadow: 0 0 30px 3px $yellow;
      }

      &:nth-of-type(2) {
        --base-sunshine-radius: $base-sunshine-radius * 3;
        opacity: 0.5;
        z-index: $max-sunshine-rings - 1;
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
