import { getEntry, updateEntry } from '@/api/localforage'

const namespace = 'settings'

export const loadSettings = ({ commit }) => {
  return getEntry(namespace)
    .then(settings => commit('LOAD_SETTINGS', settings))
}

export const hasSeenNewRelease = ({ commit }) => {
  commit('HAS_SEEN_NEW_RELEASE')
}

export const updateTheme = ({ state, commit }, data) => {
  const config = { ...state.settings, ...data }
  return updateEntry(namespace, config)
    .then(() => commit('UPDATE_THEME', data))
}
