import Vue from 'vue'
import getModule from '@/store/utils/get-module'

export default {
  // This isn't really well written, should be refactored.
  UPDATE_GALLERY (state, payload) {
    const { index, module } = getModule('gallery', state)
    const galleryIndex = module.value.list.findIndex(g => g.guid === payload.item.guid)
    const galleryItem = module.value.list[galleryIndex]

    state.updated = payload.updated

    if (galleryItem) {
      Vue.delete(module.value.list, galleryIndex)
    } else {
      module.value.list.push(payload.item)
    }

    const plantIndex = state.plants.data.findIndex(p => p.guid === state.selected.guid)
    const { modules } = state.selected
    modules.splice(index, 1, {
      type: module.type,
      value: {
        list: module.value.list
      }
    })

    state.plants.data.splice(plantIndex, 1, {
      ...state.plants.data[plantIndex],
      modules
    })
  }
}
