import { updateStoreTimestamp } from '@/api/store'
import { updateSettings } from '@/api/settings'
import { updateTags } from '@/api/tags'
import { addPlant } from '@/api/plants'

import {
  getEntry as getEntryLF,
  updateEntry as updateEntryLF,
  deleteEntry as deleteEntryLF
} from '@/api/localforage'

import {
  // getEntry as getEntryFire,
  deleteEntry as deleteEntryFire
} from '@/api/firebase'

export async function deleteAllData ({ state, commit }) {
  const updated = Date.now()
  await updateEntryLF('updated', updated)

  // Delete from Firebase
  if (state.storage.type === 'cloud') {
    await deleteEntryFire([['users', state.user.id]])
    await Promise.all(state.plants.data.map(plant => deleteEntryFire([
      ['users', state.user.id],
      ['plants', plant.guid]
    ])))
  }

  // Delete from localForage
  await deleteEntryLF('tags')
  await deleteEntryLF('storage')
  await getEntryLF('plant-')
    .then(Object.values)
    .then(data =>
      Promise.all(data.map(p => deleteEntryLF('plant-' + p.guid))))

  commit('DELETE_ALL_DATA', { updated })
}

export const importTags = ({ state, commit }, data) => {
  return updateStoreTimestamp(data)
    .then(config =>
      commit('IMPORT_TAGS', { data: config.data, updated: config.updated }))
    .then(() => updateTags(state.tags))
}

export const importSettings = ({ state, commit }, data) => {
  return updateStoreTimestamp(data)
    .then(config =>
      commit('IMPORT_SETTINGS', { data: config.data, updated: config.updated }))
    .then(() => updateSettings(state.settings))
}

export const importPlants = ({ state, commit }, data) => {
  return updateStoreTimestamp(data)
    .then(config =>
      commit('IMPORT_PLANTS', { data: config.data.data, updated: config.updated }))
    .then(() => Promise.all(state.plants.data.map(addPlant)))
}
