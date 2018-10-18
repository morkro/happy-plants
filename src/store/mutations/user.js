import mutationCreator from '@/store/utils/mutation-creator'

export default {
  ...mutationCreator([
    'USER_SIGNIN_PROGRESS',
    'USER_REDIRECT_RESULT_PROGRESS',
    'USER_AUTH_STATE_PROGRESS'],
    (state) => {
      state.updated = Date.now()
      state.user.authenticated = false
      state.user.loading = true
    }
  ),

  ...mutationCreator([
    'USER_REDIRECT_RESULT_SUCCESS',
    'USER_AUTH_STATE_SUCCESS'],
    (state, payload) => {
      state.updated = Date.now()
      state.user.authenticated = true
      state.user.error = false
      state.user.loading = false
      state.user.name = payload.user.displayName
      state.user.email = payload.user.email
      state.user.id = payload.user.uid
    }
  ),

  ...mutationCreator([
    'USER_REDIRECT_RESULT_FAILED',
    'USER_AUTH_STATE_FAILED'],
    (state) => {
      if (state.user.authenticated === true) return
      state.updated = Date.now()
      state.user.authenticated = false
      state.user.error = true
      state.user.loading = false
    }
  ),

  USER_REDIRECT_RESULT (state) {
    state.user.authFromRedirect = true
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
