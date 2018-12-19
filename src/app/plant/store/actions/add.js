import uuid from 'uuid/v4'
import { blobToBase64String } from 'blob-util'
import { isBlobbable } from '@/utils/blob'
import { iOS } from '@/utils/useragent'

import {
  addEntry as addEntryLF
} from '@/api/localforage'

import {
  storagePath,
  addEntry as addEntryFire,
  uploadFile
} from '@/api/firebase'

const namespace = 'plant-'
const folder = 'plants'
const fileName = 'cover.png'

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
