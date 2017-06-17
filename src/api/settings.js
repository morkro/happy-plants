import localforage from 'localforage'

const namespace = 'settings'

export const fetchSettings = () => {
  return localforage.startsWith(namespace)
}

export const updateSettings = data => {
  return localforage.setItem(namespace, data)
}
