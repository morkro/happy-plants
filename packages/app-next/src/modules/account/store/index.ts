import { Module } from 'vuex'
import { RootState } from '@/store'
import state, { AccountState } from './state'
import mutations from './mutations'
import * as actions from './actions'

const store: Module<AccountState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
}

export default store
