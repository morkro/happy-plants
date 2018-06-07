import Vue from 'vue'
import { getUrlFromBlob } from '@/utils/blob'
import { sortByDate, sortByAlphabet } from '@/utils/sort'

function sortPlants (state, array = state.plants) {
  switch (state.settings && state.settings.orderBy) {
    case 'alphabetical':
      return array.sort(sortByAlphabet)
    case 'latest':
    default:
      return array.sort(sortByDate).reverse()
  }
}

export default {
  LOAD_PLANTS (state, payload) {
    const transformed = payload.plants.map(item =>
      Object.assign(item, { imageURL: getUrlFromBlob(item.blob) }))

    state.plants = sortPlants(state, transformed)
  },

  LOAD_PLANT_ITEM (state, payload) {
    const imageURL = getUrlFromBlob(payload.item.blob)
    state.selected = Object.assign(payload.item, { imageURL })
  },

  ADD_PLANT (state, payload) {
    state.updated = Date.now()
    state.plants.push(payload.item)
    state.plants = sortPlants(state)
  },

  DELETE_PLANTS (state, payload) {
    state.updated = Date.now()
    for (const item of payload.items) {
      Vue.delete(
        state.plants,
        state.plants.findIndex(p => p.guid === item.guid)
      )
    }
  },

  UPDATE_PLANT (state, payload) {
    const itemIndex = state.plants.findIndex(p => p.guid === payload.data.guid)
    state.updated = Date.now()
    Vue.set(state.plants, itemIndex, payload.data)
  }
}
