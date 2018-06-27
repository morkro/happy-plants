import getCalendarMonth from './get-calendar-month'

export default function getPlantModules () {
  return [
    {
      type: 'watering',
      selected: false,
      meta: {
        title: 'Watering',
        description: 'Define the amount of water your plant requires.',
        icon: 'droplet'
      },
      value: {
        amount: 1,
        frequency: 'weekly'
      }
    },
    {
      type: 'sunshine',
      selected: false,
      meta: {
        title: 'Sunshine',
        description: 'How much sun does your plant need?',
        icon: 'sun'
      },
      value: {
        level: 1
      }
    },
    {
      type: 'seasons',
      selected: false,
      meta: {
        title: 'Growth',
        description: 'In which seasons is your plant in growth?',
        icon: 'moon'
      },
      value: {
        seasons: getCalendarMonth().map(month => ({ month, growth: false }))
      }
    },
    {
      type: 'notes',
      selected: false,
      meta: {
        title: 'Notes',
        description: 'Add useful notes.',
        icon: 'book'
      },
      value: {
        notes: ''
      }
    }
  ]
}
