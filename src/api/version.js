import { getEntry, updateEntry } from './localforage'

const namespace = 'version'

export const fetchVersion = () => {
  return getEntry(namespace)
}

export const updateVersion = (data) => {
  return updateEntry(namespace, data)
}
