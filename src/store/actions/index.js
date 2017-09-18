import * as authentication from './authentication'
import * as plants from './plants'
import * as notifications from './notifications'
import * as settings from './settings'

export default {
  ...authentication,
  ...plants,
  ...notifications,
  ...settings
}
