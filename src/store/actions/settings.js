import { fetchSettings } from '@/api/settings'

export const loadSettings = ({ commit }) => {
  return fetchSettings()
    .then(settings => commit('LOAD_SETTINGS', settings))
}

export const hasSeenNewRelease = ({ commit }) => {
  commit('HAS_SEEN_NEW_RELEASE')
}
