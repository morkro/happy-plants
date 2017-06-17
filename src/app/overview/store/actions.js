import { updateSettings } from '@/api/settings'

export const updateFilter = ({ state, commit }, data) => {
  const config = { ...state.settings, ...data }
  return updateSettings(config)
    .then(() => commit('UPDATE_FILTER', data))
}
