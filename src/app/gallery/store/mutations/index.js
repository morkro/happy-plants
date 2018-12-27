import Vue from 'vue'
import mutationCreator from '@/store/utils/mutation-creator'
import { getGalleryStructure } from '@/app/gallery/utils/get-gallery-structure'
import { getUrlFromBlob } from '@/utils/blob'
import { sortByDate } from '@/utils/sort'

function refreshBlobUrl (item) {
  return Object.assign(item, {
    imageURL: getUrlFromBlob(item.blob)
  })
}

export default {
  ...mutationCreator([
    'ADD_GALLERY_ITEM_PROGRESS',
    'DELETE_GALLERY_ITEM_PROGRESS'],
    (state) => {
      state.updated = Date.now()
    }
  ),

  LOAD_GALLERY_PROGRESS (state) {
    state.gallery.loading = true
  },

  LOAD_GALLERY_SUCCESS (state, payload) {
    let transformed = payload.gallery || state.gallery.data
    if (state.storage.type === 'local') {
      transformed = transformed.map(gallery => {
        return Object.assign(gallery, {
          list: gallery.list.map(refreshBlobUrl)
        })
      })
    }

    state.gallery.loading = false
    state.gallery.finished = true
    state.gallery.error = false
    state.gallery.data = transformed.sort(sortByDate).reverse()
  },

  ADD_GALLERY_ITEM_SUCCESS (state, payload) {
    state.updated = Date.now()

    const index = state.gallery.data.findIndex(g => g.guid === payload.guid)
    const gallery = state.gallery.data[index]

    if (gallery) {
      gallery.list.unshift(payload.item)
      Vue.set(state.gallery.data, index, gallery)
    } else {
      const newGallery = getGalleryStructure(payload.guid)
      newGallery.list.unshift(payload.item)
      state.gallery.data.push(newGallery)
    }
  },

  DELETE_GALLERY_ITEM_SUCCESS (state, payload) {
    state.updated = Date.now()
    const index = state.gallery.data.findIndex(g => g.guid === payload.guid)
    const gallery = state.gallery.data[index]

    if (gallery && gallery.list.some(item => item.guid === payload.item.guid)) {
      if (gallery.list.length === 1) {
        Vue.delete(state.gallery.data, index)
      } else {
        Vue.set(state.gallery.data, index, {
          ...gallery,
          list: gallery.list
            .filter(item => item.guid !== payload.item.guid)
            .sort(sortByDate)
            .reverse()
        })
      }
    }
  }
}
