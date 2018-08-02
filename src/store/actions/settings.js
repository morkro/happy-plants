import { updateSettings, fetchSettings } from '@/api/settings'

export const loadSettings = ({ commit }) => {
  return fetchSettings()
    .then(settings => commit('LOAD_SETTINGS', settings))
}

export const hasSeenNewRelease = ({ commit }) => {
  commit('HAS_SEEN_NEW_RELEASE')
}

export const updateTheme = ({ state, commit }, data) => {
  const config = { ...state.settings, ...data }
  return updateSettings(config)
    .then(() => commit('UPDATE_THEME', data))
}
