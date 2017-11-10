import Vue from 'vue'

export default {
  LOAD_CATEGORIES (state, payload) {
    if (!payload.categories || !payload.categories.length) {
      return
    }
    state.categories = payload.categories
  },

  ADD_CATEGORY (state, payload) {
    state.updated = Date.now()
    state.categories.push(payload.item)
  },

  DELETE_CATEGORY (state, payload) {
    state.updated = Date.now()
    Vue.delete(
      state.categories,
      state.categories.findIndex(c => c.guid === payload.category.guid)
    )
  },

  UPDATE_CATEGORY (state, payload) {
    const itemIndex = state.categories.findIndex(c => c.guid === payload.data.guid)
    state.updated = Date.now()
    state.categories[itemIndex] = payload.data
  }
}
