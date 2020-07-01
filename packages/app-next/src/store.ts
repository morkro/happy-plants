import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { store as notifications } from '@/modules/notifications'
import { store as user } from '@/modules/user'
import { store as home } from '@/modules/home'
import { NotificationsState } from '@/modules/notifications/store/state'
import { UserState } from '@/modules/user/store/state'
import { HomeState } from '@/modules/home/store/state'
import config from './config'

Vue.use(Vuex)

export interface RootState {
  notifications: NotificationsState
  user: UserState
  login: {}
  home: HomeState
}

export function createStore(): Store<RootState> {
  return new Vuex.Store<RootState>({
    strict: config.isProduction,
    modules: {
      notifications,
      user,
      home,
    },
  })
}

export default createStore()
