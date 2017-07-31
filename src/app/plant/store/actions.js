import { updatePlant } from '@/api/plants'
import { updateStore } from '@/api/store'

export const updateSeason = ({ state, commit }, data) => {
  updateStore(data)
    .then(config => {
      commit('UPDATE_SEASON', { item: config.data, updated: config.updated })
      return config
    })
    .then(config => updatePlant(state.plants.find(p => p.guid === config.data.guid)))
}

export const updateNotes = ({ state, commit }, data) => {
  updateStore(data)
    .then(config => {
      commit('UPDATE_NOTES', { item: config.data, updated: config.updated })
      return config
    })
    .then(config => updatePlant(state.plants.find(p => p.guid === config.data.guid)))
}

export const updateWatering = ({ state, commit }, data) => {
  updateStore(data)
    .then(config => {
      commit('UPDATE_WATERING', { item: config.data, updated: config.updated })
      return config
    })
    .then(config => updatePlant(state.plants.find(p => p.guid === config.data.guid)))
}
