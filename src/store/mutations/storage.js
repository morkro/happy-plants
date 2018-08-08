export default {
  LOAD_STORAGE (state, payload) {
    state.updated = Date.now()
    state.storage = Object.assign({}, state.storage, payload.storage)
  },

  UPDATE_STORAGE (state, payload) {
    state.updated = Date.now()
    state.storage = Object.assign({}, state.storage, { type: payload.type })
  }
}
