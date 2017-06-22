import Vue from 'vue'
import { getUrlFromBlob } from '@/utils/blob'
import { sortByDate, sortByAlphabet } from '@/utils/sort'

function sortPlants (state, array = state.plants) {
  switch (state.settings && state.settings.filter) {
    case 'alphabetical':
      state.plants = array.sort(sortByAlphabet)
      break
    case 'latest':
    default:
      state.plants = array.sort(sortByDate).reverse()
      break
  }
}

export default {
  LOAD_PLANTS (state, payload) {
    const transformed = payload.plants.map(item =>
      ({ ...item, imageURL: getUrlFromBlob(item.blob) }))
    sortPlants(state, transformed)
  },

  LOAD_PLANT_ITEM (state, payload) {
    const needsBlobUrl = !!payload.item.blob && !payload.item.imageURL
    const imageURL = needsBlobUrl ? getUrlFromBlob(payload.item.blob) : payload.item.imageURL
    state.active = Object.assign(payload.item, { imageURL })
  },

  ADD_PLANT (state, payload) {
    state.plants.push(payload.item)
    sortPlants(state)
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
