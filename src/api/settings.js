import { getEntryWN, updateEntry, getAllEntries } from './localforage'

const namespace = 'settings'

export const updateSettings = data => {
  return updateEntry(namespace, data)
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
