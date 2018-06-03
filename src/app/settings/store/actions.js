import { updateStoreTimestamp } from '@/api/store'
import { updateSettings, getAllData as getAllDataFromAPI } from '@/api/settings'
import { updateTags, deleteAllTags } from '@/api/tags'
import { addPlant, deleteAllPlants } from '@/api/plants'

export const getAllData = ({ commit }) => {
  return getAllDataFromAPI()
}

export const deleteAllData = ({ commit }) => {
  return updateStoreTimestamp()
    .then(config =>
      commit('DELETE_ALL_DATA', { updated: config.updated }))
    .then(() => Promise.all([deleteAllPlants(), deleteAllTags()]))
}

export const importCategories = ({ state, commit }, data) => {
  return updateStoreTimestamp(data)
    .then(config =>
      commit('IMPORT_TAGS', { data: config.data, updated: config.updated }))
    .then(() => updateTags(state.tags))
}

export const importSettings = ({ state, commit }, data) => {
  return updateStoreTimestamp(data)
    .then(config =>
      commit('IMPORT_SETTINGS', { data: config.data, updated: config.updated }))
    .then(() => updateSettings(state.settings))
}

export const importPlants = ({ state, commit }, data) => {
  return updateStoreTimestamp(data)
    .then(config =>
      commit('IMPORT_PLANTS', { data: config.data.data, updated: config.updated }))
    .then(() => Promise.all(state.plants.map(addPlant)))
}
