import { updateStore } from '@/api/store'
import { updateSettings, getAllData as getAllDataFromAPI } from '@/api/settings'
import { updateCategories, deleteAllCategories } from '@/api/categories'
import { addPlant, deleteAllPlants } from '@/api/plants'

export const getAllData = ({ commit }) => {
  return getAllDataFromAPI()
}

export const deleteAllData = ({ commit }) => {
  return updateStore()
    .then(config =>
      commit('DELETE_ALL_DATA', { updated: config.updated }))
    .then(() => Promise.all([deleteAllPlants(), deleteAllCategories()]))
}

export const importCategories = ({ state, commit }, data) => {
  return updateStore(data)
    .then(config =>
      commit('IMPORT_CATEGORIES', { data: config.data, updated: config.updated }))
    .then(() => updateCategories(state.categories))
}

export const importSettings = ({ state, commit }, data) => {
  return updateStore(data)
    .then(config =>
      commit('IMPORT_SETTINGS', { data: config.data, updated: config.updated }))
    .then(() => updateSettings(state.settings))
}

export const importPlants = ({ state, commit }, data) => {
  return updateStore(data)
    .then(config =>
      commit('IMPORT_PLANTS', { data: config.data.data, updated: config.updated }))
    .then(() => Promise.all(state.plants.map(addPlant)))
}
