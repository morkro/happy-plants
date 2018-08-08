import * as appheader from './appheader'
import * as notifications from './notifications'
import * as plants from './plants'
import * as tags from './tags'
import * as settings from './settings'
import * as storage from './storage'
import * as version from './version'
import * as user from './user'

export default {
  ...appheader,
  ...notifications,
  ...plants,
  ...tags,
  ...settings,
  ...storage,
  ...version,
  ...user
}
