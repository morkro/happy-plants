import Vue from 'vue'
import { getGalleryStructure } from '@/app/gallery/utils/get-gallery-structure'
import { sortByDate } from '@/utils/sort'

export function ensureGallery (state, guid) {
  const index = state.gallery.data.findIndex(g => g.guid === guid)
  const gallery = state.gallery.data[index]
  return { index, gallery }
}

export default function addGallery (state, payload) {
  const { index, gallery } = ensureGallery(state, payload.guid)

  if (gallery) {
    gallery.list.push(payload.item)
    gallery.list = gallery.list.sort(sortByDate).reverse()
    Vue.set(state.gallery.data, index, gallery)
  } else {
    const newGallery = getGalleryStructure(payload.guid)
    newGallery.list.push(payload.item)
    newGallery.list = newGallery.list.sort(sortByDate).reverse()
    state.gallery.data.push(newGallery)
  }
}
