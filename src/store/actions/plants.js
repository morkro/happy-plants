import uuid from 'uuid/v4'
import { blobToBase64String } from 'blob-util'
import { convertToBlob } from '@/utils/blob'
import { iOS } from '@/utils/useragent'
import {
  fetchPlants,
  getPlant
} from '@/api/plants'

import {
  addEntry as addEntryLF,
  updateEntry as updateEntryLF,
  deleteEntry as deleteEntryLF
} from '@/api/localforage'

import {
  addEntry as addEntryFire,
  updateEntry as updateEntryFire,
  deleteEntry as deleteEntryFire
} from '@/api/firebase'

const namespace = 'plant-'
const folder = 'plants'

function shrinkPlantObjects (plant) {
  return {
    name: plant.name,
    blob: plant.blob,
    created: plant.created,
    guid: plant.guid
  }
}

/**
 * Clean up method to migrate old plant object structure to new system.
 */
function cleanUpPlantObject (plant) {
  const plantCopy = plant

  if (!plantCopy.modules) {
    plantCopy.modules = []
  }

  if (plantCopy.tags === undefined) {
    plantCopy.tags = []
  }

  delete plantCopy.componentOrder
  delete plantCopy.notes
  delete plantCopy.seasons
  delete plantCopy.sunshine
  delete plantCopy.watering

  return plantCopy
}

export const loadPlants = ({ state, commit }, data = {}) => {
  if (!state.plants || state.plants.length === 0 || !!data.force) {
    return fetchPlants()
      .then(data => Promise.all(data.map(shrinkPlantObjects).map(convertToBlob)))
      .then(plants => commit('LOAD_PLANTS', { plants }))
  }

  return Promise.resolve()
}

export const loadPlantItem = ({ state, commit }, guid) => {
  getPlant(guid)
    .then(convertToBlob)
    .then(cleanUpPlantObject)
    .then(item => commit('LOAD_PLANT_ITEM', { item }))
}

export async function addPlant ({ state, commit }, data) {
  const meta = {
    ...data,
    guid: uuid(),
    created: Date.now(),
    modified: Date.now()
  }
  const payload = { item: meta }

  if (state.storage.type === 'cloud') {
    await addEntryFire([
      ['users', state.user.id],
      [folder, meta.guid]
    ], meta)
  }

  // FIXME: This is generally a bad idea. Use feature detection instead.
  // However, I could not find a reliable way to test if IndexedDB supports blobs,
  // as it fails silently. We have to convert the blob to base64,
  // because mobile Safari 10 has a bug with storing Blobs in IndexedDB.
  if (iOS && !!data.blob) {
    // 1. Turn blob into base64 string (only needed for storage)
    const base64String = await blobToBase64String(data.blob)
    const config = Object.assign({}, meta, { blob: base64String })

    await addEntryLF(namespace + config.guid, config)
    payload.item = Object.assign({}, config, { blob: data.blob })
  } else {
    await addEntryLF(namespace + meta.guid, meta)
  }

  commit('ADD_PLANT', payload)
  return meta.guid
}

export async function updatePlant (action, { state, commit }, data) {
  const updated = Date.now()
  await updateEntryLF('updated', updated)

  commit(action, { item: data, updated })

  if (state.storage.type === 'cloud') {
    await updateEntryFire([
      ['users', state.user.id],
      [folder, state.selected.guid]
    ], state.selected)
  }

  await updateEntryLF(namespace + state.selected.guid, state.selected)
}

export async function deletePlants ({ state, commit }, items) {
  if (state.storage.type === 'cloud') {
    await Promise.all(items.map(item => deleteEntryFire([
      ['users', state.user.id],
      [folder, item.guid]
    ])))
  }

  await Promise.all(items.map(item => deleteEntryLF(namespace + item.guid, item)))

  commit('DELETE_PLANTS', { items })
}
