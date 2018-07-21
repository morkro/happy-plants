import { getEntry, deleteEntry, updateEntry } from './localforage'

const namespace = 'tags'

export const fetchTags = () => {
  return getEntry(namespace)
}

export const updateTags = data => {
  return updateEntry(namespace, data)
}

export const deleteAllTags = () => {
  return deleteEntry(namespace)
}
