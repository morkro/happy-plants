import { updateStorage as updateStorageFromAPI, fetchStorage } from '@/api/storage'

export const loadStorage = ({ commit }) => {
  return fetchStorage()
    .then(storage => commit('LOAD_STORAGE', storage))
}

export const updateStorage = ({ state, commit }, data) => {
  const config = { ...state.storage, ...data }
  return updateStorageFromAPI(config)
    .then(() => commit('UPDATE_STORAGE', data))
}
