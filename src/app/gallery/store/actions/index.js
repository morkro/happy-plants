import uuid from 'uuid/v4'
import sleep from '@/utils/sleep'

import {
  getEntry as getEntryLF,
  addEntry as addEntryLF,
  updateEntry as updateEntryLF
} from '@/api/localforage'

const namespace = 'gallery'

export async function loadGallery ({ state, commit }) {
  commit('LOAD_GALLERY_PROGRESS')
  let gallery = []

  if (state.storage.type === 'cloud' && state.user.id) {
    console.warn('DOWNLOAD TO FIREBASE NOT IMPLEMENTED YET')
    // try {
    //   const data = await getEntryFire([['users', state.user.id]])
    //   if (data.exists) {
    //     tags = data.data()[namespace]
    //   }
    // } catch (error) {
    //   commit('LOAD_TAGS_FAILURE')
    // }
  } else {
    const data = await getEntryLF(namespace)
    gallery = data.gallery
  }

  commit('LOAD_GALLERY_SUCCESS', { gallery })
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

  if (!state.storage.migrationMode) {
    commit('ADD_GALLERY_ITEM_SUCCESS', meta)
    dispatch('updateGalleryModule', {
      guid: meta.guid,
      item: meta.item.guid,
      type: 'add'
    })
  }

  // upload to firebase
  if (state.storage.type === 'cloud') {
    await sleep(2000)
    console.warn('UPLOAD TO FIREBASE NOT IMPLEMENTED YET')
  } else {
    await addEntryLF(namespace, state.gallery.data)
    console.warn('GALLERY SHOULD NOT BE STORED LOCALLY')
  }
}

export async function deleteGalleryItem ({ state, commit, dispatch }, data) {
  commit('DELETE_GALLERY_ITEM_PROGRESS')

  const updated = Date.now()
  await updateEntryLF('updated', updated)

  if (!state.storage.migrationMode) {
    commit('DELETE_GALLERY_ITEM_SUCCESS', data)
    dispatch('updateGalleryModule', {
      guid: data.guid,
      item: data.item.guid,
      type: 'delete'
    })
  }

  if (state.storage.type === 'cloud') {
    // delete from firebase
    await sleep(2000)
    console.warn('DELETE TO FIREBASE NOT IMPLEMENTED YET')
  } else {
    await updateEntryLF(namespace, state.gallery.data)
    console.warn('GALLERY SHOULD NOT BE STORED LOCALLY')
  }
}
