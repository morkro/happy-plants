export const signInUser = ({ commit }) => {
  commit('LOGIN_USER')
}

export const signOutUser = ({ commit }) => {
  commit('LOGOUT_USER')
}

export const authError = ({ commit }) => {
  commit('AUTH_ERROR')
}
