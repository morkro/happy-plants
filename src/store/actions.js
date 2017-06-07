import uuid from 'uuid/v4'
import {
  fetchPlants,
  addPlant as addPlantFromAPI,
  deletePlant as deletePlantFromAPI,
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

export const addPlant = ({ state, commit }, data) => {
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

export const deletePlant = ({ state, commit }, plantIndex) => {
  return deletePlantFromAPI(state.plants[plantIndex])
    .then(() => commit('DELETE_PLANT', { plantIndex }))
}

export const updatePlant = ({ state, commit }, data) => {
  const item = state.plants.find(p => p.guid === data.guid)
  const config = { ...item, ...data, modified: Date.now() }
  return updatePlantFromAPI(config)
    .then(data => commit('UPDATE_PLANT', { config }))
}
