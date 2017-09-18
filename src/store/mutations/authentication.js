export default {
  LOGIN_USER (state) {
    state.user.authenticated = true
  },

  LOGOUT_USER (state) {
    state.user.authenticated = false
  },

  AUTH_ERROR (state) {
    state.user.authenticated = false
  }
}
