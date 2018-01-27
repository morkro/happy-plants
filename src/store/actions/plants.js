import uuid from 'uuid/v4'
import { blobToBase64String } from 'blob-util'
import { convertToBlob } from '@/utils/blob'
import { iOS } from '@/utils/useragent'
import {
  fetchPlants,
  getPlant,
  addPlant as addPlantFromAPI,
  deletePlants as deletePlantsFromAPI,
  updatePlant as updatePlantFromAPI
} from '@/api/plants'

function shrinkPlantObjects (plant) {
  return {
    name: plant.name,
    blob: plant.blob,
    created: plant.created,
    guid: plant.guid,
    categories: plant.categories
  }
}

/**
 * Clean up method to migrate old plant object structure to new system.
 */
function cleanUpPlantObject (plant) {
  const plantCopy = plant

  if (!plantCopy.modules) {
    plantCopy.modules = []
  }

  delete plantCopy.componentOrder
  delete plantCopy.notes
  delete plantCopy.seasons
  delete plantCopy.sunshine
  delete plantCopy.watering

  return plantCopy
}

export const loadPlants = ({ state, commit }, data = {}) => {
  if (!state.plants || state.plants.length === 0 || !!data.force) {
    return fetchPlants()
      .then(data => Promise.all(data.map(shrinkPlantObjects).map(convertToBlob)))
      .then(plants => commit('LOAD_PLANTS', { plants }))
  }

  return Promise.resolve()
}

export const loadPlantItem = ({ state, commit }, guid) => {
  getPlant(guid)
    .then(convertToBlob)
    .then(cleanUpPlantObject)
    .then(item => commit('LOAD_PLANT_ITEM', { item }))
}

export const addPlant = ({ commit }, data) => {
  const meta = {
    ...data,
    guid: uuid(),
    created: Date.now(),
    modified: Date.now()
  }

  // FIXME: This is generally a bad idea. Use feature detection instead.
  // However, I could not find a reliable way to test if IndexedDB supports blobs,
  // as it fails silently. We have to convert the blob to base64,
  // because mobile Safari 10 has a bug with storing Blobs in IndexedDB.
  if (iOS && !!data.blob) {
    // 1. Turn blob into base64 string (only needed for storage)
    return blobToBase64String(data.blob)
      // 2. Take the base64 string and add it to the data object
      .then(base64String => Object.assign({}, meta, { blob: base64String }))
      // 3. Add data to IndexedDB and return it
      .then(config => addPlantFromAPI(config).then(() => config))
      // 4. Add the blob back to the object
      .then(config => Object.assign({}, config, { blob: data.blob }))
      // 5. Add new data to Vuex
      .then(data => {
        commit('ADD_PLANT', { item: data })
        return data.guid
      })
  }

  return addPlantFromAPI(meta)
    .then(data => {
      commit('ADD_PLANT', { item: meta })
      return data.guid
    })
}

export const deletePlants = ({ commit }, items) => {
  return deletePlantsFromAPI(items)
    .then(() => commit('DELETE_PLANTS', { items }))
}

export const updatePlant = ({ state, commit }, data) => {
  const item = state.plants.find(p => p.guid === data.guid)
  const meta = { ...item, ...data, modified: Date.now() }

  // FIXME: This is generally a bad idea. Use feature detection instead.
  // However, I could not find a reliable way to test if IndexedDB supports blobs,
  // as it fails silently. We have to convert the blob to base64,
  // because mobile Safari 10 has a bug with storing Blobs in IndexedDB.
  if (iOS && !!data.blob) {
    // 1. Turn blob into base64 string (only needed for storage)
    return blobToBase64String(data.blob)
      // 2. Take the base64 string and add it to the data object
      .then(base64String => Object.assign({}, meta, { blob: base64String }))
      // 3. Add data to IndexedDB and return it
      .then(config => addPlantFromAPI(config).then(() => config))
      // 4. Add the blob back to the object
      .then(config => Object.assign({}, config, { blob: data.blob }))
      // 5. Add new data to Vuex
      .then(data => {
        commit('ADD_PLANT', { item: data })
        return data.guid
      })
  }

  return updatePlantFromAPI(meta)
    .then(() => commit('UPDATE_PLANT', { config: meta }))
}
