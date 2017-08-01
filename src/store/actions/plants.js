import uuid from 'uuid/v4'
import { blobToBase64String } from 'blob-util'
import { convertToBlob } from '@/utils/blob'
import { iOSSafari } from '@/utils/useragent'
import {
  fetchPlants,
  addPlant as addPlantFromAPI,
  deletePlants as deletePlantsFromAPI,
  updatePlant as updatePlantFromAPI
} from '@/api/plants'

export const loadPlants = ({ state, commit }) => {
  if (!state.plants || state.plants.length === 0) {
    return fetchPlants()
      .then(data => Promise.all(data.map(convertToBlob))
        .then(plants => commit('LOAD_PLANTS', { plants })))
  }

  return Promise.resolve()
}

export const loadPlantItem = ({ state, commit }, guid) => {
  const item = state.plants.find(p => p.guid === guid)
  commit('LOAD_PLANT_ITEM', { item })
}

export const addPlant = ({ commit }, data) => {
  const config = {
    ...data,
    guid: uuid(),
    created: Date.now(),
    modified: Date.now()
  }

  // FIXME: This is generally a bad idea. Use feature detection instead.
  // However, I could not find a reliable way to test if IndexedDB supports blobs,
  // because it fails silently. We have to convert the blob to base64,
  // because mobile Safari 10 has a bug with storing Blobs in IndexedDB.
  if (iOSSafari) {
    return blobToBase64String(data.blob)
      .then(base64String => Object.assign({}, config, { blob: base64String }))
      .then(config => addPlantFromAPI(config)
        .then(data => {
          commit('ADD_PLANT', { item: config })
          return data.guid
        }))
  }

  return addPlantFromAPI(config)
    .then(data => {
      commit('ADD_PLANT', { item: config })
      return data.guid
    })
}

export const deletePlants = ({ commit }, items) => {
  return deletePlantsFromAPI(items)
    .then(() => commit('DELETE_PLANTS', { items }))
}

export const updatePlant = ({ state, commit }, data) => {
  const item = state.plants.find(p => p.guid === data.guid)
  const config = { ...item, ...data, modified: Date.now() }
  return updatePlantFromAPI(config)
    .then(() => commit('UPDATE_PLANT', { config }))
}
