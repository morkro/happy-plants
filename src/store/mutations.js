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

  DELETE_PLANT (state, payload) {
    Vue.delete(state.plants, payload.plantIndex)
  },

  UPDATE_PLANT (state, payload) {
    const itemIndex = state.plants.findIndex(p => p.guid === payload.data.guid)
    state.plants[itemIndex] = payload.data
  }
}
