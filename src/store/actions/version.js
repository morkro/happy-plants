import { getEntry, updateEntry } from '@/api/localforage'

const namespace = 'version'

export const loadVersion = ({ commit }) => {
  return getEntry(namespace)
    .then(version => commit('LOAD_VERSION', version))
}

export const updateVersion = ({ state, commit }) => {
  return updateEntry(namespace, state.version)
    .then(() => commit('UPDATE_VERSION'))
}
