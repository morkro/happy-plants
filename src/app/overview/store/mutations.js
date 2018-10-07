import Vue from 'vue'
import { sortByDate, sortByAlphabet } from '@/utils/sort'

const sortPlants = (settings, plants) => {
  let sortedPlants = plants

  switch (settings.orderBy) {
    case 'latest':
      sortedPlants = sortedPlants.sort(sortByDate).reverse()
      break
    case 'alphabetical':
      sortedPlants = sortedPlants.sort(sortByAlphabet)
      break
  }

  return sortedPlants
}

export default {
  UPDATE_VIEWMODE (state, payload) {
    state.updated = Date.now()
    state.settings = Object.assign({}, state.settings, payload)
    state.plants.data = sortPlants(state.settings, state.plants.data)
  },

  UPDATE_PLANT_OVERVIEW (state, payload) {
    const itemIndex = state.plants.data.findIndex(p => p.guid === payload.item.guid)

    state.updated = Date.now()

    if (state.plants.data[itemIndex]) {
      Vue.set(
        state.plants.data,
        itemIndex,
        Object.assign(state.plants.data[itemIndex], payload.item)
      )
      state.plants.data = sortPlants(state.settings, state.plants.data)
    }
  }
}
