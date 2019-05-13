import { getUrlFromBlob } from '@/utils/blob'
import sortPlants from '@/store/utils/sort-plants'
import isEmptyObject from '@/utils/is-object'

function refreshBlobUrl (item) {
  return Object.assign(item, {
    imageURL: getUrlFromBlob(item.blob)
  })
}

export default {
  LOAD_PLANTS_PROGRESS (state) {
    state.plants.loading = true
  },

  LOAD_PLANTS_LOCALSTORAGE (state, payload) {
    if (!payload.plants || !payload.plants.length) return

    let transformed = payload.plants
    if (state.storage.type === 'local') {
      transformed = payload.plants.map(refreshBlobUrl)
    }

    state.plants.data = sortPlants(state, transformed)
  },

  LOAD_PLANTS_TOTAL_COUNT (state, payload) {
    state.plants.loading = true
    state.plants.data = new Array(payload.total).fill({})
  },

  LOAD_PLANTS_SINGLE (state, payload) {
    let plantCopy = state.plants.data
    // Get all existing plant items, add new entry and sort them
    const allPlants = plantCopy
      .filter(plant => !isEmptyObject(plant))
      .concat([payload.plant])

    // Get all remaining empty objects, add them to the filtered list
    plantCopy = plantCopy.slice(allPlants.length, plantCopy.length)
    state.plants.data = allPlants.concat(plantCopy)
  },

  LOAD_PLANTS_FIREBASE (state, payload) {
    if (payload.plants.length) {
      state.plants.data = sortPlants(state, payload.plants)
    }
  },

  LOAD_PLANTS_SUCCESS (state) {
    state.plants.loading = false
    state.plants.finished = true
    state.plants.error = false
  },

  LOAD_PLANTS_FAILURE (state) {
    state.plants.loading = false
    state.plants.finished = true
    state.plants.error = true
  },

  LOAD_PLANT_ITEM (state, payload) {
    state.plants.selected = Object.assign({},
      state.plants.data.find(plant => plant.guid === payload.guid)
    )
  }
}
