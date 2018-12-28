import { getEntry as getEntryLF } from '@/api/localforage'

import { firestoreQuery, downloadFile } from '@/api/firebase'

const namespace = 'gallery'
const rootFolder = 'plants'
const folder = 'gallery'

async function loadGalleryFirestore ({ state, commit }, guid = state.plants.selected.guid) {
  const gallery = []
  const snapshot = await firestoreQuery([
    ['users', state.user.id],
    [rootFolder, guid],
    [folder]
  ]).get()
  commit('LOAD_GALLERY_TOTAL_COUNT', { total: snapshot.size, guid })

  for (const doc of snapshot.docs) {
    const item = await firestoreQuery([
      ['users', state.user.id],
      [rootFolder, guid],
      [folder, doc.id]
    ]).get()
    const galleryData = item.data()

    if (galleryData.imageURL) {
      galleryData.imageURL = await downloadFile(galleryData.imageURL)
    }

    if (!state.storage.migrationMode) {
      commit('LOAD_GALLERY_SINGLE', { guid, item: galleryData })
    }

    gallery.unshift(galleryData)
  }

  return gallery
}

export async function loadGallery ({ state, commit }, guid) {
  commit('LOAD_GALLERY_PROGRESS')
  let gallery = []

  if (state.storage.type === 'cloud' && state.user.id) {
    gallery = await loadGalleryFirestore({ state, commit }, guid)
  } else {
    const data = await getEntryLF(namespace)
    gallery = data.gallery
  }

  commit('LOAD_GALLERY_SUCCESS', { gallery })
}
