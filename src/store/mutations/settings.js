export default {
  LOAD_SETTINGS (state, payload) {
    if (!payload.settings || !Object.keys(payload.settings).length) {
      return
    }
    state.updated = payload.updated
    state.settings = payload.settings
  }
}
