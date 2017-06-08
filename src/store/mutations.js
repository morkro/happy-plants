import Vue from 'vue'
import blobUtil from 'blob-util'

export default {
  LOAD_PLANTS (state, payload) {
    state.plants = payload.plants.map(item => ({
      ...item,
      imageURL: item.blob ? blobUtil.createObjectURL(item.blob) : ''
    }))
  },

  LOAD_PLANT_ITEM (state, payload) {
    state.active = payload.item
  },

  ADD_PLANT (state, payload) {
    Vue.set(state.plants, payload.data)
  },

  DELETE_PLANTS (state, payload) {
    for (const item of payload.items) {
      Vue.delete(state.plants, state.plants.findIndex(p => p.guid === item.guid))
    }
  },

  UPDATE_PLANT (state, payload) {
    const itemIndex = state.plants.findIndex(p => p.guid === payload.data.guid)
    state.plants[itemIndex] = payload.data
  }
}
