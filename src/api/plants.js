import {
  getEntry,
  getEntryWN,
  deleteEntry,
  addEntry,
  updateEntry,
  getAllEntries
} from './localforage'

const namespace = 'plant-'

export const fetchPlants = () => {
  return getEntry(namespace)
    .then(data => {
      const copy = data
      delete copy[namespace + 'undefined']
      return copy
    })
    .then(Object.values)
}

export const addPlant = data => {
  return addEntry(namespace + data.guid, data)
}

export const deletePlant = data => {
  return deleteEntry(namespace + data.guid)
}

export const deletePlants = data => {
  return Promise.all(data.map(deletePlant))
}

export const updatePlant = data => {
  return updateEntry(namespace + data.guid, data)
}

export const getPlant = guid => {
  return getEntryWN(namespace + guid)
}

export const getAllPlants = () => {
  return getAllEntries()
}

export const deleteAllPlants = () => {
  return fetchPlants().then(deletePlants)
}
