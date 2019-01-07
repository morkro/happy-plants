import appheader from './appheader'
import notifications from './notifications'
import version from './version'
import user from './user'

export default {
  ...appheader,
  ...notifications,
  ...version,
  ...user,

  TOGGLE_APP_DIALOG (state, payload) {
    state.dialog.active = payload.dialog || false
    state.dialog.type = payload.type || 'default'
  }
}
