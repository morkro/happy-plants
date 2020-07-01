<template>
  <div class="screen-watering">
    <app-header color="white">
      <template #default>Watering</template>
      <template #actions v-if="calendarVisible">
        <button class="watering-header-close" @click.prevent="closeCalendar">
          <feather-cross />
          <span class="visuallyhidden">Close calendar</span>
        </button>
      </template>
    </app-header>

    <section class="watering-header">
      <div v-if="!calendarVisible" class="watering-header-content">
        <calendar-day
          v-for="day in currentWeek"
          :day="day"
          :key="day.day"
          :blob-color="blobColor(day.isToday)"
          :blob-shape="Math.floor(Math.random() * currentWeek.length)"
          @click="selectDay"
        >
          <strong>{{ day.day }}</strong>
          <br />
          {{ day.weekday }}
        </calendar-day>

        <div class="watering-header-toggle-btn">
          <v-button round small color="yellow" @click.native.prevent="showCalendar">
            <feather-calendar />
            <v-text class="visuallyhidden">Open calendar</v-text>
          </v-button>
        </div>
      </div>

      <div v-else :class="['watering-header-calendar', this.calendarVisible && 'visible']">
        <watering-calendar @click="selectDay" />
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 40">
        <g fill="none" fill-rule="evenodd">
          <path
            v-if="calendarVisible"
            fill="#FFF"
            d="M360.002 0v24.51c-9.03-2.627-25.169-9.75-53.83-.106-5.087 1.71-10.11 3.709-15.232 5.277-21.893 6.705-33.196.574-50.44-7.396-41.895-19.36-62.28 24.092-97.706 6.716-11.571-5.674-24.415-14.032-50.632-5.821C73.035 29.175 46.547 47.946.828 36.227L0 36.014V.434L.205.002l5.823-.003c.51.153 1.007.323 1.49.52C19.276 5.316 35.582 3.704 49.652 0h310.35z"
          />
          <path
            fill="#3B77E1"
            d="M360.002 0v18.51c-9.03-2.627-25.169-9.75-53.83-.106-5.087 1.71-10.11 3.709-15.232 5.277-21.893 6.705-33.196.574-50.44-7.396-41.895-19.36-62.28 24.092-97.706 6.716-11.571-5.674-24.415-14.032-50.632-5.821C73.035 23.175 46.547 41.946.828 30.227L0 30.014.002 0h360zm-11.654 24.244c2.909 1.317 2.145 3.607.62 5.107-1.596 1.57-3.7 1.498-5.313 1.498l.003-.111c-2.476-.083-4.95-.183-7.427-.244-5.5-.136-9.32 1.61-16.22 2.834-2.79.497-8.29.677-10.23-1.58-1.24-1.428-.97-3.506.59-4.457.46-.28.99-.454 1.49-.628.49-.167 4.46-.519 9.85-2.928 3.43-1.532 7.03-2.363 10.72-2.698 4.268-.386 14.152 2.407 15.917 3.207z"
          />
        </g>
      </svg>
    </section>

    <main :class="{ overlay: calendarVisible }">
      <v-text>List</v-text>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { getDate, getDay, CalendarDay } from '@/services/dayjs'
  import WateringCalendar from '../components/Calendar.vue'
  import WateringCalendarDay from '../components/CalendarDay.vue'
  import hasProperty from '@/utils/hasProperty'

  interface WateringData {
    currentWeek: CalendarDay[]
    calendarVisible: boolean
  }

  export default Vue.extend({
    name: 'Watering',
    components: {
      'feather-calendar': () =>
        import('vue-feather-icons/icons/CalendarIcon' /* webpackChunkName: "icons" */),
      'feather-cross': () => import('vue-feather-icons/icons/XIcon' /* webpackChunkName: "icons" */),
      'watering-calendar': WateringCalendar,
      'calendar-day': WateringCalendarDay,
    },
    data(): WateringData {
      return {
        currentWeek: [],
        calendarVisible: hasProperty(this.$route.query, 'showCalendar'),
      }
    },
    methods: {
      showCalendar() {
        this.calendarVisible = true
        this.$router.push({ path: '/watering', query: { showCalendar: null } })
      },
      closeCalendar() {
        this.calendarVisible = false
        this.$router.push({ path: '/watering' })
      },
      blobColor(isToday: boolean): string {
        return isToday ? 'var(--brand-yellow)' : 'var(--brand-blue-dark)'
      },
      selectDay(day: CalendarDay) {
        console.log('set day', day)
      },
      getCalendarDayClasses(day: CalendarDay): Record<string, boolean> {
        return {
          'watering-header-day': true,
          'current-day': day.isToday,
          'has-watering': day.hasWaterings,
        }
      },
    },
    created() {
      const now = getDate()

      for (let index = 0; index < 5; index++) {
        const setDay = now.add(index, 'day')
        this.currentWeek.push(getDay(setDay, { hasWaterings: Math.random() >= 0.5 }))
      }
    },
  })
</script>

<style lang="postcss">
  .screen-watering {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    & #app-header {
      background: var(--brand-blue);
      z-index: 2;
    }

    & main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-align: center;
      position: relative;
      z-index: 0;
      padding-top: 85px;

      &::before {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background: var(--brand-black-50);
        content: '';
        display: block;
        transform: translateY(-100%);
        animation: appear-reverse 150ms;
      }

      &.overlay::before {
        overflow: none;
        animation: appear 150ms both;
      }
    }
  }

  .watering-header-close {
    background: transparent;
    border: none;
    color: var(--brand-white);
    height: 100%;
    padding: 0 calc(0.75 * var(--base-gap));

    &:focus {
      outline: none;
      background: var(--brand-blue-dark);
    }

    & svg {
      width: 32px;
      height: 32px;
    }
  }

  .watering-header {
    position: absolute;
    z-index: 1;
    top: 0;
    padding-top: var(--app-header-height);
    width: 100%;
  }

  .watering-header-content {
    background: var(--brand-blue);
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr) auto;
    grid-gap: var(--base-gap);
    padding: 0 var(--base-gap);

    & > .watering-calendar-day {
      height: 60px;
    }

    & .watering-header-toggle-btn {
      display: flex;
      align-items: center;
    }
  }

  .watering-header-calendar {
    background: var(--brand-blue);
    padding: var(--base-gap) var(--base-gap) 0;
    transform: scaleY(0);

    &.visible {
      transform: scaleY(1);
    }
  }
</style>
