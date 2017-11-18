import authentication from './authentication'
import plants from './plants'
import categories from './categories'
import notifications from './notifications'
import settings from './settings'

export default {
  ...authentication,
  ...plants,
  ...categories,
  ...notifications,
  ...settings
}
