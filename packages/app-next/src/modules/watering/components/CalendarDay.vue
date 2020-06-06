<template>
  <button @click.prevent="emitClick" :class="classes">
    <v-text :color="day.isToday ? 'normal' : 'special'">
      <slot />
    </v-text>
    <v-blob :shape="blobShape" :fill="blobColor" />
  </button>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { CalendarDay } from '@/services/dayjs'
  export default Vue.extend({
    props: {
      day: {
        type: Object as PropType<CalendarDay>,
        required: true,
      },
      blobShape: {
        type: Number,
        default: 0,
      },
      blobColor: {
        type: String,
        default: 'var(--brand-blue-dark)',
      },
    },
    computed: {
      classes(): Record<string, boolean> {
        return {
          'watering-calendar-day': true,
          'current-day': this.day.isToday,
          'has-watering': this.day.hasWaterings,
        }
      },
    },
    methods: {
      emitClick() {
        this.$emit('click', this.day)
      },
    },
  })
</script>

<style lang="postcss">
  .watering-calendar-day {
    border: none;
    background: transparent;
    border-radius: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    line-height: 100%;

    &.has-watering::after {
      position: absolute;
      z-index: 1;
      top: 5%;
      right: 10%;
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: var(--brand-red);
      box-shadow: 0 2px 9px var(--brand-red);
    }

    &:focus {
      outline: none;

      & svg path {
        stroke: var(--brand-white);
      }
    }

    & .text {
      position: relative;
      z-index: 1;
    }

    & svg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      z-index: 0;
    }
  }
</style>
