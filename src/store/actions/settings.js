import { fetchSettings } from '@/api/settings'

export const loadSettings = ({ commit }) => {
  return fetchSettings()
    .then(settings => commit('LOAD_SETTINGS', settings))
}
