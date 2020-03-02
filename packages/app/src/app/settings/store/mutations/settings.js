export default {
  LOAD_SETTINGS (state, payload) {
    if (!payload.settings || !Object.keys(payload.settings).length) {
      return
    }

    state.updated = Date.now()
    state.settings = Object.assign({}, state.settings, payload.settings, {
      hasNewRelease: state.hasNewRelease
    })
  },

  HAS_SEEN_NEW_RELEASE (state) {
    state.updated = Date.now()
    state.hasNewRelease = false
  },

  UPDATE_THEME (state, payload) {
    state.updated = Date.now()
    state.settings.theme = payload.theme
  }
}
