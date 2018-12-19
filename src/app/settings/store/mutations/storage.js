export default {
  LOAD_STORAGE (state, payload) {
    state.updated = Date.now()
    state.storage = Object.assign({}, state.storage, payload.storage)
  },

  UPDATE_STORAGE (state, payload) {
    state.updated = Date.now()
    state.storage = Object.assign({}, state.storage, { type: payload.type })
  },

  DATA_MIGRATION_START (state) {
    state.storage.migrationMode = true
  },

  DATA_MIGRATION_FINISHED (state) {
    state.storage.migrationMode = false
  }
}
