export const showNotification = ({ commit }, data = {}) => {
  const defaultMessage = 'Something went wrong. Please try again later.'

  commit('SHOW_NOTIFICATION', Object.assign({}, data, {
    message: data.message || defaultMessage
  }))
}

export const hideNotification = ({ commit }) => {
  commit('HIDE_NOTIFICATION')
}
