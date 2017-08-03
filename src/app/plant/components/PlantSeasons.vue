<template>
  <section>
    <header>
      <h2>Growing seasons</h2>
      <p v-if="isGrowthMonth()">
        Your plant is currently in <strong>active growth</strong>.
      </p>
      <p v-else>
        Your plant is currently in a <strong>dormant phase</strong>.
      </p>
    </header>
    <ul class="season-list">
      <li
        v-for="(season, index) of seasons"
        :class="{ current: isCurrentMonth(index), growth: season.growth }"
        @click.self="emitSeasonToggle(season)">
        {{ season.month[0] }}
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'PlantSeasons',

    props: {
      seasons: {
        type: Array,
        default: []
      }
    },

    methods: {
      isCurrentMonth (month) {
        return month === new Date().getMonth()
      },
      isGrowthMonth () {
        return this.seasons[new Date().getMonth()].growth
      },
      emitSeasonToggle (season) {
        this.$emit('toggle-season', season.month)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/animations";
  @import "~styles/colors";
  @import "~styles/layout";

  section {
    width: 100%;
    padding: $base-gap;
  }

  header {
    margin-bottom: $base-gap;

    h2 {
      margin-bottom: $base-gap / 2;
    }
  }

  .season-list {
    list-style: none;
    display: flex;
    justify-content: space-between;

    li {
      color: darken($grey, 30);
      background: $grey;
      border-radius: $border-radius;
      height: calc(100vw / 12 + 6px);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background $base-speed $ease-out-back,
                  color $base-speed $ease-out-back;

      &:not(:last-child) {
        margin-right: 1px;
      }

      &.growth {
        color: $green;
        background: lighten($green, 30);
      }

      &.growth.current {
        color: $text-color-inverse;
        background: $green;

        &:after {
          opacity: 1;
          content: "";
          border-radius: $border-radius;
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          box-shadow: 0 0 12px 0px rgba($green, .7);
          transition: opacity $base-speed $ease-out-back;
        }
      }

      &.current {
        font-weight: 600;
        box-shadow: $shadow;
        transform: scale(1.2);
      }
    }
  }
</style>
