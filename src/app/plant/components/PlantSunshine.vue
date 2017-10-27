<template>
  <section>
    <div class="sunshine-canvas">
      <div
        v-for="(level, index) of levels"
        :class="{ active: index <= (amount-1) }">
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'PlantSunshine',

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

  $base-sunshine-radius: 40px;

  .sunshine-canvas {
    width: 100%;
    height: 110px;
    position: relative;

    > div {
      --base-sunshine-radius: $base-sunshine-radius;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: var(--base-sunshine-radius);
      height: var(--base-sunshine-radius);
      border-radius: 50%;
      background-color: $grey;

      /* TODO: Use for loop. */
      &:nth-of-type(2) {
        --base-sunshine-radius: $base-sunshine-radius * 3;
        opacity: 0.7;
      }

      &:nth-of-type(3) {
        --base-sunshine-radius: $base-sunshine-radius * 6;
        opacity: 0.4;
      }
    }
  }
</style>
