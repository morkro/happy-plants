import { updateSettings } from '@/api/settings'

export const updateViewmode = ({ state, commit }, data) => {
  const config = { ...state.settings, ...data }
  return updateSettings(config)
    .then(() => commit('UPDATE_VIEWMODE', data))
}

export const updatePlantsList = ({ state, commit }, data) => {
  return Promise.resolve()
    .then(() => commit('UPDATE_PLANT_OVERVIEW', { item: data }))
}
