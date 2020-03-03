import { v4 as uuid } from 'uuid'

import {
  addEntry as addEntryLF,
  updateEntry as updateEntryLF
} from '@/api/localforage'

import {
  storagePath,
  addEntry as addEntryFire,
  uploadFile
} from '@/api/firebase'

const namespace = 'gallery'
const rootFolder = 'plants'
const folder = 'gallery'

async function addGalleryItemFirestore (state, meta) {
  const path = [
    ['users', state.user.id],
    [rootFolder, state.plants.selected.guid],
    [folder, meta.item.guid]
  ]
  await addEntryFire(path, {
    ...meta.item,
    blob: null,
    imageURL: storagePath(path)
  })
  await uploadFile(path, meta.item.blob)
}

export async function addGalleryItem ({ state, commit, dispatch }, data) {
  commit('ADD_GALLERY_ITEM_PROGRESS')
  const meta = {
    ...data,
    item: {
      ...data.item,
      guid: uuid(),
      created: Date.now(),
      modified: Date.now()
    }
  }

  const updated = Date.now()
  await updateEntryLF('updated', updated)

  if (state.storage.type === 'cloud') {
    try {
      await addGalleryItemFirestore(state, meta)
    } catch (error) {
      commit('ADD_GALLERY_ITEM_FAILURE')
    }
  } else {
    await addEntryLF(namespace, state.gallery.data)
    console.warn('GALLERY SHOULD NOT BE STORED LOCALLY') // eslint-disable-line
  }

  if (!state.storage.migrationMode) {
    commit('ADD_GALLERY_ITEM_SUCCESS', meta)
    dispatch('updateGalleryModule', {
      guid: meta.guid,
      item: meta.item.guid,
      type: 'add'
    })
  }
}
