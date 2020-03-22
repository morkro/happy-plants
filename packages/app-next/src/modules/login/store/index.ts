import * as actions from './actions'
import { Module } from 'vuex'

const store: Module<{}, {}> = {
  namespaced: true,
  state: {},
  mutations: {},
  actions,
}

export default store
