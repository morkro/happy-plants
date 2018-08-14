import { getEntry, getEntryWN, updateEntry, getAllEntries } from '@/api/localforage'

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

/**
 * Returns all app data.
 * 1. Get all keys from IndexedDB as array
 * 2. Remove unwanted elements defined in blacklist
 * 3. Load items from IndexedDB and return as array with objects
 * 4. Remove all imageURL from objects
 * 5. Turn array into single object
 */
export const getAllData = () => {
  const blackList = ['updated']
  const loadEach = false

  return getAllEntries(loadEach)
    .then(keys => keys.filter(k => !blackList.includes(k)))
    .then(keys => Promise.all(keys.map(key =>
      getEntryWN(key).then(values => ({ key, values })))))
    .then(list => Promise.all(list.map(item => {
      if (item.key.startsWith('plant-')) {
        item.values.imageURL = ''
      }
      return item
    })))
    .then(list => list.reduce((acc, current, index) => {
      acc[current.key] = current.values
      return acc
    }, {}))
}
