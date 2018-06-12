import Vue from 'vue'
import { sortByDate, sortByAlphabet } from '@/utils/sort'

const sortPlants = (state) => {
  switch (state.settings.orderBy) {
    case 'latest':
      state.plants = state.plants.sort(sortByDate).reverse()
      break
    case 'alphabetical':
      state.plants = state.plants.sort(sortByAlphabet)
      break
  }
}

export default {
  UPDATE_VIEWMODE (state, payload) {
    state.updated = Date.now()
    state.settings = Object.assign({}, state.settings, payload)

    sortPlants(state)
  },

  UPDATE_PLANT_OVERVIEW (state, payload) {
    const itemIndex = state.plants.findIndex(p => p.guid === payload.item.guid)

    state.updated = Date.now()

    if (state.plants[itemIndex]) {
      Vue.set(state.plants, itemIndex, Object.assign(state.plants[itemIndex], payload.item))
      sortPlants(state)
    }
  }
}
