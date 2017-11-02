import { updateStore } from '@/api/store'
import {
  getAllPlants as getAllPlantsFromAPI,
  deleteAllPlants as deleteAllPlantsFromAPI
} from '@/api/plants'

export const getAllPlants = () => {
  return getAllPlantsFromAPI()
}

export const deleteAllPlants = ({ commit }) => {
  return updateStore()
    .then(config => commit('DELETE_ALL_PLANTS', { updated: config.updated }))
    .then(() => deleteAllPlantsFromAPI())
}

export const importPlantData = ({ commit }, data) => {
  return updateStore()
    .then(config => commit('IMPORT_PLANT_DATA', {
      updated: config.updated,
      ...data
    }))
}
