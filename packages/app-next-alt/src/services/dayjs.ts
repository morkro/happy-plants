import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isToday)

export type Dayjs = dayjs.Dayjs

export interface CalendarDay {
  day: string
  weekday: string
  isToday: boolean
  isCurrentMonth: boolean
  hasWaterings: boolean
  dayjs: Dayjs
}

export type CalendarWeek = CalendarDay[]
export type CalendarMonth = CalendarWeek[]

interface GetDayOptions {
  beginningOfMonth?: Dayjs
  endOfMonth?: Dayjs
  hasWaterings: boolean
}

export const getDate = (): Dayjs => dayjs()

export const getDay = (
  referenceDay: Dayjs,
  { beginningOfMonth, endOfMonth, hasWaterings }: GetDayOptions
): CalendarDay => {
  return {
    day: referenceDay.format('D'),
    weekday: referenceDay.format('ddd'),
    isCurrentMonth: Boolean(
      beginningOfMonth &&
        endOfMonth &&
        referenceDay.isSameOrAfter(beginningOfMonth) &&
        referenceDay.isSameOrBefore(endOfMonth)
    ),
    isToday: referenceDay.isToday(),
    hasWaterings,
    dayjs: referenceDay,
  }
}

export const getCurrentMonth = (
  referenceDate: dayjs.Dayjs = getDate(),
  startOfWeek = 1
): CalendarMonth => {
  const beginningOfMonth = referenceDate.startOf('month')
  const endOfMonth = referenceDate.endOf('month')
  const beginningOfWeek = beginningOfMonth.set('day', startOfWeek)
  const month: CalendarMonth = []
  const weeks = 6
  const days = 7
  let lastDay = 0

  for (let week = 0; week < weeks; week++) {
    month.push([])

    for (let day = 0; day < days; day++) {
      const setDay = beginningOfWeek.add(lastDay, 'day')
      month[week].push(
        getDay(setDay, { beginningOfMonth, endOfMonth, hasWaterings: Math.random() >= 0.5 })
      )
      lastDay++
    }
  }

  return month
}

export const toReadableTime = (time: dayjs.ConfigType): string => dayjs(time).format('HH:mm:ss')
