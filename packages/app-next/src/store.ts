import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { store as notifications } from '@/modules/notifications'
import { store as account } from '@/modules/account'
import { store as home } from '@/modules/home'
import { NotificationsState } from '@/modules/notifications/store/state'
import { AccountState } from '@/modules/account/store/state'
import { HomeState } from '@/modules/home/store/state'
import config from './config'

Vue.use(Vuex)

export interface RootState {
  notifications: NotificationsState
  account: AccountState
  login: {}
  home: HomeState
}

export function createStore(): Store<RootState> {
  return new Vuex.Store<RootState>({
    strict: config.isProduction,
    modules: {
      notifications,
      account,
      home,
    },
  })
}

export default createStore()
