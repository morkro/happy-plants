import Vue from 'vue'

export default {
  LOAD_TAGS_PROGRESS (state) {
    state.tags.loading = true
  },

  LOAD_TAGS_SUCCESS (state, payload) {
    if (!payload.tags || !payload.tags.length) {
      return
    }
    state.tags.loading = false
    state.tags.data = payload.tags
  },

  ADD_TAG (state, payload) {
    state.updated = Date.now()
    const index = state.tags.data.findIndex(tag => tag.name === payload.item.name)
    const tag = state.tags.data[index]

    if (tag) {
      if (tag.plants.includes(payload.item.plants[0])) {
        return
      }
      tag.plants.push(payload.item.plants[0])
    } else {
      state.tags.data.push(payload.item)
    }
  },

  DELETE_TAG (state, payload) {
    state.updated = Date.now()
    const index = state.tags.data.findIndex(tag => tag.guid === payload.item.tag)
    const tag = state.tags.data[index]

    if (payload.item.forceDelete) {
      Vue.delete(state.tags.data, index)
      return
    }

    if (tag.plants.includes(payload.item.plant)) {
      if (tag.plants.length === 1) {
        Vue.delete(state.tags.data, index)
      } else {
        Vue.set(state.tags.data, index, {
          ...tag,
          plants: tag.plants.filter(p => p !== payload.item.plant)
        })
      }
    }
  },

  UPDATE_TAG (state, payload) {
    const itemIndex = state.tags.data.findIndex(t => t.guid === payload.item.guid)
    state.updated = Date.now()
    Vue.set(state.tags.data, itemIndex, payload.item)
  }
}
