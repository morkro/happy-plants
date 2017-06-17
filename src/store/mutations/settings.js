export default {
  LOAD_SETTINGS (state, payload) {
    if (!Object.keys(payload.settings).length) return
    state.settings = payload.settings
  }
}
