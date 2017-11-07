function getCalendarMonth () {
  return [
    'January', 'February', 'March',
    'April', 'Mai', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
  ]
}

export default function getDefaultStructure () {
  return {
    guid: undefined,
    created: 0,
    modified: 0,
    blob: undefined,
    name: '',
    componentOrder: [
      'watering',
      'sunshine',
      'seasons',
      'notes'
    ],
    seasons: getCalendarMonth().map(month => ({ month, growth: false })),
    notes: '',
    watering: {
      level: 0
    },
    sunshine: {
      intensity: 0
    }
  }
}
