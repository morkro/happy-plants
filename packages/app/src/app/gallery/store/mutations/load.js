import Vue from 'vue'
import { sortByDate } from '@/utils/sort'
import isEmptyObject from '@/utils/is-object'
import { getGalleryStructure } from '@/app/gallery/utils/get-gallery-structure'
import { ensureGallery } from '@/app/gallery/store/utils/add-gallery'

export default {
  LOAD_GALLERY_PROGRESS (state) {
    state.gallery.loading = true
  },

  LOAD_GALLERY_TOTAL_COUNT (state, payload) {
    state.gallery.loading = true
    state.gallery.data.push({
      ...getGalleryStructure(payload.guid),
      list: new Array(payload.total).fill({})
    })
  },

  LOAD_GALLERY_SINGLE (state, payload) {
    let { index, gallery } = ensureGallery(state, payload.guid)
    let galleryCopy = gallery.list
    const allGallery = galleryCopy
      .filter(gallery => !isEmptyObject(gallery))
      .concat([payload.item])
    galleryCopy = galleryCopy.slice(allGallery.length, galleryCopy.length)

    if (gallery) {
      gallery.list = allGallery.concat(galleryCopy).sort(sortByDate).reverse()
      Vue.set(state.gallery.data, index, gallery)
    } else {
      const newGallery = getGalleryStructure(payload.guid)
      newGallery.list = allGallery.concat(galleryCopy).sort(sortByDate).reverse()
      state.gallery.data.push(newGallery)
    }
  },

  LOAD_GALLERY_SUCCESS (state, payload) {
    state.gallery.loading = false
    state.gallery.finished = true
    state.gallery.error = false

    if (state.storage.type === 'local' && payload.gallery.length) {
      state.gallery.data = payload.gallery.sort(sortByDate).reverse()
    }
  },

  LOAD_GALLERY_FAILURE (state) {
    state.gallery.loading = false
    state.gallery.finished = true
    state.gallery.error = true
  }
}
