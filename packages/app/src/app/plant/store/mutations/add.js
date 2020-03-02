import sortPlants from '@/store/utils/sort-plants'

export default {
  ADD_PLANT_PROGRESS (state) {
    state.updated = Date.now()
  },

  ADD_PLANT_SUCCESS (state, payload) {
    state.updated = Date.now()
    state.plants.data.push(payload.item)
    state.plants.data = sortPlants(state)
  },

  ADD_PLANT_FAILURE (state) {
    state.plants.error = true
  }
}
