import blobUtil from 'blob-util'
import localforage from 'localforage'

/**
 * @param  {Function} cb
 * @return {Promise}
 * 1. Grab all entries starting with 'plant-'
 * 2. Load each entry from IndexedDB
 * 3. Modify entries with an image URL from blob
 * 4. Pass callback to `then`
 */
export function getAllPlants (cb) {
  localforage.keys()
    .then(keys =>
      keys.filter(k => k.startsWith('plant-')))
    .then(keys =>
      Promise.all(keys.map(p => localforage.getItem(p))))
    .then(plants =>
      plants.map(p => ({
        ...p,
        imageURL: blobUtil.createObjectURL(p.blob)
      })))
    .then(cb)
}
