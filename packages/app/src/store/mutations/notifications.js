export default {
  SHOW_NOTIFICATION (state, payload) {
    state.notification.message = payload.message
  },

  HIDE_NOTIFICATION (state) {
    state.notification.message = false
  }
}
