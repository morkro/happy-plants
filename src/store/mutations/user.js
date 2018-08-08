export default {
  USER_SIGNIN_PROGRESS (state) {
    state.updated = Date.now()
    state.user.authenticated = false
  },

  USER_SIGNIN_SUCCESS (state, payload) {
    state.updated = Date.now()
    state.user.authenticated = true
    state.user.error = false
    state.user.name = payload.user.email
  },

  USER_SIGNIN_FAILED (state, payload) {
    console.log(payload)
    state.updated = Date.now()
    state.user.authenticated = false
    state.user.error = true
  }
}
