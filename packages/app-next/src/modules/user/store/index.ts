import { Module } from 'vuex'
import state, { UserState } from './state'
import { RootState } from '@/store'

const store: Module<UserState, RootState> = {
  namespaced: true,
  state,
  mutations: {},
  actions: {},
}

export default store
