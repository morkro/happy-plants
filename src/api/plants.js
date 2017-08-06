import localforage from 'localforage'

const namespace = 'plant-'

export const fetchPlants = () => {
  return localforage.startsWith(namespace)
    .then(Object.values)
}

export const addPlant = data => {
  return localforage.setItem(namespace + data.guid, data)
}

export const deletePlants = data => {
  return Promise.all(data.map(item => localforage.removeItem(namespace + item.guid)))
}

export const updatePlant = data => {
  return localforage.setItem(namespace + data.guid, data)
}

export const getAllPlants = () => {
  return localforage.keys()
    .then(keys => Promise.all(keys.map(k => localforage.getItem(k))))
}

export const deleteAllPlants = () => {
  return fetchPlants().then(deletePlants)
}
