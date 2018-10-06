import compareVersion from '@/utils/compare-version'

export default {
  LOAD_VERSION (state, payload) {
    if (!payload.version) {
      state.firstTimeUser = true
      return
    }

    const versionIsValid = typeof payload.version === 'string'

    if (versionIsValid && !compareVersion(payload.version, state.version, false)) {
      state.version = payload.version
    } else {
      state.version = state.version
    }

    state.hasNewRelease = !versionIsValid
      ? true
      : compareVersion(payload.version, state.version)
  },

  UPDATE_VERSION (state) {
    state.updated = Date.now()
  }
}
