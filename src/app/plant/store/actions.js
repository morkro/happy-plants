import { updatePlant } from '@/api/plants'
import { updateStore } from '@/api/store'
import getDefaultStructure from '@/utils/getDefaultStructure'

export const resetSelectedState = ({ commit }) => {
  commit('RESET_SELECTED_PLANT', { defaultState: getDefaultStructure() })
}

export const updateSeason = ({ state, commit }, data) => {
  updateStore(data)
    .then(config =>
      commit('UPDATE_SEASON', { item: config.data, updated: config.updated }))
    .then(() => updatePlant(state.selected))
}

export const updateNotes = ({ state, commit }, data) => {
  updateStore(data)
    .then(config =>
      commit('UPDATE_NOTES', { item: config.data, updated: config.updated }))
    .then(() => updatePlant(state.selected))
}

export const updateWatering = ({ state, commit }, data) => {
  updateStore(data)
    .then(config => {
      commit('UPDATE_WATERING', { item: config.data, updated: config.updated })
    })
    .then(() => updatePlant(state.selected))
}

export const updateSunshine = ({ state, commit }, data) => {
  updateStore(data)
    .then(config =>
      commit('UPDATE_SUNSHINE', { item: config.data, updated: config.updated }))
    .then(() => updatePlant(state.selected))
}

export const updateName = ({ state, commit }, data) => {
  updateStore(data)
    .then(config =>
      commit('UPDATE_NAME', { item: config.data, updated: config.updated }))
    .then(() => updatePlant(state.selected))
}

export const updatePhoto = ({ state, commit }, data) => {
  updateStore(data)
    .then(config =>
      commit('UPDATE_PHOTO', { item: config.data, updated: config.updated }))
    .then(() => updatePlant(state.selected))
}
