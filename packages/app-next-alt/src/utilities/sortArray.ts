import { Plant } from 'typings/plant'

export function sortByDate(a: Plant, b: Plant) {
  return new Date(a.created).getTime() - new Date(b.created).getTime()
}

export function sortByAlphabet(a: Plant, b: Plant) {
  return a.name.localeCompare(b.name)
}
