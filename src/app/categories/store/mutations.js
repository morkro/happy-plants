import Vue from 'vue'

export default {
  ADD_CATEGORY (state, payload) {
    state.updated = Date.now()
    state.categories.push(payload.category)
  },

  DELETE_CATEGORY (state, payload) {
    state.updated = Date.now()
    Vue.delete(
      state.categories,
      state.categories.findIndex(c => c.guid === payload.category.guid)
    )
  },

  UPDATE_CATEGORY (state, payload) {
    const itemIndex = state.categories.findIndex(c => c.guid === payload.category.guid)
    state.updated = Date.now()
    state.categories[itemIndex] = payload.data
  }
}
