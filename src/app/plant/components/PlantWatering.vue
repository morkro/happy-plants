<template>
  <section>
    <header>
      <h2>Watering</h2>
    </header>

    <water-level
      class="water-level"
      :showInfo="false"
      :current="level"
      :steps="levels.length"
      @click="updateWaterLevel" />

    <div class="notes">
      <h3>Notes</h3>
      <p contenteditable @change="emitContentChange">Type here</p>
    </div>
  </section>
</template>

<script>
  import Progress from '@/components/Progress'
  export default {
    name: 'PlantWatering',

    props: {
      level: {
        type: Number,
        default: 1
      },
      notes: {
        type: String
      }
    },

    components: {
      'water-level': Progress
    },

    data () {
      return {
        levels: [{ type: 1 }, { type: 2 }, { type: 3 }]
      }
    },

    methods: {
      emitContentChange (event) {
        console.log(event)
      },
      updateWaterLevel () {
        this.level++
        if (this.level >= this.levels.length) {
          this.level = 1
        }
        console.log(this.level)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/fonts";
  @import "~styles/layout";

  section {
    width: 100%;
    padding: $base-gap;
  }

  header {
    margin-bottom: $base-gap;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .water-level {
    margin-bottom: $base-gap;

    /deep/ progress {
      height: 50px;

      &::-webkit-progress-value {
        background: $blue;
        box-shadow: 0 0 12px $blue;
      }
    }
  }

  .notes {
    color: $text-color-secondary;

    p {
      font-size: $text-size-small;
    }
  }
</style>
