import localforage from 'localforage'

const namespace = 'plant-'

export const fetchPlants = () => {
  return localforage.startsWith(namespace)
    .then(Object.values)
}

export const addPlant = data => {
  return localforage.setItem(namespace + data.guid, data)
}

export const deletePlant = data => {
  return localforage.removeItem(namespace + data.guid)
}

export const updatePlant = data => {
  return localforage.setItem(namespace + data.guid, data)
}

export const getAllPlants = () => {
  return localforage.keys()
    .then(keys => Promise.all(keys.map(k => localforage.getItem(k))))
}
