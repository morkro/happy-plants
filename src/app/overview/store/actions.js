import { updatePlant } from '@/api/plants'
import { updateStore } from '@/api/store'
import { updateSettings } from '@/api/settings'

export const updateFilter = ({ state, commit }, data) => {
  const config = { ...state.settings, ...data }
  return updateSettings(config)
    .then(() => commit('UPDATE_FILTER', data))
}

export const updatePlantCategory = ({ state, commit }, data) => {
  updateStore(data)
    .then(config => {
      commit('UPDATE_PLANT_CATEGORY', { item: config.data, updated: config.updated })
      return config
    })
    .then(config => {
      updatePlant(state.plants.find(plant => plant.guid === config.data.guid))
    })
}

export const updatePlantsList = ({ state, commit }, data) => {
  return Promise.resolve()
    .then(() => commit('UPDATE_PLANT_OVERVIEW', { item: data }))
}
