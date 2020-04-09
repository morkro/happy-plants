import * as actions from './actions'
import { Module } from 'vuex'
import { RootState } from '@/store'

const store: Module<{}, RootState> = {
  namespaced: true,
  state: {},
  mutations: {},
  actions,
}

export default store
