<template>
  <section>
    <header>
      <h2>Growing seasons</h2>
      <p>
        Your plant is currently <strong>{{ getGrowthText() }}</strong>.
      </p>
    </header>
    <ul class="season-list">
      <li
        v-for="(season, index) of seasons"
        @click.self="emitSeasonToggle(season)"
        :class="{
          current: isCurrentMonth(index),
          growth: season.growth,
          'growth-transition-from': isTransitioning('from', index),
          'growth-transition-to': isTransitioning('to', index),
        }">
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

    computed: {
      currentMonth () {
        return this.seasons[new Date().getMonth()]
      }
    },

    methods: {
      isCurrentMonth (month) {
        return month === new Date().getMonth()
      },
      isGrowthMonth () {
        return this.seasons[new Date().getMonth()].growth
      },
      isTransitioning (type, index) {
        const currentGrowth = this.seasons[index].growth
        const nextMonth = this.seasons[index + 1]
        const prevMonth = this.seasons[index - 1]
        return (
          (type === 'to' && !currentGrowth && nextMonth && nextMonth.growth) ||
          (type === 'from' && !currentGrowth && nextMonth && !nextMonth.growth && prevMonth && prevMonth.growth)
        )
      },
      getGrowthText () {
        const currentMonth = new Date().getMonth()
        if (this.currentMonth.growth) {
          return 'in active growth'
        } else if (this.isTransitioning('to', currentMonth)) {
          return 'starting to get into active growth'
        } else if (this.isTransitioning('from', currentMonth)) {
          return 'transitioning into a dormant phase'
        } else {
          return 'in a dormant phase'
        }
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

      &.growth-transition-to {
        background: linear-gradient(90deg, $grey, lighten($green, 30));
      }

      &.growth-transition-from {
        background: linear-gradient(90deg, lighten($green, 30), $grey);
      }

      &.growth.current {
        color: $text-color-inverse;
        background: $green;
        box-shadow: $green-shadow;

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
          box-shadow: 0 0 12px 0px rgba($green, .7),;
          transition: opacity $base-speed $ease-out-back;
        }
      }

      &.current {
        font-weight: 600;
        box-shadow: $plain-shadow;
        transform: scale(1.2);
      }
    }
  }
</style>
