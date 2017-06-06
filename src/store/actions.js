import {
  fetchPlants,
  addPlant as addPlantFromAPI,
  deletePlant as deletePlantFromAPI
} from '@/api/plants'

export const loadPlants = ({ state, commit }) => {
  if (!state.plants || state.plants.length === 0) {
    return fetchPlants()
      .then(plants => commit('LOAD_PLANTS', { plants }))
  }
}

export const addPlant = ({ state, commit }, data) => {
  return addPlantFromAPI(data)
    .then(() => commit('ADD_PLANT', { data }))
}

export const deletePlant = ({ state, commit }, plantIndex) => {
  return deletePlantFromAPI(state[plantIndex])
    .then(() => commit('DELETE_PLANT', { plantIndex }))
}
