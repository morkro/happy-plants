import localforage from 'localforage'

const namespace = 'categories'

export const fetchCategories = () => {
  return localforage.startsWith(namespace)
}

export const updateCategories = data => {
  return localforage.setItem(namespace, data)
}

export const deleteAllCategories = () => {
  return localforage.removeItem(namespace)
}
