import { getEntry, updateEntry } from '@/api/localforage'

const namespace = 'version'

export const loadVersion = async ({ commit }) => {
  const prevStorage = await getEntry(namespace)
  if (!prevStorage.version) {
    await commit('REGISTER_FIRST_TIME_USER')
    return
  }

  commit('LOAD_VERSION', prevStorage)
}

export const updateVersion = ({ state, commit }) => {
  return updateEntry(namespace, state.version)
    .then(() => commit('UPDATE_VERSION'))
}
