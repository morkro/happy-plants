import { Module } from 'vuex'
import { RootState } from '@/store'
import state, { UserState } from './state'
import mutations from './mutations'
import * as actions from './actions'

const store: Module<UserState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
}

export default store
