export const showNotification = ({ commit }, data) => {
  commit('SHOW_NOTIFICATION', data)
}

export const hideNotification = ({ commit }) => {
  commit('HIDE_NOTIFICATION')
}
