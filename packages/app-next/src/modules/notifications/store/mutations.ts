import { NotificationsState } from './state'

export type SetNotificationPayload = NotificationsState

export default {
  set(state: NotificationsState, payload: SetNotificationPayload) {
    state.message = payload.message
    state.type = payload.type
  },

  clear(state: NotificationsState) {
    state.message = null
    state.type = 'info'
  },
}
