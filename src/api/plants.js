import { addEntry } from './localforage'

const namespace = 'plant-'

export const addPlant = data => {
  return addEntry(namespace + data.guid, data)
}
