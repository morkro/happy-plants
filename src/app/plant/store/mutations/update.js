import Vue from 'vue'

export default {
  UPDATE_PLANT (state, payload) {
    const itemIndex = state.plants.data.findIndex(p => p.guid === payload.data.guid)
    state.updated = Date.now()
    Vue.set(state.plants.data, itemIndex, payload.data)
  }
}
