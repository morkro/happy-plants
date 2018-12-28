import sleep from '@/utils/sleep'

import {
  updateEntry as updateEntryLF
} from '@/api/localforage'

const namespace = 'gallery'

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
