import addGallery from '@/app/gallery/store/utils/add-gallery'

export default {
  ADD_GALLERY_ITEM_PROGRESS (state) {
    state.updated = Date.now()
  },

  ADD_GALLERY_ITEM_SUCCESS (state, payload) {
    state.updated = Date.now()

    addGallery(state, payload)
  },

  ADD_GALLERY_ITEM_FAILURE (state) {
    state.gallery.error = true
  }
}
