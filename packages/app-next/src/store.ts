import Vue from 'vue'
import Vuex from 'vuex'
import { store as notifications } from '@/modules/notifications'
import { store as user } from '@/modules/user'
import { store as login } from '@/modules/login'
import { NotificationsState } from './modules/notifications/store/state'
import { UserState } from '@/modules/user/store/state'
import config from './config'

Vue.use(Vuex)

export interface RootState {
  notifications: NotificationsState
  user: UserState
  login: {}
}

const store = new Vuex.Store<RootState>({
  strict: config.isProduction,
  modules: {
    notifications,
    user,
    login,
  },
})

export default store
