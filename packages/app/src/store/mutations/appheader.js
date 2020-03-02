export default {
  UPDATE_APPHEADER (state, payload) {
    state.appheader = { ...state.appheader, ...payload }
  }
}
