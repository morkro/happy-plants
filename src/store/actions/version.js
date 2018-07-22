import { fetchVersion, updateVersion as updateVersionFromAPI } from '@/api/version'

export const loadVersion = ({ commit }) => {
  return fetchVersion()
    .then(version => commit('LOAD_VERSION', version))
}

export const updateVersion = ({ state, commit }) => {
  return updateVersionFromAPI(state.version)
    .then(() => commit('UPDATE_VERSION'))
}
