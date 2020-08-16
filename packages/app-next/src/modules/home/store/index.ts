import { Module } from 'vuex'
import * as actions from './actions'
import state, { HomeState } from './state'
import mutations from './mutations'
import { RootState } from '@/store'

const store: Module<HomeState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
}

export default store
