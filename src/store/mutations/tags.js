import Vue from 'vue'

export default {
  LOAD_TAGS (state, payload) {
    if (!payload.tags || !payload.tags.length) {
      return
    }
    state.tags = payload.tags
  },

  ADD_TAG (state, payload) {
    state.updated = Date.now()
    const index = state.tags.findIndex(tag => tag.name === payload.item.name)
    const tag = state.tags[index]

    if (tag) {
      if (tag.plants.includes(payload.item.plants[0])) {
        return
      }
      tag.plants.push(payload.item.plants[0])
    } else {
      state.tags.push(payload.item)
    }
  },

  DELETE_TAG (state, payload) {
    state.updated = Date.now()
    const index = state.tags.findIndex(tag => tag.guid === payload.item.tag)
    const tag = state.tags[index]

    if (tag.plants.includes(payload.item.plant)) {
      if (tag.plants.length === 1) {
        Vue.delete(state.tags, index)
      } else {
        Vue.set(state.tags, index, {
          ...tag,
          plants: tag.plants.filter(p => p !== payload.item.plant)
        })
      }
    }
  },

  UPDATE_TAG (state, payload) {
    const itemIndex = state.tags.findIndex(t => t.guid === payload.item.guid)
    state.updated = Date.now()
    Vue.set(state.tags, itemIndex, payload.item)
  }
}
