import Vue from 'vue'
import { sortByDate } from '@/utils/sort'

export default {
  DELETE_GALLERY_ITEM_PROGRESS (state) {
    state.updated = Date.now()
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
