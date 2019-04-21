import { getEntry, updateEntry } from '@/api/localforage'

const namespace = 'version'

export const updateVersion = async ({ state, commit }) => {
  const prevStorage = await getEntry(namespace)
  if (!prevStorage.version) {
    await commit('REGISTER_FIRST_TIME_USER')
    return
  }

  await commit('LOAD_VERSION', prevStorage)
  await updateEntry(namespace, state.version)
  await commit('UPDATE_VERSION')
}
