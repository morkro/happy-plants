import Vue from 'vue'
import { getUrlFromBlob } from '@/utils/blob'
import { sortByDate, sortByAlphabet } from '@/utils/sort'

function sortPlants (state, array = state.plants.data) {
  switch (state.settings && state.settings.orderBy) {
    case 'alphabetical':
      return array.sort(sortByAlphabet)
    case 'latest':
    default:
      return array.sort(sortByDate).reverse()
  }
}

export default {
  LOAD_PLANTS_PROGRESS (state) {
    state.plants.loading = true
  },

  LOAD_PLANTS_SUCCESS (state, payload) {
    let transformed = payload.plants
    if (state.storage.type === 'local') {
      transformed = payload.plants.map(item =>
        Object.assign(item, { imageURL: getUrlFromBlob(item.blob) }))
    }

    state.plants.loading = false
    state.plants.finished = true
    state.plants.error = false
    state.plants.data = sortPlants(state, transformed)
  },

  LOAD_PLANTS_FAILURE (state) {
    state.plants.loading = false
    state.plants.finished = true
    state.plants.error = true
  },

  LOAD_PLANT_ITEM (state, payload) {
    state.selected = Object.assign({},
      state.plants.data.find(plant => plant.guid === payload.guid)
    )
  },

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
  },

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
  },

  UPDATE_PLANT (state, payload) {
    const itemIndex = state.plants.data.findIndex(p => p.guid === payload.data.guid)
    state.updated = Date.now()
    Vue.set(state.plants.data, itemIndex, payload.data)
  }
}
