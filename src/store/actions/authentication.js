export const signInUser = ({ commit }, data) => {
  commit('LOGIN_USER', data)
}

export const signOutUser = ({ commit }) => {
  commit('LOGOUT_USER')
}

export const authError = ({ commit }) => {
  commit('AUTH_ERROR')
}
