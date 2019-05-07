import Vue from 'vue'

export default {
  IMPORT_TAGS (state, payload) {
    state.updated = payload.updated
    state.tags.data = payload.data
  },

  LOAD_TAGS_PROGRESS (state) {
    state.tags.loading = true
  },

  LOAD_TAGS_SUCCESS (state, payload) {
    state.tags.loading = false
    state.tags.finished = true
    state.tags.error = false
    state.tags.data = payload.tags || state.tags.data
  },

  LOAD_TAGS_FAILURE (state) {
    state.tags.loading = false
    state.tags.finished = true
    state.tags.error = true
  },

  ADD_TAG_PROGRESS (state) {
    state.updated = Date.now()
  },

  ADD_TAG_SUCCESS (state, payload) {
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

  DELETE_TAG_PROGRESS (state) {
    state.updated = Date.now()
  },

  DELETE_TAG_SUCCESS (state, payload) {
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

  DELETE_TAG_FAILURE (state) {
    state.tags.error = true
  },

  UPDATE_TAG (state, payload) {
    const itemIndex = state.tags.data.findIndex(t => t.guid === payload.item.guid)
    state.updated = Date.now()
    Vue.set(state.tags.data, itemIndex, payload.item)
  }
}
