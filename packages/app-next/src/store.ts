import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { store as notifications } from '@/modules/notifications'
import { store as account } from '@/modules/account'
import { store as plants } from '@/modules/plants'
import { store as tags } from '@/modules/tags'
import { NotificationsState } from '@/modules/notifications/store/state'
import { AccountState } from '@/modules/account/store/state'
import { PlantsState } from '@/modules/plants/store/state'
import { TagsState } from '@/modules/tags/store/state'
import config from './config'

Vue.use(Vuex)

export interface RootState {
  account: AccountState
  notifications: NotificationsState
  plants: PlantsState
  tags: TagsState
}

export function createStore(): Store<RootState> {
  return new Vuex.Store<RootState>({
    strict: config.isProduction,
    modules: {
      account,
      notifications,
      plants,
      tags,
    },
  })
}

export default createStore()
