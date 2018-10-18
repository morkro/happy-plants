import uuid from 'uuid/v4'
import { blobToBase64String } from 'blob-util'
import { isBlobbable, getUrlFromBlob } from '@/utils/blob'
import { iOS } from '@/utils/useragent'

import {
  getEntry as getEntryLF,
  addEntry as addEntryLF,
  updateEntry as updateEntryLF,
  deleteEntry as deleteEntryLF
} from '@/api/localforage'

import {
  storagePath,
  firestoreQuery,
  addEntry as addEntryFire,
  updateEntry as updateEntryFire,
  deleteEntry as deleteEntryFire,
  uploadFile,
  deleteFile,
  downloadFile
} from '@/api/firebase'

const namespace = 'plant-'
const folder = 'plants'
const fileName = 'cover.png'

async function loadPlantsFirestore (state, commit) {
  const plants = []
  const snapshot = await firestoreQuery([['users', state.user.id], [folder]]).get()
  commit('LOAD_PLANTS_TOTAL_COUNT', { total: snapshot.docs.length })

  for (const doc of snapshot.docs) {
    const plant = await firestoreQuery([
      ['users', state.user.id],
      [folder, doc.id]
    ]).get()
    const plantData = plant.data()

    if (plantData.imageURL) {
      plantData.imageURL = await downloadFile(plantData.imageURL)

      if (state.storage.migrationMode) {
        const photo = await fetch(plantData.imageURL)
        plantData.blob = await photo.blob()
        plantData.imageURL = getUrlFromBlob(plantData.blob)
      }
    }

    if (!state.storage.migrationMode) {
      commit('LOAD_PLANTS_SINGLE', { plant: plantData })
    }

    plants.push(plantData)
  }

  return plants
}

async function loadPlantsLocalforage () {
  const plants = []
  const values = await getEntryLF(namespace)
    .then(plantData => {
      const copy = plantData
      delete copy[namespace + 'undefined']
      return copy
    })
    .then(Object.values)

  for (const item of values) {
    plants.push(item)
  }

  return plants
}

export async function loadPlants ({ state, commit }) {
  commit('LOAD_PLANTS_PROGRESS')
  let plants = []

  if (state.storage.type === 'cloud' && state.user.id) {
    try {
      plants = await loadPlantsFirestore(state, commit)
    } catch (error) {
      commit('LOAD_PLANTS_FAILURE')
    }
   } else {
    plants = await loadPlantsLocalforage()
  }

  commit('LOAD_PLANTS_SUCCESS', { plants })
}

export function loadPlantItem ({ state, commit }, guid) {
  commit('LOAD_PLANT_ITEM', { guid })
}

async function addPlantFirestore (state, meta) {
  const path = [['users', state.user.id], [folder, meta.guid]]
  const hasFile = meta.blob && isBlobbable(meta.blob)
  const blob = meta.blob
  await addEntryFire(path, {
    ...meta,
    blob: null,
    imageURL: hasFile && `${storagePath(path)}/${fileName}`
  })
  if (hasFile) {
    await uploadFile(path.concat(fileName), blob)
  }
}

async function addPlantLocalforage (state, meta) {
  // FIXME: This is generally a bad idea. Use feature detection instead.
  // However, I could not find a reliable way to test if IndexedDB supports blobs,
  // as it fails silently. We have to convert the blob to base64,
  // because mobile Safari 10 has a bug with storing Blobs in IndexedDB.

  if (iOS && !!meta.blob) {
    const base64String = await blobToBase64String(meta.blob)
    await addEntryLF(namespace + meta.guid, { ...meta, blob: base64String })
  } else {
    await addEntryLF(namespace + meta.guid, meta)
  }
}

export async function addPlant ({ state, commit }, data) {
  commit('ADD_PLANT_PROGRESS')
  const meta = state.storage.migrationMode ? data : {
    ...data,
    guid: uuid(),
    created: Date.now(),
    modified: Date.now()
  }

  if (state.storage.type === 'cloud') {
    try {
      await addPlantFirestore(state, meta)
    } catch (error) {
      commit('ADD_PLANT_FAILURE')
    }
  } else {
    await addPlantLocalforage(state, meta)
  }

  if (!state.storage.migrationMode) {
    commit('ADD_PLANT_SUCCESS', { item: meta })
  }

  return meta.guid
}

export async function updatePlant (action, { state, commit }, data) {
  const updated = Date.now()
  await updateEntryLF('updated', updated)

  commit(action, { item: data, updated })

  if (state.storage.type === 'cloud') {
    const path = [['users', state.user.id], [folder, state.selected.guid]]
    const { imageURL, blob, ...selected } = state.selected

    if (action === 'UPDATE_PHOTO') {
      await uploadFile(path.concat(fileName), data.blob)
    }

    await updateEntryFire(path, selected)
  } else {
    await updateEntryLF(namespace + state.selected.guid, state.selected)
  }
}

export async function deletePlants ({ state, commit }, items) {
  commit('DELETE_PLANT_PROGRESS')

  if (state.storage.type === 'cloud') {
    try {
      await Promise.all(items.map(async item => {
        const path = [['users', state.user.id], [folder, item.guid]]
        await deleteEntryFire(path)
        if (item.blob && isBlobbable(item.blob)) {
          await deleteFile(path.concat(fileName))
        }
      }))
    } catch (error) {
      commit('DELETE_PLANTS_FAILURE')
    }
  } else {
    await Promise.all(items.map(item => deleteEntryLF(namespace + item.guid, item)))
  }

  if (!state.storage.migrationMode) {
    commit('DELETE_PLANTS_SUCCESS', { items })
  }
}
