import { getEntry, updateEntry } from '@/api/localforage'

const namespace = 'storage'

export const loadStorage = ({ commit }) => {
  return getEntry(namespace)
    .then(storage => commit('LOAD_STORAGE', storage))
}

export const updateStorage = ({ state, commit }, data) => {
  const config = { ...state.storage, ...data }
  return updateEntry(namespace, config)
    .then(() => commit('UPDATE_STORAGE', data))
}
