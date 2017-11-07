<template>
  <plant-component>
    <feather-moon slot="icon" />
    <h2 slot="title">Growing seasons</h2>
    <div slot="content">
      <p v-if="isEvergreen">
        Looks like your plant is an <strong>evergreen</strong>! It will growth throughout the year.
      </p>
      <p v-else>
        Your plant is currently <strong>{{ getGrowthText() }}</strong>.
      </p>
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
    </div>
  </plant-component>
</template>

<script>
  import PlantComponent from './PlantComponent'
  export default {
    name: 'PlantSeasons',

    components: {
      'plant-component': PlantComponent,
      'feather-moon': () =>
        import('vue-feather-icon/components/moon' /* webpackChunkName: "plant" */)
    },

    props: {
      seasons: {
        type: Array,
        default: () => []
      }
    },

    computed: {
      currentMonth () {
        return this.seasons[new Date().getMonth()]
      },
      isEvergreen () {
        return this.seasons.every(season => season.growth)
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
          (
            type === 'to' &&
            !currentGrowth &&
            nextMonth && nextMonth.growth
          ) || (
            type === 'from' &&
            !currentGrowth &&
            nextMonth && !nextMonth.growth &&
            prevMonth && prevMonth.growth
          )
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
        this.$emit('update-plant', { type: 'seasons', payload: season.month })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/animations";
  @import "~styles/colors";
  @import "~styles/layout";

  p {
    color: $text-color-secondary;
    margin-bottom: $base-gap;
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
      transition:
        background $base-speed $ease-out-back,
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

        &::after {
          opacity: 1;
          content: "";
          border-radius: $border-radius;
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          box-shadow: 0 0 12px 0 rgba($green, 0.7);
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
