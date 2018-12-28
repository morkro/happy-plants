import {
  updateEntry as updateEntryLF
} from '@/api/localforage'

import {
  deleteEntry as deleteEntryFire,
  deleteFile
} from '@/api/firebase'

const namespace = 'gallery'
const rootFolder = 'plants'
const folder = 'gallery'

export async function deleteGalleryItem ({ state, commit, dispatch }, data) {
  commit('DELETE_GALLERY_ITEM_PROGRESS')

  const updated = Date.now()
  await updateEntryLF('updated', updated)

  if (state.storage.type === 'cloud') {
    try {
      const path = [
        ['users', state.user.id],
        [rootFolder, state.plants.selected.guid],
        [folder, data.item.guid]
      ]
      await Promise.all([
        await deleteEntryFire(path),
        await deleteFile(path)
      ])
    } catch (error) {
      commit('DELETE_GALLERY_ITEM_FAILURE')
    }
  } else {
    await updateEntryLF(namespace, state.gallery.data)
    console.warn('GALLERY SHOULD NOT BE STORED LOCALLY') // eslint-disable-line
  }

  if (!state.storage.migrationMode) {
    commit('DELETE_GALLERY_ITEM_SUCCESS', data)
    dispatch('updateGalleryModule', {
      guid: data.guid,
      item: data.item.guid,
      type: 'delete'
    })
  }
}
