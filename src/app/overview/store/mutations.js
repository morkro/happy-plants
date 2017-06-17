import { sortByDate, sortByAlphabet } from '@/utils/sort'

export default {
  UPDATE_FILTER (state, payload) {
    state.settings.filter = payload.filter

    switch (state.settings.filter) {
      case 'latest':
        state.plants = state.plants.sort(sortByDate).reverse()
        break
      case 'alphabetical':
        state.plants = state.plants.sort(sortByAlphabet)
        break
    }
  }
}
