export default {
  LOGIN_USER (state, payload) {
    state.user.authenticated = true
    state.user.email = payload.email
    state.user.name = payload.displayName
    state.user.avatar = payload.photoURL
  },

  LOGOUT_USER (state) {
    state.user.authenticated = false
    state.user.email = null
    state.user.name = null
    state.user.avatar = null
  },

  AUTH_ERROR (state) {
    state.user.authenticated = false
  }
}
