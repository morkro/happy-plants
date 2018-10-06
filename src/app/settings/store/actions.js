import {
  addEntry as addEntryLF,
  getEntry as getEntryLF,
  updateEntry as updateEntryLF,
  deleteEntry as deleteEntryLF
} from '@/api/localforage'

import {
  addEntry as addEntryFire,
  updateEntry as updateEntryFire,
  deleteEntry as deleteEntryFire,
  deleteFile
} from '@/api/firebase'

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
      await deleteFile(path.concat(fileName))
    }))
  } else {
    // Delete from localForage
    await deleteEntryLF('tags')
    await deleteEntryLF('storage')
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
    await updateEntryFire([['users', state.user.id]], { tags: state.tags })
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

export async function importPlants ({ state, commit }, data) {
  const updated = Date.now()
  await updateEntryLF('updated', updated)

  commit('IMPORT_PLANTS', { data: data.data, updated })

  if (state.storage.type === 'cloud') {
    await Promise.all(state.plants.data.map(item => addEntryFire([
      ['users', state.user.id],
      [folder, item.guid]
    ])))
  } else {
    await Promise.all(state.plants.data.map(item => addEntryLF(namespace + item.guid, item)))
  }
}
