type NotificationsType = 'info' | 'success' | 'alert'

export interface NotificationsState {
  message: string | null
  type: NotificationsType
}

const state: NotificationsState = {
  message: null,
  type: 'info',
}

export default state
