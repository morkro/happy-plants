<template>
  <div class="watering-calendar">
    <div class="watering-calendar-header">
      <v-button round small color="yellow" @click.native.prevent="moveMonth('prev')">
        <feather-arrow-left />
        <span class="visuallyhidden">Previous</span>
      </v-button>
      <v-button round small color="yellow" @click.native.prevent="moveMonth('next')">
        <feather-arrow-right />
        <span class="visuallyhidden">Next</span>
      </v-button>
      <v-text color="special" type="subtitle">{{ headlineMonthYear }}</v-text>
    </div>

    <table class="watering-calendar-table">
      <thead>
        <tr>
          <th v-for="weekday of tableWeekHeader" :key="weekday">
            <v-text color="special">{{ weekday }}</v-text>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) of currentMonth" :key="'week' + index">
          <td
            v-for="day in week"
            :key="day.day"
            :class="{ current: day.isCurrentMonth, today: day.isToday }"
          >
            <calendar-day
              :day="day"
              :blob-shape="0"
              :blob-color="day.isToday ? 'var(--brand-yellow)' : undefined"
              @click="selectDay"
            >
              <strong>{{ day.day }}</strong>
            </calendar-day>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { CalendarDay, CalendarMonth, getCurrentMonth, getDate } from '@/services/dayjs'
  import WateringCalendarDay from './CalendarDay.vue'

  export default Vue.extend({
    name: 'WateringCalendar',
    components: {
      'feather-arrow-right': () =>
        import('vue-feather-icons/icons/ArrowRightIcon' /* webpackChunkName: "icons" */),
      'feather-arrow-left': () =>
        import('vue-feather-icons/icons/ArrowLeftIcon' /* webpackChunkName: "icons" */),
      'calendar-day': WateringCalendarDay,
    },
    data() {
      return {
        current: getDate(),
        startOfWeek: 1,
      }
    },
    computed: {
      headlineMonthYear() {
        return this.current.format('MMMM YYYY')
      },
      currentMonth(): CalendarMonth {
        return getCurrentMonth(this.current, this.startOfWeek)
      },
      tableWeekHeader() {
        return new Set(
          ...(this.currentMonth as CalendarMonth).map(week => week.map(day => day.weekday))
        )
      },
    },
    methods: {
      moveMonth(direction: string) {
        if (direction === 'prev') {
          this.current = this.current.subtract(1, 'month')
        } else if (direction === 'next') {
          this.current = this.current.add(1, 'month')
        }
      },
      selectDay(day: CalendarDay) {
        this.$emit('click', day)
      },
    },
  })
</script>

<style lang="postcss">
  .watering-calendar-header {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-gap: calc(0.5 * var(--base-gap));

    & .subtitle {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  .watering-calendar-table {
    width: 100%;
    padding-top: var(--base-gap);

    & th {
      font-weight: normal;
    }

    & td {
      --weekdays: 7;
      text-align: center;
      position: relative;
      padding: calc(0.25 * var(--base-gap)) calc(0.25 * var(--base-gap)) 0;
      width: calc(100% / var(--weekdays));

      &:not(.current) {
        & .text {
          color: var(--brand-blue);
        }
        & svg {
          opacity: 0.5;
        }
      }
    }

    & tbody td .watering-calendar-day {
      width: 100%;
      height: 50px;
    }
  }
</style>
