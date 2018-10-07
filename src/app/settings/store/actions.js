import {
  addEntry as addEntryLF,
  getEntry as getEntryLF,
  updateEntry as updateEntryLF,
  deleteEntry as deleteEntryLF
} from '@/api/localforage'

import {
  addEntry as addEntryFire,
  deleteEntry as deleteEntryFire,
  deleteFile
} from '@/api/firebase'

import { isBlobbable } from '@/utils/blob'

const namespace = 'plant-'
const folder = 'plants'
const fileName = 'cover.png'

export async function getAllData ({ state }) {
  return {
    version: state.version,
    settings: state.settings,
    plants: state.plants,
    tags: state.tags,
    storage: state.storage
  }
}

export async function deleteAllData ({ state, commit }) {
  const updated = Date.now()
  await updateEntryLF('updated', updated)

  // Delete from Firebase
  if (state.storage.type === 'cloud') {
    await deleteEntryFire([['users', state.user.id]])
    await Promise.all(state.plants.data.map(async (plant) => {
      const path = [['users', state.user.id], [folder, plant.guid]]
      await deleteEntryFire(path)
      if (plant.blob && isBlobbable(plant.blob)) {
        await deleteFile(path.concat(fileName))
      }
    }))
  } else {
    // Delete from localForage
    await deleteEntryLF('tags')
    await deleteEntryLF('storage')
    await deleteEntryLF('settings')
    await getEntryLF(namespace)
      .then(Object.values)
      .then(data =>
        Promise.all(data.map(p => deleteEntryLF(namespace + p.guid))))
  }

  commit('DELETE_ALL_DATA', { updated })
}

export async function importTags ({ state, commit }, data) {
  const updated = Date.now()
  await updateEntryLF('updated', updated)

  commit('IMPORT_TAGS', { data, updated })

  if (state.storage.type === 'cloud') {
    await addEntryFire([['users', state.user.id]], { tags: state.tags.data })
  } else {
    await updateEntryLF('tags', state.tags.data)
  }
}

export async function importSettings ({ state, commit }, data) {
  const updated = Date.now()
  await updateEntryLF('updated', updated)

  commit('IMPORT_SETTINGS', { data, updated })

  await updateEntryLF('settings', state.settings)
}

function cleanUpPlantData (oldData) {
  const copy = oldData

  if (copy.categories) {
    delete copy.categories
  }

  if (!isBlobbable(copy.blob)) {
    copy.blob = null
  }

  if (!Array.isArray(copy.tags)) {
    copy.tags = []
  }

  return copy
}

export async function importPlants ({ state, commit }, data) {
  const updated = Date.now()
  await updateEntryLF('updated', updated)
  let plantData = data

  if (Array.isArray(plantData)) {
    plantData = plantData.map(cleanUpPlantData)
  } else {
    plantData = cleanUpPlantData(data.data)
  }

  commit('IMPORT_PLANTS', { data: data.data, updated })

  if (state.storage.type === 'cloud') {
    if (Array.isArray(data.data)) {
      await Promise.all(state.plants.data.map(item => addEntryFire([
        ['users', state.user.id],
        [folder, item.guid]
      ], item)))
    } else {
      if (!data.data.guid) return
      await addEntryFire([
        ['users', state.user.id],
        [folder, data.data.guid]
      ], data.data)
    }
  } else {
    await Promise.all(state.plants.data.map(item => addEntryLF(namespace + item.guid, item)))
  }
}
