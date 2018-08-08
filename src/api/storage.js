import { getEntry, updateEntry } from './localforage'

const namespace = 'storage'

export const fetchStorage = () => {
  return getEntry(namespace)
}

export const updateStorage = data => {
  return updateEntry(namespace, data)
}
