import authentication from './authentication'
import plants from './plants'
import notifications from './notifications'
import settings from './settings'

export default {
  ...authentication,
  ...plants,
  ...notifications,
  ...settings
}
