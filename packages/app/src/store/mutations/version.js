import compareVersion from '@/utils/compare-version'

export default {
  LOAD_VERSION (state, payload) {
    const versionIsValid = typeof payload.version === 'string'
    const versionCopy = state.version

    if (versionIsValid && !compareVersion(payload.version, state.version, false)) {
      state.version = payload.version
    } else {
      state.version = versionCopy
    }

    state.hasNewRelease = (
      !versionIsValid ||
      compareVersion(payload.version, state.version)
    )
  },

  UPDATE_VERSION (state) {
    state.updated = Date.now()
  }
}
