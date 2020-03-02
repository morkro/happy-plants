import { sortByDate, sortByAlphabet } from '@/utils/sort'

export default function sortPlants (state, array = state.plants.data) {
  switch (state.settings && state.settings.orderBy) {
    case 'alphabetical':
      return array.sort(sortByAlphabet)
    case 'latest':
    default:
      return array.sort(sortByDate).reverse()
  }
}
