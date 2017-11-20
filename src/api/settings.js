import localforage from 'localforage'

const namespace = 'settings'

export const fetchSettings = () => {
  return localforage.startsWith(namespace)
}

export const updateSettings = data => {
  return localforage.setItem(namespace, data)
}

/**
 * Returns all app data.
 * 1. Get all keys from IndexedDB as array
 * 2. Remove unwanted elements defined in blacklist
 * 3. Load items from IndexedDB and return as array with objects
 * 4. Turn array into single object
 */
export const getAllData = () => {
  const blackList = ['updated']
  return localforage.keys()
    .then(keys => keys.filter(k => !blackList.includes(k)))
    .then(keys => Promise.all(keys.map(key =>
      localforage.getItem(key).then(values => ({ key, values })))))
    .then(list => list.reduce((acc, current, index) => {
      acc[current.key] = current.values
      return acc
    }, {}))
}
