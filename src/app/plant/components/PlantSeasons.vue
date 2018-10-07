<template>
  <plant-component>
    <feather-moon slot="icon" />
    <h2 slot="title">Growing seasons</h2>
    <div slot="content">
      <p v-if="isEvergreen" key="seasons-full">
        Looks like your plant is an <strong>evergreen</strong>! It will growth throughout the year.
      </p>
      <p v-else key="seasons-partial">
        Your plant is currently <strong>{{ getGrowthText() }}</strong>.
      </p>
      <ul class="season-list">
        <li
          v-for="(season, index) of seasons"
          :class="getSeasonListClass(season, index)"
          :key="index">
          <button type="button" @click.self="emitSeasonToggle(season)">
            {{ season.month[0] }}
          </button>
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
        import('vue-feather-icons/icons/MoonIcon' /* webpackChunkName: "icons" */)
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
      getSeasonListClass (season, index) {
        return {
          current: this.isCurrentMonth(index),
          growth: season.growth,
          'growth-transition-from': this.isTransitioning('from', index),
          'growth-transition-to': this.isTransitioning('to', index)
        }
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

<style lang="postcss" scoped>
  @import "../../../styles/media-queries";

  p {
    color: var(--text-color-secondary);
    margin-bottom: var(--base-gap);
  }

  .season-list {
    list-style: none;
    display: flex;
    justify-content: space-between;

    & li {
      height: calc(100vw / 12 + 6px);
      width: 100%;
      position: relative;

      @media (--min-desktop-viewport) {
        height: 40px;
      }

      &:not(:last-child) {
        margin-right: 1px;
      }

      &.current {
        z-index: 1;
      }

      &.growth button {
        --button-background: var(--brand-green-lighten);
        --button-color: var(--brand-green);

        @nest html[data-theme="dark"] & {
          --button-background: var(--brand-green-lighten);
          --button-color: var(--brand-green);
        }
      }

      &.growth-transition-to button {
        background: linear-gradient(90deg, var(--button-background), var(--brand-green-lighten));
      }

      &.growth-transition-from button {
        background: linear-gradient(90deg, var(--brand-green-lighten), var(--button-background));
      }

      &.growth.current button {
        --button-color: var(--text-color-inverse);
        background: var(--brand-green);
        box-shadow: none;

        @nest html[data-theme="dark"] & {
          --button-color: var(--text-color);
        }

        &::after {
          opacity: 1;
          content: "";
          border-radius: var(--border-radius);
          border: none;
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          box-shadow: 0 2px 7px 0 var(--brand-green);
          transform: none;
          transition: opacity var(--base-speed) var(--ease-out-back);
        }
      }

      &.current button {
        font-weight: 500;
        box-shadow: var(--dark-shadow);
        transform: scale(1.15);
      }
    }
  }

  .season-list button {
    color: var(--button-color);
    background: var(--button-background);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background var(--base-speed) var(--ease-out-back),
      color var(--base-speed) var(--ease-out-back);
    padding: 0;
    box-shadow: none;
    width: 100%;
    height: 100%;

    --button-background: var(--grey);
    --button-color: var(--dark-grey);

    @nest html[data-theme="dark"] & {
      --button-background: var(--dark-grey);
      --button-color: var(--grey);
    }
  }
</style>
