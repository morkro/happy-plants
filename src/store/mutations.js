import Vue from 'vue'
import blobUtil from 'blob-util'

export default {
  LOAD_PLANTS (state, payload) {
    state.plants = payload.plants.map(item =>
      ({ ...item, imageURL: item.blob ? blobUtil.createObjectURL(item.blob) : '' }))
  },

  ADD_PLANT (state, payload) {
    // add plant
  },

  DELETE_PLANT (state, payload) {
    Vue.delete(state.plants, payload.plantIndex)
  }
}
