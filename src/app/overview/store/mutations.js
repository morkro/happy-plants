import { sortByDate, sortByAlphabet } from '@/utils/sort'

export default {
  UPDATE_FILTER (state, payload) {
    state.updated = Date.now()
    state.settings.filter = payload.filter

    switch (state.settings.filter) {
      case 'latest':
        state.plants = state.plants.sort(sortByDate).reverse()
        break
      case 'alphabetical':
        state.plants = state.plants.sort(sortByAlphabet)
        break
    }
  },

  UPDATE_PLANT_OVERVIEW (state, payload) {
    const itemIndex = state.plants.findIndex(p => p.guid === payload.item.guid)

    state.updated = Date.now()

    if (state.plants[itemIndex]) {
      state.plants[itemIndex] = Object.assign(state.plants[itemIndex], payload.item)
    }
  }
}
