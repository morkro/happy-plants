import localforage from 'localforage'

const namespace = 'tags'

export const fetchTags = () => {
  return localforage.startsWith(namespace)
}

export const updateTags = data => {
  return localforage.setItem(namespace, data)
}

export const deleteAllTags = () => {
  return localforage.removeItem(namespace)
}
