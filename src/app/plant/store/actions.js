import { updatePlant } from '@/api/plants'

export const updateSeason = ({ state, commit }, data) => {
  commit('UPDATE_SEASON', data)
  updatePlant(state.plants.find(p => p.guid === data.guid))
}

export const updateNotes = ({ state, commit }, data) => {
  commit('UPDATE_NOTES', data)
  updatePlant(state.plants.find(p => p.guid === data.guid))
}
