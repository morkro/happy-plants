import Vue from 'vue'

export default {
  DELETE_PLANT_PROGRESS (state) {
    state.updated = Date.now()
  },

  DELETE_PLANTS_SUCCESS (state, payload) {
    state.updated = Date.now()

    for (const item of payload.items) {
      Vue.delete(
        state.plants.data,
        state.plants.data.findIndex(p => p.guid === item.guid)
      )
    }
  },

  DELETE_PLANTS_FAILURE (state) {
    state.plants.error = true
  }
}
