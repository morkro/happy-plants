<template>
  <section>
    <header>
      <h3>Watering</h3>
    </header>

    <water-level
      class="water-level"
      :showInfo="false"
      :current="watering"
      :steps="levels.length" />

    <p contenteditable>
      Water regularly during the growing season, but the water must be able to drain away quickly. It's very rot prone.
    </p>
  </section>
</template>

<script>
  import Progress from '@/app/shared/Progress'
  export default {
    name: 'PlantWatering',

    props: {
      watering: {
        type: Number,
        default: 1
      }
    },

    components: {
      'water-level': Progress
    },

    data () {
      return {
        levels: [{ type: 1 }, { type: 2 }, { type: 3 }]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/variables";

  section {
    width: 100%;
    padding: $base-gap;
  }

  header {
    margin-bottom: $base-gap;
  }

  .water-level {
    margin-bottom: $base-gap;

    /deep/ progress {
      height: 50px;

      &::-webkit-progress-value {
        background: $blue;
      }
    }
  }
</style>
