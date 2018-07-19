import localforage from 'localforage'

const namespace = 'version'

export const fetchVersion = (data) => {
  return localforage.startsWith(namespace)
}

export const updateVersion = (data) => {
  return localforage.setItem(namespace, data)
}
