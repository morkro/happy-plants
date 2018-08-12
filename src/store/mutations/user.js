export default {
  USER_SIGNIN_PROGRESS (state) {
    state.updated = Date.now()
    state.user.authenticated = false
    state.user.loading = true
  },

  USER_SIGNIN_SUCCESS (state, payload) {
    state.updated = Date.now()
    state.user.authenticated = true
    state.user.error = false
    state.user.loading = false
    state.user.name = payload.user.email
    state.user.id = payload.user.uid
  },

  USER_SIGNIN_FAILED (state, payload) {
    state.updated = Date.now()
    state.user.authenticated = false
    state.user.error = true
    state.user.loading = false
  },

  USER_SIGNOUT_PROGRESS (state) {
    state.updated = Date.now()
    state.user.loading = true
  },

  USER_SIGNOUT_SUCCESS (state) {
    state.updated = Date.now()
    state.user.authenticated = false
    state.user.error = false
    state.user.loading = false
    state.user.name = null
  },

  USER_SIGNOUT_FAILED (state, payload) {
    state.updated = Date.now()
    state.user.error = true
    state.user.loading = false
  }
}
