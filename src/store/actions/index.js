import * as appheader from './appheader'
import * as notifications from './notifications'
import * as version from './version'
import * as user from './user'

export default {
  ...appheader,
  ...notifications,
  ...version,
  ...user,

  toggleDialog ({ commit }, data) {
    commit('TOGGLE_APP_DIALOG', data)
  }
}
