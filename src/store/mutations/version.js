import compareVersion from '@/utils/compare-version'

export default {
  LOAD_VERSION (state, payload) {
    const versionIsValid = typeof payload.version === 'string'

    console.log(payload.version, state.version)
    console.log(compareVersion(payload.version, state.version))

    if (versionIsValid && !compareVersion(payload.version, state.version, false)) {
      state.version = payload.version
    } else {
      state.version = state.version
    }

    state.settings.hasNewRelease = !versionIsValid
      ? true
      : compareVersion(payload.version, state.version)
  },

  UPDATE_VERSION (state) {
    state.updated = Date.now()
  }
}
