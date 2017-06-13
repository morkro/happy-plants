import uuid from 'uuid/v4'
import {
  fetchPlants,
  addPlant as addPlantFromAPI,
  deletePlants as deletePlantsFromAPI,
  updatePlant as updatePlantFromAPI
} from '@/api/plants'

export const loadPlants = ({ state, commit }) => {
  if (!state.plants || state.plants.length === 0) {
    return fetchPlants()
      .then(plants => commit('LOAD_PLANTS', { plants }))
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
  return addPlantFromAPI(config)
    .then(data => {
      commit('ADD_PLANT', config)
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
    .then(data => commit('UPDATE_PLANT', { config }))
}

export const showNotification = ({ commit }, data) => {
  commit('SHOW_NOTIFICATION', data)
}

export const hideNotification = ({ commit }) => {
  commit('HIDE_NOTIFICATION')
}
