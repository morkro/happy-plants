import { updatePlant } from '@/api/plants'
import { updateStore } from '@/api/store'

export const updateSeason = ({ state, commit }, data) => {
  updateStore(data)
    .then(config =>
      commit('UPDATE_SEASON', { item: config.data, updated: config.updated }))
    .then(() => updatePlant(state.active))
}

export const updateNotes = ({ state, commit }, data) => {
  updateStore(data)
    .then(config =>
      commit('UPDATE_NOTES', { item: config.data, updated: config.updated }))
    .then(() => updatePlant(state.active))
}

export const updateWatering = ({ state, commit }, data) => {
  updateStore(data)
    .then(config =>
      commit('UPDATE_WATERING', { item: config.data, updated: config.updated }))
    .then(() => updatePlant(state.active))
}

export const updateName = ({ state, commit }, data) => {
  updateStore(data)
    .then(config =>
      commit('UPDATE_NAME', { item: config.data, updated: config.updated }))
    .then(() => updatePlant(state.active))
}

export const updatePhoto = ({ state, commit }, data) => {
  updateStore(data)
    .then(config =>
      commit('UPDATE_PHOTO', { item: config.data, updated: config.updated }))
    .then(() => updatePlant(state.active))
}
