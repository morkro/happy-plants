export default {
  DELETE_ALL_PLANTS (state, payload) {
    state.updated = payload.updated
    state.plants = []
  }
}
