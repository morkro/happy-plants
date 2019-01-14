import Vue from 'vue'
import sortPlants from '@/store/utils/sort-plants'

export default {
  UPDATE_VIEWMODE (state, payload) {
    state.updated = Date.now()
    state.settings = Object.assign({}, state.settings, payload)
    state.plants.data = sortPlants(state, state.plants.data)
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
      state.plants.data = sortPlants(state, state.plants.data)
    }
  }
}
