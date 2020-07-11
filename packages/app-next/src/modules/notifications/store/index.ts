import { Module } from 'vuex'
import { RootState } from '@/store'
import state, { NotificationsState } from './state'
import * as actions from './actions'
import mutations from './mutations'

const store: Module<NotificationsState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
}

export default store
