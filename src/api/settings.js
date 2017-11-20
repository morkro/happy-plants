import localforage from 'localforage'
import blobUtil from 'blob-util'

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
 * 4. Turn all blobs in plant data to base64 strings
 * 5. Turn array into single object
 */
export const getAllData = () => {
  const blackList = ['updated']

  return localforage.keys()
    .then(keys => keys.filter(k => !blackList.includes(k)))
    .then(keys => Promise.all(keys.map(key =>
      localforage.getItem(key).then(values => ({ key, values })))))
    .then(list => Promise.all(list.map(async item => {
      if (item.key.startsWith('plant-')) {
        item.values.blob = await blobUtil.blobToBase64String(item.values.blob)
      }
      return item
    })))
    .then(list => list.reduce((acc, current, index) => {
      acc[current.key] = current.values
      return acc
    }, {}))
}
