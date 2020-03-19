import * as actions from './actions'
import state, { LoginState } from './state'
import { Module } from 'vuex'

const store: Module<LoginState, {}> = {
  namespaced: true,
  state,
  mutations: {},
  actions,
}

export default store
