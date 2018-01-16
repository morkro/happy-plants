import plants from './plants'
import categories from './categories'
import notifications from './notifications'
import settings from './settings'

export default {
  ...plants,
  ...categories,
  ...notifications,
  ...settings
}
